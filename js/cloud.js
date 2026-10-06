/* Đồng bộ tiến độ lên đám mây (Firebase Firestore, gọi qua REST, không cần thư viện).
   - Mỗi gia đình có một "mã gia đình" ngẫu nhiên dài 20 ký tự; thiết bị nhập mã đó là dùng chung tiến độ.
   - Mỗi khi có thay đổi và có mạng, app tự đẩy tiến độ lên; khi mở app hoặc có mạng lại thì tự lấy về.
   - Nếu hai thiết bị cùng thay đổi một hồ sơ, tiến độ được gộp lại (lấy giá trị cao hơn), không bên nào bị mất.
   Chỉ lưu tên hiển thị và tiến độ học; không thu thập thông tin cá nhân nào khác. */
(function () {
  const K = (window.K = window.K || {});

  const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
  const CODE_RE = /^[a-hj-km-np-z2-9]{20}$/;

  const cfg = () => K.CLOUD_CONFIG || {};
  const enabled = () => !!cfg().projectId;
  const meta = () => K.store.cloudMeta();
  const linked = () => enabled() && !!meta().code;

  let status = 'off';
  let lastError = '';
  let syncing = false;
  let again = false;
  let timer = null;

  function setStatus(s, err) {
    status = s;
    lastError = err ? String((err && err.message) || err) : '';
    if (typeof K.cloud.onStatus === 'function') K.cloud.onStatus(s);
  }

  /* ----- Gọi Firestore REST ----- */
  const root = () =>
    `${cfg().apiBase || 'https://firestore.googleapis.com/v1'}/projects/${encodeURIComponent(cfg().projectId)}/databases/(default)/documents/families/${meta().code}/profiles`;

  async function call(method, key, params, body) {
    const q = new URLSearchParams(params || {});
    if (cfg().apiKey) q.set('key', cfg().apiKey);
    const ctl = typeof AbortController === 'function' ? new AbortController() : null;
    const t = ctl ? setTimeout(() => ctl.abort(), 12000) : null;
    try {
      return await fetch(`${root()}/${key}${q.toString() ? '?' + q : ''}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: ctl ? ctl.signal : undefined,
      });
    } finally {
      if (t) clearTimeout(t);
    }
  }

  async function getDoc(key) {
    const r = await call('GET', key);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error('Máy chủ trả lỗi ' + r.status);
    const d = await r.json();
    const f = d.fields || {};
    return {
      json: f.json && f.json.stringValue,
      rev: Number((f.rev && f.rev.integerValue) || 0),
      updateTime: d.updateTime,
    };
  }

  // pre: null (tạo mới, chỉ khi chưa tồn tại) hoặc updateTime của bản đã đọc (chỉ ghi nếu chưa ai sửa)
  async function putDoc(key, json, rev, pre) {
    const params = pre ? { 'currentDocument.updateTime': pre } : { 'currentDocument.exists': 'false' };
    const r = await call('PATCH', key, params, { fields: { json: { stringValue: json }, rev: { integerValue: String(rev) } } });
    if (r.ok) return true;
    if ([400, 404, 409].includes(r.status)) {
      let st = '';
      try { st = ((await r.json()).error || {}).status || ''; } catch (e) { /* bỏ qua */ }
      if (['FAILED_PRECONDITION', 'ABORTED', 'NOT_FOUND', 'ALREADY_EXISTS'].includes(st) || r.status === 409) return false;
    }
    throw new Error('Không ghi được lên máy chủ (' + r.status + ')');
  }

  /* ----- Đồng bộ một hồ sơ ----- */
  const current = (key) => {
    const p = K.store.familyProfiles().find((x) => x.key === key);
    return p || null;
  };

  async function syncProfile(key, attempt) {
    const m = meta();
    const remote = await getDoc(key);
    const p = current(key);
    if (!p) return false;
    const localJson = JSON.stringify(p.data); // đọc sau khi chờ mạng để không bỏ sót thay đổi mới
    const snap = m.snap[key];
    const localChanged = snap === undefined || localJson !== snap;
    let applied = false;

    const pushNow = async (json, pre, floor) => {
      const rev = Math.max(Date.now(), (m.base[key] || 0) + 1, floor || 0);
      const ok = await putDoc(key, json, rev, pre);
      if (!ok) return false;
      m.base[key] = rev;
      m.snap[key] = json;
      K.store.persist();
      return true;
    };

    if (!remote) {
      if (!(await pushNow(localJson, null)) && attempt < 3) return syncProfile(key, attempt + 1);
      return false;
    }
    const remoteChanged = remote.rev !== m.base[key];
    if (!remoteChanged) {
      if (localChanged && !(await pushNow(localJson, remote.updateTime, remote.rev + 1)) && attempt < 3) return syncProfile(key, attempt + 1);
      return false;
    }
    let parsed;
    try { parsed = JSON.parse(remote.json); } catch (e) { parsed = null; }
    if (!parsed) { // dữ liệu trên mạng hỏng: ghi đè bằng dữ liệu của thiết bị này
      if (!(await pushNow(localJson, remote.updateTime, remote.rev + 1)) && attempt < 3) return syncProfile(key, attempt + 1);
      return false;
    }
    if (!localChanged) {
      applied = K.store.applyRemote(p.id, parsed, false);
      m.base[key] = remote.rev;
      m.snap[key] = JSON.stringify(current(key).data);
      K.store.persist();
      return applied;
    }
    // Cả hai bên cùng thay đổi: gộp lại rồi đẩy lên
    applied = K.store.applyRemote(p.id, parsed, true);
    const merged = JSON.stringify(current(key).data);
    m.base[key] = remote.rev;
    if (!(await pushNow(merged, remote.updateTime, remote.rev + 1))) {
      m.snap[key] = undefined;
      delete m.snap[key];
      if (attempt < 3) return syncProfile(key, attempt + 1);
    }
    return applied;
  }

  async function syncAll() {
    if (!linked()) return;
    if (syncing) { again = true; return; }
    syncing = true;
    setStatus('syncing');
    try {
      let applied = false;
      for (const p of K.store.familyProfiles()) {
        if (await syncProfile(p.key, 0)) applied = true;
      }
      meta().last = Date.now();
      K.store.persist();
      setStatus('ok');
      if (applied && typeof K.cloud.onSynced === 'function') K.cloud.onSynced();
    } catch (e) {
      setStatus(navigator.onLine === false ? 'offline' : 'error', e);
    } finally {
      syncing = false;
      if (again) { again = false; schedule(1500); }
    }
  }

  function schedule(delay) {
    if (!linked()) return;
    clearTimeout(timer);
    timer = setTimeout(syncAll, delay == null ? 4000 : delay);
  }

  /* ----- Liên kết thiết bị với một gia đình ----- */
  const normalizeCode = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const formatCode = (c) => (c.toUpperCase().match(/.{1,4}/g) || []).join('-');

  function randomCode() {
    const bytes = new Uint8Array(20);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  }

  // Mã gia đình cố định trong cấu hình: mọi thiết bị tự liên kết, không cần nhập
  const fixedCode = () => {
    const c = normalizeCode(cfg().familyCode);
    return CODE_RE.test(c) ? c : '';
  };

  const reset = (code) => {
    const m = meta();
    m.code = code;
    m.base = {};
    m.snap = {};
    m.last = 0;
    K.store.persist();
  };

  // Có mã cố định: liên kết ngay khi tải trang (dữ liệu trên máy sẽ được gộp với dữ liệu trên mạng ở lần đồng bộ đầu)
  if (enabled() && fixedCode() && meta().code !== fixedCode()) reset(fixedCode());

  K.cloud = {
    enabled,
    linked,
    formatCode,
    code: () => (linked() ? formatCode(meta().code) : ''),
    rawCode: () => (linked() ? meta().code : ''),
    // Đường link để gửi cho thiết bị khác: mở link một lần là tự kết nối vào gia đình
    joinLink: () => (linked() ? location.href.split('#')[0] + '#/join/' + meta().code : ''),
    normalizeCode,
    status: () => (enabled() ? (linked() ? (status === 'off' ? 'idle' : status) : 'off') : 'off'),
    lastSync: () => meta().last,
    lastError: () => lastError,
    onStatus: null,
    onSynced: null,

    fixed: () => enabled() && !!fixedCode(),

    // Tạo mã gia đình mới trên thiết bị này và đẩy tiến độ hiện có lên mạng
    async createFamily() {
      if (!enabled()) throw new Error('Chưa cấu hình Firebase');
      if (fixedCode()) throw new Error('App đang dùng mã gia đình cố định.');
      const code = randomCode();
      reset(code);
      await syncAll();
      if (status === 'error' || status === 'offline') {
        const msg = lastError || 'Không có mạng';
        reset('');
        setStatus('off');
        throw new Error(msg);
      }
      return formatCode(code);
    },

    // Nhập mã gia đình của thiết bị khác: lấy tiến độ về và gộp với tiến độ trên máy này
    async joinFamily(input) {
      if (!enabled()) throw new Error('Chưa cấu hình Firebase');
      if (fixedCode()) throw new Error('App đang dùng mã gia đình cố định.');
      const code = normalizeCode(input);
      if (!CODE_RE.test(code)) throw new Error('Mã chưa đúng. Mã gồm 20 chữ và số (ví dụ ABCD-EFGH-JKMN-PQRS-TUVW).');
      const prev = { ...meta(), base: { ...meta().base }, snap: { ...meta().snap } };
      reset(code);
      try {
        const found = await Promise.all(K.store.familyProfiles().map((p) => getDoc(p.key)));
        if (!found.some(Boolean)) throw new Error('Không tìm thấy mã gia đình này. Hãy kiểm tra lại từng ký tự.');
      } catch (e) {
        const m = meta();
        Object.assign(m, prev);
        K.store.persist();
        throw e;
      }
      await syncAll();
      if (status === 'error' || status === 'offline') throw new Error(lastError || 'Không có mạng');
      return formatCode(code);
    },

    unlink() {
      if (fixedCode()) return;
      clearTimeout(timer);
      reset('');
      setStatus('off');
    },

    syncNow() { return syncAll(); },
    schedule,

    start() {
      if (!enabled()) return;
      K.store.onChange = () => schedule(4000);
      window.addEventListener('online', () => schedule(500));
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') schedule(800); });
      setInterval(() => { if (document.visibilityState === 'visible') schedule(0); }, 90000);
      if (linked()) { setStatus('idle'); schedule(300); }
    },
  };
})();
