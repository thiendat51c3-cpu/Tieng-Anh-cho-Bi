/* Lưu tiến trình học (localStorage): xu, sao, huy hiệu, chuỗi ngày học, cài đặt */
(function () {
  const K = (window.K = window.K || {});
  const KEY = 'kidEnglish.v2'; // nhiều hồ sơ
  const LEGACY_KEY = 'kidEnglish.v1'; // bản cũ chỉ có một hồ sơ
  const MAX_PROFILES = 8;
  const BACKUP_APP = 'be-vui-hoc-tieng-anh';
  const COINS_PER_LEVEL = 200;

  const defaults = () => ({
    name: '',
    avatar: 'capy',
    coins: 0,
    stats: { games: 0, perfect: 0 },
    best: {}, // "topic/game" -> số sao cao nhất (0-3)
    learned: {}, // topic -> true
    mastered: {}, // từ -> số lần trả lời đúng ngay lần đầu
    topicsPlayed: {},
    gamesPlayed: {},
    streak: { count: 0, last: '' },
    badges: {},
    welcomed: false,
    daily: { date: '', games: 0, correct: 0, learn: 0, claimed: {}, chest: false },
    stickers: {}, // id -> số lượng
    gifts: 0, // hộp quà miễn phí đang có
    lastLevel: 1,
    settings: { sound: true, speech: true, slow: true },
  });

  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const BADGES = [
    { id: 'first', icon: '🌱', name: 'Bước đầu tiên', desc: 'Hoàn thành trò chơi đầu tiên', test: (s) => s.stats.games >= 1 },
    { id: 'star10', icon: '⭐', name: 'Ngôi sao nhỏ', desc: 'Đạt 10 sao', test: () => K.store.totalStars() >= 10 },
    { id: 'star50', icon: '🌟', name: 'Siêu sao', desc: 'Đạt 50 sao', test: () => K.store.totalStars() >= 50 },
    { id: 'perfect', icon: '💯', name: 'Hoàn hảo', desc: 'Được 3 sao trong một trò chơi', test: (s) => s.stats.perfect >= 1 },
    { id: 'streak3', icon: '🔥', name: 'Chăm chỉ', desc: 'Học 3 ngày liên tiếp', test: (s) => s.streak.count >= 3 },
    { id: 'words30', icon: '🎓', name: 'Nhà thông thái', desc: 'Thuộc 30 từ', test: (s) => Object.keys(s.mastered).length >= 30 },
    { id: 'explorer', icon: '🧭', name: 'Nhà thám hiểm', desc: 'Chơi 5 chủ đề khác nhau', test: (s) => Object.keys(s.topicsPlayed).length >= 5 },
    { id: 'gamer', icon: '🎮', name: 'Game thủ', desc: 'Thử tất cả các trò chơi', test: (s) => Object.keys(s.gamesPlayed).length >= K.gameOrder.length },
    { id: 'rich', icon: '👑', name: 'Triệu phú nhí', desc: 'Có 1000 xu', test: (s) => s.coins >= 1000 },
    { id: 'abc', icon: '🔤', name: 'Thông thạo ABC', desc: 'Học xong bảng chữ cái', test: (s) => !!s.learned.abc },
    { id: 'collector', icon: '🎁', name: 'Nhà sưu tầm', desc: 'Sưu tầm 10 sticker khác nhau', test: (s) => Object.keys(s.stickers).length >= 10 },
  ];

  const MISSIONS = [
    { id: 'games', icon: '🎮', text: 'Chơi 3 trò chơi', key: 'games', goal: 3, reward: 30 },
    { id: 'correct', icon: '🎯', text: 'Trả lời đúng 15 câu', key: 'correct', goal: 15, reward: 30 },
    { id: 'learn', icon: '📖', text: 'Học từ mới 1 lần', key: 'learn', goal: 1, reward: 20 },
  ];
  K.MISSIONS = MISSIONS;
  K.GIFT_COST = 80;

  K.BADGES = BADGES;

  /* ----- Kiểm tra và làm sạch dữ liệu (từ localStorage hoặc file sao lưu) ----- */
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const num = (v, max) => (Number.isFinite(+v) ? Math.max(0, Math.min(max || 1e7, Math.floor(+v))) : 0);
  const KEY_RE = /^[a-z0-9-]+\/[a-z]+$/;
  const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
  const keysOf = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? Object.keys(o) : []);

  function sanitize(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
    const d = defaults();
    d.name = String(o.name || '').replace(/[<>]/g, '').slice(0, 14);
    d.avatar = K.AVATARS.includes(o.avatar) ? o.avatar : d.avatar;
    d.coins = num(o.coins);
    d.stats.games = num(o.stats && o.stats.games);
    d.stats.perfect = num(o.stats && o.stats.perfect);
    keysOf(o.best).forEach((k) => { if (KEY_RE.test(k)) d.best[k] = num(o.best[k], 3); });
    keysOf(o.learned).forEach((k) => { if (/^[a-z0-9-]+$/.test(k)) d.learned[k] = true; });
    keysOf(o.mastered).forEach((k) => { if (K.findWord(k)) d.mastered[k] = num(o.mastered[k], 1e5); });
    keysOf(o.topicsPlayed).forEach((k) => { if (/^[a-z0-9-]+$/.test(k)) d.topicsPlayed[k] = true; });
    keysOf(o.gamesPlayed).forEach((k) => { if (/^[a-z]+$/.test(k)) d.gamesPlayed[k] = true; });
    d.streak.count = num(o.streak && o.streak.count, 10000);
    d.streak.last = o.streak && DAY_RE.test(o.streak.last) ? o.streak.last : '';
    BADGES.forEach((b) => { if (o.badges && o.badges[b.id]) d.badges[b.id] = true; });
    d.welcomed = !!o.welcomed;
    const dl = o.daily || {};
    d.daily.date = DAY_RE.test(dl.date) ? dl.date : '';
    ['games', 'correct', 'learn'].forEach((k) => { d.daily[k] = num(dl[k], 10000); });
    K.MISSIONS.forEach((m) => { if (dl.claimed && dl.claimed[m.id]) d.daily.claimed[m.id] = true; });
    d.daily.chest = !!dl.chest;
    K.STICKERS.forEach((st) => { if (o.stickers && o.stickers[st.id]) d.stickers[st.id] = Math.max(1, num(o.stickers[st.id], 1e4)); });
    d.gifts = num(o.gifts, 1e4);
    d.lastLevel = Math.max(1, num(o.lastLevel, 1e5));
    ['sound', 'speech', 'slow'].forEach((k) => { if (o.settings && typeof o.settings[k] === 'boolean') d.settings[k] = o.settings[k]; });
    return d;
  }

  /* ----- Hộp lưu: nhiều hồ sơ ----- */
  let idSeq = 0;
  const newId = () => 'p' + Date.now().toString(36) + (idSeq++).toString(36);

  // Hồ sơ "trống": chưa chơi gì (dùng để thay thế bằng hồ sơ gia đình hoặc ghi đè khi khôi phục)
  const isBlank = (d) => !d.welcomed || (d.stats.games === 0 && d.coins === 0 && !Object.keys(d.stickers).length && !Object.keys(d.learned).length);

  function readBoxRaw() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const o = JSON.parse(raw);
        const box = { active: '', order: [], list: {}, meta: { lastBackup: num(o.meta && o.meta.lastBackup, 1e15), familySeeded: !!(o.meta && o.meta.familySeeded) } };
        (Array.isArray(o.order) ? o.order : keysOf(o.list)).slice(0, MAX_PROFILES).forEach((id) => {
          const d = sanitize(o.list && o.list[id]);
          if (d && typeof id === 'string' && /^[a-z0-9]+$/.test(id)) { box.order.push(id); box.list[id] = d; }
        });
        if (box.order.length) {
          box.active = box.order.includes(o.active) ? o.active : box.order[0];
          return box;
        }
      }
    } catch (e) { /* dữ liệu hỏng: bỏ qua */ }
    const id = newId();
    let first = defaults();
    try {
      const old = localStorage.getItem(LEGACY_KEY); // chuyển dữ liệu bản cũ sang hồ sơ đầu tiên
      if (old) first = sanitize(JSON.parse(old)) || first;
    } catch (e) { /* bỏ qua */ }
    return { active: id, order: [id], list: { [id]: first }, meta: { lastBackup: 0, familySeeded: false } };
  }

  // Lần đầu trên thiết bị: tạo sẵn các hồ sơ gia đình (giữ lại hồ sơ đã có dữ liệu, thay hồ sơ trống)
  function seedFamily(b) {
    if (b.meta.familySeeded || !K.FAMILY || !K.FAMILY.length) return;
    const existing = b.order.filter((id) => !isBlank(b.list[id])).map((id) => ({ id, d: b.list[id], used: false }));
    const order = [];
    const list = {};
    K.FAMILY.forEach((f) => {
      const hit = existing.find((e) => !e.used && e.d.name.toLowerCase() === f.name.toLowerCase());
      if (hit) { hit.used = true; order.push(hit.id); list[hit.id] = hit.d; return; }
      const d = defaults();
      d.name = f.name;
      d.avatar = f.avatar;
      d.welcomed = true;
      const id = newId();
      order.push(id);
      list[id] = d;
    });
    existing.filter((e) => !e.used).forEach((e) => { order.push(e.id); list[e.id] = e.d; });
    b.order = order.slice(0, MAX_PROFILES);
    b.list = {};
    b.order.forEach((id) => { b.list[id] = list[id]; });
    if (!b.order.includes(b.active)) b.active = b.order[0];
    b.meta.familySeeded = true;
  }

  function readBox() {
    const b = readBoxRaw();
    seedFamily(b);
    return b;
  }

  // `state` luôn là đối tượng của hồ sơ đang chơi; đổi hồ sơ thì thay nội dung tại chỗ
  const state = {};
  const setState = (data) => {
    Object.keys(state).forEach((k) => delete state[k]);
    Object.assign(state, data);
  };
  const box = readBox();
  setState(box.list[box.active]);
  box.list[box.active] = state;
  const dataOf = (id) => (id === box.active ? state : box.list[id]);

  K.store = {
    state,
    COINS_PER_LEVEL,

    save() {
      box.list[box.active] = state;
      try {
        localStorage.setItem(KEY, JSON.stringify({ v: 2, active: box.active, order: box.order, meta: box.meta, list: box.list }));
      } catch (e) { /* chế độ riêng tư */ }
    },

    // Xóa tiến trình của hồ sơ đang chơi (giữ tên và hình đại diện)
    reset() {
      const keep = { name: state.name, avatar: state.avatar };
      setState(defaults());
      Object.assign(state, keep, { welcomed: true });
      this.save();
    },

    /* ----- Hồ sơ người chơi ----- */
    MAX_PROFILES,
    activeId() { return box.active; },
    profileCount() { return box.order.length; },
    profiles() {
      return box.order.map((id) => {
        const d = dataOf(id);
        return {
          id, name: d.name, avatar: d.avatar, coins: d.coins, welcomed: d.welcomed, active: id === box.active,
          level: Math.floor(d.coins / COINS_PER_LEVEL) + 1,
          stars: Object.values(d.best).reduce((n, v) => n + v, 0),
        };
      });
    },
    createProfile(name, avatar) {
      if (box.order.length >= MAX_PROFILES) return null;
      const d = defaults();
      d.name = String(name || '').replace(/[<>]/g, '').trim().slice(0, 14);
      d.avatar = K.AVATARS.includes(avatar) ? avatar : d.avatar;
      d.welcomed = true;
      const id = newId();
      box.order.push(id);
      box.list[id] = d;
      this.save();
      return id;
    },
    updateProfile(id, name, avatar) {
      const d = dataOf(id);
      if (!d) return;
      d.name = String(name || '').replace(/[<>]/g, '').trim().slice(0, 14);
      if (K.AVATARS.includes(avatar)) d.avatar = avatar;
      this.save();
    },
    switchProfile(id) {
      if (!box.list[id]) return false;
      if (id !== box.active) {
        box.list[box.active] = clone(state);
        box.active = id;
        setState(box.list[id]);
        box.list[id] = state;
      }
      this.touchDay();
      this.save();
      return true;
    },
    deleteProfile(id) {
      if (box.order.length <= 1 || !box.list[id]) return false;
      if (id === box.active) this.switchProfile(box.order.find((x) => x !== id));
      delete box.list[id];
      box.order = box.order.filter((x) => x !== id);
      this.save();
      return true;
    },

    /* ----- Sao lưu và khôi phục ----- */
    exportData(ids) {
      const list = (ids || box.order).filter((id) => box.list[id]).map((id) => clone(dataOf(id)));
      box.meta.lastBackup = Date.now();
      this.save();
      return JSON.stringify({ app: BACKUP_APP, version: 1, exportedAt: new Date().toISOString(), profiles: list }, null, 1);
    },
    backupDue() {
      return state.stats.games >= 5 && Date.now() - (box.meta.lastBackup || 0) > 14 * 864e5;
    },
    snoozeBackup() {
      box.meta.lastBackup = Date.now() - 7 * 864e5; // nhắc lại sau 7 ngày
      this.save();
    },
    // ask(tên) trả về true để ghi đè hồ sơ trùng tên, false để tạo bản sao
    importData(text, ask) {
      let data;
      try { data = JSON.parse(text); } catch (e) { return { error: 'Tệp không đúng định dạng.' }; }
      const items = data && Array.isArray(data.profiles) ? data.profiles : data && typeof data === 'object' && ('coins' in data || 'best' in data) ? [data] : null;
      if (!items || !items.length || (data.app && data.app !== BACKUP_APP)) return { error: 'Đây không phải tệp sao lưu của ứng dụng.' };

      const res = { added: 0, updated: 0, skipped: 0 };
      const blanks = box.order.filter((id) => !dataOf(id).welcomed); // hồ sơ trống chưa thiết lập
      const touched = [];
      items.slice(0, MAX_PROFILES).forEach((raw) => {
        const s = sanitize(raw);
        if (!s || (K.FAMILY && !K.isFamily(s.name))) { res.skipped++; return; } // chỉ nhận hồ sơ của 4 người chơi cố định
        s.welcomed = true;
        const same = s.name && box.order.find((id) => dataOf(id).welcomed && dataOf(id).name.toLowerCase() === s.name.toLowerCase());
        if (same && (isBlank(dataOf(same)) || !ask || ask(s.name))) {
          if (same === box.active) setState(s); else box.list[same] = s;
          touched.push(same);
          res.updated++;
          return;
        }
        if (box.order.length - blanks.length >= MAX_PROFILES) { res.skipped++; return; }
        if (same) s.name = s.name.slice(0, 9) + ' (2)';
        const id = newId();
        box.order.push(id);
        box.list[id] = s;
        touched.push(id);
        res.added++;
      });
      if (touched.length) {
        blanks.forEach((id) => {
          if (touched.includes(id) || !box.order.includes(id)) return;
          if (id === box.active) this.switchProfile(touched[0]);
          delete box.list[id];
          box.order = box.order.filter((x) => x !== id);
        });
      }
      this.save();
      return res;
    },

    touchDay() {
      const now = new Date();
      const today = dayKey(now);
      if (state.streak.last === today) return;
      const y = dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
      state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
      state.streak.last = today;
      this.save();
    },

    addCoins(n) {
      state.coins += n;
      this.save();
    },

    level() { return Math.floor(state.coins / COINS_PER_LEVEL) + 1; },
    levelProgress() { return (state.coins % COINS_PER_LEVEL) / COINS_PER_LEVEL; },

    bestStars(topic, game) { return state.best[`${topic}/${game}`] || 0; },
    topicStars(topic) { return (K.getTopic(topic) ? K.gamesFor(K.getTopic(topic)) : K.gameOrder).reduce((n, g) => n + this.bestStars(topic, g), 0); },
    totalStars() {
      return Object.values(state.best).reduce((n, v) => n + v, 0);
    },

    record(topic, game, stars) {
      const prev = this.bestStars(topic, game);
      if (stars > prev) state.best[`${topic}/${game}`] = stars;
      this.save();
      return { prev, improved: stars > prev };
    },

    markMastered(en) {
      state.mastered[en] = (state.mastered[en] || 0) + 1;
    },
    masteredCount() { return Object.keys(state.mastered).length; },

    /* ----- Nhiệm vụ mỗi ngày ----- */
    daily() {
      const today = dayKey(new Date());
      if (state.daily.date !== today) {
        state.daily = { date: today, games: 0, correct: 0, learn: 0, claimed: {}, chest: false };
        this.save();
      }
      return state.daily;
    },
    bumpDaily(key, n) {
      this.daily()[key] += n;
    },
    missionDone(m) { return this.daily()[m.key] >= m.goal; },
    claimMission(id) {
      const m = MISSIONS.find((x) => x.id === id);
      const d = this.daily();
      if (!m || d.claimed[id] || !this.missionDone(m)) return 0;
      d.claimed[id] = true;
      state.coins += m.reward;
      this.save();
      return m.reward;
    },
    allMissionsClaimed() {
      const d = this.daily();
      return MISSIONS.every((m) => d.claimed[m.id]);
    },
    claimChest() {
      const d = this.daily();
      if (d.chest || !this.allMissionsClaimed()) return false;
      d.chest = true;
      state.gifts++;
      this.save();
      return true;
    },

    /* ----- Sticker & hộp quà ----- */
    stickerCount() { return Object.keys(state.stickers).length; },
    canOpenGift() { return state.gifts > 0 || state.coins >= K.GIFT_COST; },
    openGift() {
      if (state.gifts > 0) state.gifts--;
      else if (state.coins >= K.GIFT_COST) state.coins -= K.GIFT_COST;
      else return null;
      const total = Object.values(K.RARITY).reduce((n, r) => n + r.weight, 0);
      let roll = Math.random() * total;
      let rarity = 'common';
      for (const k in K.RARITY) {
        if ((roll -= K.RARITY[k].weight) < 0) { rarity = k; break; }
      }
      const pool = K.STICKERS.filter((x) => x.rarity === rarity);
      const sticker = pool[Math.floor(Math.random() * pool.length)];
      const isNew = !state.stickers[sticker.id];
      state.stickers[sticker.id] = (state.stickers[sticker.id] || 0) + 1;
      this.save();
      return { sticker, isNew };
    },

    // Thưởng hộp quà khi lên cấp; trả về số cấp vừa lên
    checkLevelUp() {
      const lvl = this.level();
      if (lvl <= state.lastLevel) return 0;
      const gained = lvl - state.lastLevel;
      state.lastLevel = lvl;
      state.gifts += gained;
      this.save();
      return gained;
    },

    checkBadges() {
      const fresh = [];
      BADGES.forEach((b) => {
        if (!state.badges[b.id] && b.test(state)) {
          state.badges[b.id] = true;
          fresh.push(b);
        }
      });
      if (fresh.length) this.save();
      return fresh;
    },
  };
})();
