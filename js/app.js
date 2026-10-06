/* Ứng dụng chính: định tuyến (hash), các màn hình, màn kết quả, cài đặt */
(function () {
  const K = window.K;
  const app = document.getElementById('app');
  let current = null; // trò chơi đang chạy

  let pickedMem = false;
  const isPicked = () => {
    try { return sessionStorage.getItem('kidEnglish.picked') === '1'; } catch (e) { return pickedMem; }
  };
  const setPicked = () => {
    pickedMem = true;
    try { sessionStorage.setItem('kidEnglish.picked', '1'); } catch (e) { /* bỏ qua */ }
  };

  /* ---------- Hộp thoại ---------- */
  function modal(html, dismissible) {
    const root = document.getElementById('modal-root');
    const wrap = K.html(`<div class="modal-back"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`);
    root.appendChild(wrap);
    wrap.close = () => wrap.remove();
    wrap.addEventListener('click', (e) => {
      if ((e.target === wrap && dismissible !== false) || e.target.closest('[data-close]')) wrap.close();
    });
    return wrap;
  }

  function avatarPicker(selected) {
    return `<div class="avatars" role="radiogroup" aria-label="Chọn hình đại diện">
      ${K.AVATARS.map((a) => `<button type="button" class="avatar-opt${a === selected ? ' on' : ''}" data-avatar="${a}" role="radio" aria-checked="${a === selected}">${K.avatarHtml(a)}</button>`).join('')}
    </div>`;
  }
  function wireAvatars(m) {
    m.querySelectorAll('[data-avatar]').forEach((b) =>
      b.addEventListener('click', () => {
        m.querySelectorAll('[data-avatar]').forEach((x) => {
          x.classList.toggle('on', x === b);
          x.setAttribute('aria-checked', x === b);
        });
        K.audio.sfx('click');
      })
    );
  }
  const chosenAvatar = (m) => (m.querySelector('.avatar-opt.on') || {}).dataset.avatar || K.AVATARS[0];

  function openWelcome() {
    const s = K.store.state;
    const m = modal(
      `<div class="mascot big">🦉</div>
       <h2>Xin chào bạn nhỏ!</h2>
       <p>Mình là <b>Cú Mèo</b>. Cùng học tiếng Anh thật vui nhé!</p>
       <label class="field">Bạn tên là gì?
         <input type="text" maxlength="14" placeholder="Nhập tên của bạn" data-name autocomplete="off" value="${K.esc(s.name)}">
       </label>
       <div class="field">Chọn bạn đồng hành:</div>
       ${avatarPicker(s.avatar)}
       <button class="btn big" data-ok style="--c:#22c55e">🚀 Bắt đầu thôi!</button>
       <button class="linkbtn" data-restore>Đã có file sao lưu? Khôi phục tiến trình</button>`,
      false
    );
    m.dataset.keep = '1';
    m.querySelector('[data-restore]').addEventListener('click', openBackup);
    wireAvatars(m);
    m.querySelector('[data-ok]').addEventListener('click', () => {
      s.name = m.querySelector('[data-name]').value.trim();
      s.avatar = chosenAvatar(m);
      s.welcomed = true;
      K.store.save();
      K.audio.sfx('correct');
      K.audio.speak(s.name ? `Hello, ${s.name}!` : 'Hello!');
      setPicked();
      m.close();
      route();
    });
  }

  function openSettings() {
    const s = K.store.state;
    const sw = (key, label) =>
      `<label class="switch-row"><span>${label}</span><input type="checkbox" data-set="${key}" ${s.settings[key] ? 'checked' : ''}></label>`;
    const m = modal(
      `<h2>⚙️ Cài đặt</h2>
       ${sw('sound', '🔊 Âm thanh hiệu ứng')}
       ${sw('speech', '🗣️ Đọc từ tiếng Anh')}
       ${sw('slow', '🐢 Đọc chậm cho bé')}
       ${K.audio.hasSpeech ? '' : '<p class="note">Trình duyệt này chưa hỗ trợ giọng đọc. Hãy thử Chrome, Edge hoặc Safari.</p>'}
       <button class="btn" data-test style="--c:#06b6d4">🎧 Thử giọng đọc</button>
       <hr>
       <button class="btn" data-go="#/who" data-close style="--c:#7c5cff">👥 Đổi người chơi</button>
       <button class="btn" data-act="backup" style="--c:#06b6d4">💾 Sao lưu &amp; khôi phục</button>
       <hr>
       <div class="field">Hình đại diện của ${K.esc(s.name || 'bạn')}:</div>
       ${avatarPicker(s.avatar)}
       <hr>
       <button class="btn" data-reset style="--c:#ef4444">🗑️ Xóa tiến trình của bé này</button>
       <button class="btn big" data-close style="--c:#22c55e">Xong</button>`
    );
    wireAvatars(m);
    m.querySelectorAll('[data-set]').forEach((i) =>
      i.addEventListener('change', () => {
        s.settings[i.dataset.set] = i.checked;
        K.store.save();
      })
    );
    m.querySelector('[data-test]').addEventListener('click', () => K.audio.speak('Hello! Nice to meet you!'));
    m.querySelector('[data-reset]').addEventListener('click', () => {
      if (window.confirm('Xóa hết sao, xu, sticker và huy hiệu của hồ sơ này? Không thể khôi phục lại (trừ khi đã sao lưu).')) {
        K.store.reset();
        m.close();
        K.store.touchDay();
        route();
      }
    });
    m.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || e.target === m) {
        s.avatar = chosenAvatar(m);
        K.store.save();
        route();
      }
    });
  }

  function rerender() {
    const y = window.scrollY;
    route();
    window.scrollTo(0, y);
  }

  /* ---------- Đồng bộ đám mây: hiển thị ---------- */
  const cloudIcon = () => ({ ok: '☁️✓', syncing: '☁️…', offline: '☁️✕', error: '☁️⚠️', idle: '☁️' }[K.cloud.status()] || '☁️');
  const cloudPill = () => (K.cloud.linked() ? `<span class="pill cloud" data-cloud title="Đồng bộ đám mây">${cloudIcon()}</span>` : '');
  function cloudStatusText() {
    const st = K.cloud.status();
    if (st === 'syncing') return '⏳ Đang đồng bộ…';
    if (st === 'offline') return '📴 Chưa có mạng. Sẽ tự đồng bộ khi có mạng.';
    if (st === 'error') return '⚠️ Chưa đồng bộ được, app sẽ tự thử lại.';
    const t = K.cloud.lastSync();
    if (st === 'ok' && t) return '✅ Đã đồng bộ lúc ' + new Date(t).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return 'Sẵn sàng đồng bộ.';
  }

  /* ---------- Thành phần giao diện ---------- */
  const coinPill = () => `<span class="pill coin" data-coins>🪙 ${K.store.state.coins}</span>`;
  const topicStarsMax = (t) => K.gamesFor(t).length * 3;

  /* Thẻ từ: hình + từ tiếng Anh + nghĩa tiếng Việt */
  const chipHtml = (w, letter) => {
    const say = letter ? `${K.letterSpeech(letter)}. ${w.en}` : w.en;
    return `<button class="chip" data-say="${K.esc(say)}">${letter ? `<b class="chip-letter">${letter}</b>` : ''}${K.hasPicture(w) ? K.visual(w) : ''}<span class="chip-text"><b>${K.esc(w.en)}</b><small>${K.esc(w.vi)}</small></span></button>`;
  };
  const speakable = (s) => s.replace(/…/g, '').replace(/\s*\/\s*/g, ', ').replace(/\s+/g, ' ').trim();

  /* Tab trên trang chủ: Tập 1 / Tập 2 / Mở rộng */
  const TABS = [['book1', '📘 Tập 1'], ['book2', '📗 Tập 2'], ['extra', '🎈 Mở rộng']];
  let tabMem = 'book1';
  const getTab = () => {
    try { return localStorage.getItem('kidEnglish.tab') || tabMem; } catch (e) { return tabMem; }
  };
  const setTab = (t) => {
    tabMem = t;
    try { localStorage.setItem('kidEnglish.tab', t); } catch (e) { /* bỏ qua */ }
  };
  function topicCard(t) {
    const max = topicStarsMax(t);
    const st = K.store.topicStars(t.id);
    const pc = Math.round((st / max) * 100);
    return `<button class="tcard${t.review ? ' review' : ''}" style="--tc:${t.color}" data-go="#/topic/${t.id}">
      ${t.group !== 'extra' && t.unit ? `<span class="t-unit">${t.unit}</span>` : ''}
      <span class="t-icon">${t.icon}</span>
      <span class="t-name">${t.vi}</span>
      <span class="t-en">${t.en}</span>
      <span class="t-bar"><i style="width:${pc}%"></i></span>
      <span class="t-stars">⭐ ${st}/${max}</span>
    </button>`;
  }
  function topicSections(tab) {
    const groups = [];
    K.TOPICS.filter((t) => t.group === tab).forEach((t) => {
      const th = t.theme || 'Từ vựng vui mở rộng (ngoài chương trình)';
      let g = groups.find((x) => x.theme === th);
      if (!g) groups.push((g = { theme: th, items: [] }));
      g.items.push(t);
    });
    return groups;
  }

  function stars(n, max) {
    let h = '';
    for (let i = 0; i < max; i++) h += `<span class="${i < n ? 'on' : ''}">★</span>`;
    return `<span class="starrow" aria-label="${n} trên ${max} sao">${h}</span>`;
  }

  function missionsCard() {
    const d = K.store.daily();
    const rows = K.MISSIONS.map((m) => {
      const p = Math.min(d[m.key], m.goal);
      const done = p >= m.goal;
      const claimed = d.claimed[m.id];
      const tail = claimed
        ? '<span class="m-ok">✅</span>'
        : done
          ? `<button class="btn m-claim" data-act="claim" data-id="${m.id}" style="--c:#22c55e">+${m.reward} 🪙</button>`
          : `<span class="m-reward">+${m.reward} 🪙</span>`;
      return `<div class="mission${claimed ? ' claimed' : ''}">
        <span class="m-icon">${m.icon}</span>
        <span class="m-body"><b>${m.text}</b><span class="m-bar"><i style="width:${(p / m.goal) * 100}%"></i></span></span>
        <span class="m-prog">${p}/${m.goal}</span>${tail}
      </div>`;
    }).join('');
    const chest = !K.store.allMissionsClaimed()
      ? '<div class="chest locked">🎁 Hoàn thành cả 3 nhiệm vụ để nhận hộp quà bí mật</div>'
      : d.chest
        ? '<div class="chest done">🎉 Hôm nay bạn đã nhận hộp quà rồi. Mai quay lại nhé!</div>'
        : '<button class="btn chest" data-act="chest" style="--c:#f59e0b">🎁 Nhận hộp quà bí mật!</button>';
    return `<div class="missions"><h2>🎯 Nhiệm vụ hôm nay</h2>${rows}${chest}</div>`;
  }

  /* ---------- Màn hình chính ---------- */
  function renderHome() {
    const s = K.store.state;
    const who = s.name ? K.esc(s.name) : 'bạn nhỏ';
    const lvl = K.store.level();
    const pct = Math.round(K.store.levelProgress() * 100);
    const tab = getTab();
    app.innerHTML = `
      <section class="screen home">
        <header class="topbar">
          <button class="profile" data-go="#/who" aria-label="Đổi người chơi">
            <span class="avatar">${K.avatarHtml(s.avatar)}</span>
            <span class="pname">${s.name ? K.esc(s.name) : 'Bé yêu'}</span>
          </button>
          <div class="pills">
            ${cloudPill()}
            <span class="pill streak" title="Số ngày học liên tiếp">🔥 ${s.streak.count}</span>
            ${coinPill()}
          </div>
          <div class="actions">
            <button class="btn-round has-dot" data-go="#/stickers" aria-label="Sticker và hộp quà">🎁${s.gifts > 0 ? `<i class="dot">${s.gifts}</i>` : ''}</button>
            <button class="btn-round" data-go="#/rewards" aria-label="Phần thưởng">🏆</button>
            <button class="btn-round" data-act="settings" aria-label="Cài đặt">⚙️</button>
          </div>
        </header>

        <div class="hero">
          <div class="mascot big" data-act="owl">🦉</div>
          <div class="bubble">Xin chào <b>${who}</b>! Hôm nay mình học gì nào? 🌟</div>
        </div>

        ${K.cloud.enabled() && !K.cloud.linked() && s.stats.games >= 1 ? `<div class="backup-banner cloud-banner">
          <span class="bb-icon">☁️</span>
          <div><b>Lưu tiến độ trên mạng nhé!</b><small>Bật đồng bộ để dùng được trên mọi thiết bị.</small></div>
          <button class="btn" data-act="backup" style="--c:#06b6d4">Bật</button>
        </div>` : ''}

        ${K.store.backupDue() ? `<div class="backup-banner">
          <span class="bb-icon">💾</span>
          <div><b>Nhớ sao lưu nhé!</b><small>Bé chơi nhiều rồi, hãy lưu lại để không mất tiến trình.</small></div>
          <button class="btn" data-act="backup" style="--c:#06b6d4">Sao lưu</button>
          <button class="bb-x" data-act="snooze" aria-label="Để sau">✕</button>
        </div>` : ''}

        <div class="level-card">
          <span class="lvl">Cấp ${lvl}</span>
          <span class="lvl-bar"><i style="width:${pct}%"></i></span>
          <span class="lvl-next">${s.coins % K.store.COINS_PER_LEVEL}/${K.store.COINS_PER_LEVEL} 🪙</span>
        </div>

        ${missionsCard()}

        <button class="daily" data-go="#/topic/mix">
          <span class="daily-icon">🎲</span>
          <span><b>Thử thách tổng hợp lớp 4</b><small>Từ vựng và câu mẫu của cả 20 unit trộn lẫn</small></span>
        </button>

        <div class="book-tabs" role="tablist" aria-label="Chọn sách">
          ${TABS.map(([id, label]) => `<button role="tab" aria-selected="${id === tab}" class="${id === tab ? 'on' : ''}" data-act="tab" data-tab="${id}">${label}</button>`).join('')}
        </div>
        ${topicSections(tab).map((g) => `
          <h2 class="section-title">${g.theme}</h2>
          <div class="topic-grid">${g.items.map(topicCard).join('')}</div>`).join('')}
      </section>`;
  }

  /* ---------- Màn hình chủ đề ---------- */
  function renderTopic(topic) {
    const learned = K.store.state.learned[topic.id];
    const preview = topic.id === 'mix' ? K.sample(topic.words, 12) : topic.words;
    const games = K.gamesFor(topic);
    const structures = topic.structures || [];
    const phonics = topic.phonics || [];
    const sentences = topic.sentences || [];
    app.innerHTML = `
      <section class="screen topic" style="--tc:${topic.color}">
        <header class="topbar">
          <button class="btn-round" data-go="#/" aria-label="Về trang chủ">←</button>
          <h1 class="ttitle"><span>${topic.icon}</span> ${topic.vi} <small>${topic.group !== 'extra' && topic.unit ? topic.unit + ' · ' : ''}${topic.en}</small></h1>
          ${coinPill()}
        </header>

        <p class="hint-line">👆 Chạm vào từng từ để nghe phát âm${topic.id === 'mix' ? ' (12 từ ngẫu nhiên)' : ''}</p>
        <div class="word-chips">
          ${preview.map((w) => chipHtml(w, topic.id === 'abc' ? K.letterOf(w) : '')).join('')}
        </div>
        ${topic.id === 'abc' ? '<button class="song-card" data-act="song"><span>🎵</span><b>Hát bài ABC cùng Cú Mèo</b><small>Nghe và nhìn từng chữ cái nhảy múa</small></button>' : ''}

        ${structures.length ? `
          <h2 class="section-title">💬 Mẫu câu cần nhớ</h2>
          <div class="struct-list">
            ${structures
              .map(([q, ans]) => `<button class="struct" data-say="${K.esc(speakable(q) + ' ' + speakable(ans))}">
                <span class="st-q">${K.esc(q)}</span>
                <span class="st-a">➜ ${K.esc(ans)}</span>
                <span class="st-sp">🔊</span>
              </button>`)
              .join('')}
          </div>` : ''}

        <button class="learn-card" data-go="#/play/${topic.id}/learn">
          <span class="g-icon">📖</span>
          <span class="g-text"><b>Học từ mới</b><small>Xem hình, nghe phát âm, học nghĩa</small></span>
          <span class="g-done">${learned ? '✅' : '▶'}</span>
        </button>

        <h2 class="section-title">Chơi game</h2>
        <div class="game-grid">
          ${games
            .map((id) => {
              const g = K.games[id];
              return `<button class="gcard" style="--gc:${g.color}" data-go="#/play/${topic.id}/${id}">
                <span class="g-icon">${g.icon}</span>
                <b>${g.name}</b>
                <small>${g.desc}</small>
                ${stars(K.store.bestStars(topic.id, id), 3)}
              </button>`;
            })
            .join('')}
        </div>

        ${sentences.length ? `
          <details class="sent-list">
            <summary>📝 Câu mẫu của bài này (${sentences.length})</summary>
            ${sentences
              .map((s) => `<button class="sent-row" data-say="${K.esc(s.en)}"><span>🔊</span><span><b>${K.esc(s.en)}</b><small>${K.esc(s.vi)}</small></span></button>`)
              .join('')}
          </details>` : ''}

        ${phonics.length ? `
          <h2 class="section-title">🔈 ${topic.phonicsTitle || 'Âm cần nhớ'}</h2>
          <p class="hint-line">${topic.phonicsTitle === 'Trọng âm' ? 'Nghe và đọc to, nhấn mạnh đúng âm tiết:' : 'Nghe và đọc to các từ mẫu:'}</p>
          <div class="word-chips">
            ${phonics.map((p) => `<button class="chip" data-say="${K.esc(p)}"><span class="chip-text"><b>${K.esc(p)}</b></span></button>`).join('')}
          </div>` : ''}
      </section>`;
  }

  /* ---------- Màn hình chơi ---------- */
  function renderPlay(topic, game) {
    app.innerHTML = `
      <section class="screen play" style="--gc:${game.color};--tc:${topic.color}">
        <header class="topbar">
          <button class="btn-round" data-go="#/topic/${topic.id}" aria-label="Thoát trò chơi">←</button>
          <h1 class="ttitle small"><span>${game.icon}</span> ${game.name} <small>${topic.icon} ${topic.vi}</small></h1>
          ${coinPill()}
        </header>
        <div class="progress" aria-hidden="true"><span data-progress></span></div>
        <div class="mascot-row">
          <div class="mascot" data-act="owl">🦉</div>
          <div class="bubble" data-bubble>Bắt đầu thôi!</div>
        </div>
        <div class="game-area"></div>
      </section>`;

    const screen = app.querySelector('.screen');
    const timers = new Set();
    const cleanups = [];
    let destroyed = false;
    let finished = false;

    const ctx = {
      topic,
      words: topic.words,
      root: screen.querySelector('.game-area'),
      earned: 0,

      later(fn, ms) {
        const id = setTimeout(() => { timers.delete(id); if (!destroyed) fn(); }, ms);
        timers.add(id);
        return id;
      },
      interval(fn, ms) {
        const id = setInterval(() => { if (!destroyed) fn(); }, ms);
        timers.add(id);
        return id;
      },
      onDestroy(fn) {
        cleanups.push(fn);
      },
      listen(target, ev, fn) {
        target.addEventListener(ev, fn);
        cleanups.push(() => target.removeEventListener(ev, fn));
      },
      say(text) {
        const b = screen.querySelector('[data-bubble]');
        if (!b) return;
        b.textContent = text;
        b.classList.remove('pop-in');
        void b.offsetWidth;
        b.classList.add('pop-in');
      },
      progress(done, total) {
        const p = screen.querySelector('[data-progress]');
        if (p) p.style.width = Math.min(100, (done / total) * 100) + '%';
      },
      reward(n, el) {
        ctx.earned += n;
        K.store.addCoins(n);
        const pill = screen.querySelector('[data-coins]');
        if (pill) pill.textContent = '🪙 ' + K.store.state.coins;
        K.fx.floatText(el, '+' + n + ' 🪙');
      },
      mastered(w) {
        K.store.markMastered(w.en);
      },
      finish(res) {
        if (finished || destroyed) return;
        finished = true;
        finishGame(ctx, screen, topic, game, res || {});
      },
    };

    current = {
      destroy() {
        destroyed = true;
        timers.forEach((id) => { clearTimeout(id); clearInterval(id); });
        timers.clear();
        cleanups.forEach((fn) => fn());
        cleanups.length = 0;
      },
    };
    game.start(ctx);
  }

  /* ---------- Màn hình kết quả ---------- */
  function finishGame(ctx, screen, topic, game, res) {
    const st = K.store.state;
    const scored = game.scored !== false;
    let starCount = 0;
    let improved = false;

    if (scored) {
      const acc = res.total ? res.correct / res.total : 0;
      starCount = res.stars != null ? res.stars : acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : acc >= 0.4 ? 1 : 0;
      const bonus = starCount * 10;
      ctx.earned += bonus;
      K.store.addCoins(bonus);
      st.stats.games++;
      if (starCount === 3) st.stats.perfect++;
      st.gamesPlayed[game.id] = true;
      improved = K.store.record(topic.id, game.id, starCount).improved;
      K.store.bumpDaily('games', 1);
      K.store.bumpDaily('correct', res.correct || 0);
    } else {
      ctx.earned += 20;
      K.store.addCoins(20);
      st.learned[topic.id] = true;
      K.store.bumpDaily('learn', 1);
    }
    st.topicsPlayed[topic.id] = true;
    K.store.touchDay();
    const levelUps = K.store.checkLevelUp();
    const fresh = K.store.checkBadges();
    K.store.save();
    const claimable = K.MISSIONS.some((m) => K.store.missionDone(m) && !K.store.daily().claimed[m.id]);

    const titles = ['Đừng nản nhé!', 'Khá tốt!', 'Giỏi lắm!', 'Xuất sắc!'];
    const subs = ['Try again! Luyện thêm một chút là được ngay.', 'Good! Chơi lại để được nhiều sao hơn nhé.', 'Great job! Bạn giỏi quá.', 'Perfect! Bạn là siêu sao tiếng Anh!'];
    const title = scored ? titles[starCount] : 'Hoàn thành!';
    const sub = scored ? subs[starCount] : 'Great job! Giờ thử chơi game để nhớ từ lâu hơn nhé.';
    const detail = res.summary || `Đúng ${res.correct}/${res.total} câu`;

    const playable = K.gamesFor(topic);
    const idx = playable.indexOf(game.id);
    const nextId = scored ? playable[(idx + 1) % playable.length] : playable[0];
    const next = K.games[nextId];

    screen.querySelector('.game-area').innerHTML = `
      <div class="result">
        <div class="mascot huge">🦉</div>
        <h2>${title}</h2>
        ${scored ? `<div class="big-stars">${[0, 1, 2].map((i) => `<span class="${i < starCount ? 'on' : ''}" style="animation-delay:${0.25 * i + 0.2}s">★</span>`).join('')}</div>` : ''}
        <p class="res-detail">${detail}</p>
        <p class="res-sub">${sub}</p>
        <div class="res-coins">+${ctx.earned} 🪙${improved && starCount > 0 ? ' · Kỷ lục mới! 🏅' : ''}</div>
        ${claimable ? '<div class="res-note">🎯 Có nhiệm vụ đã hoàn thành! Về trang chủ nhận thưởng nhé.</div>' : ''}
        ${fresh.map((b) => `<div class="new-badge"><span>${b.icon}</span> Huy hiệu mới: <b>${b.name}</b></div>`).join('')}
        <div class="res-actions">
          ${scored ? `<button class="btn big" data-act="again" style="--c:#22c55e">🔄 Chơi lại</button>` : `<button class="btn big" data-go="#/play/${topic.id}/${nextId}" style="--c:#22c55e">${next.icon} Chơi ${next.name}</button>`}
          ${scored ? `<button class="btn" data-go="#/play/${topic.id}/${nextId}" style="--c:#7c5cff">${next.icon} ${next.name}</button>` : `<button class="btn" data-act="again" style="--c:#7c5cff">📖 Học lại</button>`}
          <button class="btn" data-go="#/topic/${topic.id}" style="--c:#06b6d4">📚 Chủ đề</button>
          <button class="btn" data-go="#/" style="--c:#64748b">🏠 Trang chủ</button>
        </div>
      </div>`;
    screen.querySelector('.progress').style.visibility = 'hidden';
    screen.querySelector('[data-bubble]').textContent = starCount >= 2 || !scored ? K.pick(K.PRAISE) : K.pick(K.OOPS);
    const pill = screen.querySelector('[data-coins]');
    if (pill) pill.textContent = '🪙 ' + st.coins;

    if (!scored || starCount >= 1) {
      K.audio.sfx('win');
      if (starCount >= 2 || !scored) K.fx.confetti(starCount === 3 ? 180 : 110);
    } else K.audio.sfx('wrong');
    fresh.forEach((b) => K.fx.toast(`${b.icon} Huy hiệu mới: ${b.name}`));
    if (levelUps) {
      setTimeout(() => {
        if (!document.body.contains(screen)) return; // bé đã rời màn kết quả: quà vẫn được tặng, hiện chấm đỏ ở nút 🎁
        K.audio.sfx('win');
        K.fx.confetti(160);
        modal(
          `<div class="mascot huge">🦉</div>
           <h2>🎉 Lên Cấp ${K.store.level()}!</h2>
           <p>Bạn giỏi quá! Cú Mèo tặng bạn <b>${levelUps} hộp quà</b> 🎁</p>
           <button class="btn big" data-go="#/stickers" data-close style="--c:#f59e0b">🎁 Mở quà ngay</button>
           <button class="btn" data-close style="--c:#64748b">Để sau</button>`
        );
      }, 1100);
    }
  }

  /* ---------- Sticker & hộp quà ---------- */
  function renderStickers() {
    const s = K.store.state;
    const free = s.gifts > 0;
    const can = K.store.canOpenGift();
    app.innerHTML = `
      <section class="screen stickers">
        <header class="topbar">
          <button class="btn-round" data-go="#/" aria-label="Về trang chủ">←</button>
          <h1 class="ttitle"><span>🎁</span> Sticker của bé <small>${K.store.stickerCount()}/${K.STICKERS.length} sticker</small></h1>
          ${coinPill()}
        </header>

        <div class="gift-panel">
          <button class="gift-box" data-act="gift" aria-label="Mở hộp quà"${can ? '' : ' disabled'}>🎁</button>
          <div class="gift-info">
            <b>${free ? `Bạn có ${s.gifts} hộp quà miễn phí!` : 'Hộp quà bí mật'}</b>
            <small>${free ? 'Bấm để mở và sưu tầm sticker mới' : `Mở bằng ${K.GIFT_COST} 🪙. Lên cấp và làm nhiệm vụ để nhận quà miễn phí.`}</small>
            <button class="btn big" data-act="gift"${can ? '' : ' disabled'} style="--c:#f59e0b">${free ? '🎁 Mở quà miễn phí' : `🎁 Mở quà (${K.GIFT_COST} 🪙)`}</button>
          </div>
        </div>

        <div class="legend">${Object.values(K.RARITY).map((r) => `<span style="--rc:${r.color}">● ${r.name}</span>`).join('')}</div>
        <div class="sticker-grid">
          ${K.STICKERS.map((st) => {
            const n = s.stickers[st.id];
            return n
              ? `<button class="sticker ${st.rarity}" data-act="pet" aria-label="Sticker ${st.e}">${st.e}${n > 1 ? `<i class="cnt">x${n}</i>` : ''}</button>`
              : '<div class="sticker locked" aria-label="Chưa có"><b>?</b></div>';
          }).join('')}
        </div>
      </section>`;
  }

  function openGiftModal() {
    if (!K.store.canOpenGift()) {
      K.fx.toast(`Cần ${K.GIFT_COST} 🪙 để mở quà. Chơi thêm nhé!`);
      return;
    }
    const r = K.store.openGift();
    if (!r) return;
    const rar = K.RARITY[r.sticker.rarity];
    const m = modal('<div class="gift-open"><div class="gift-shake">🎁</div><p>Đang mở quà...</p></div>', false);
    K.audio.sfx('flip');
    setTimeout(() => {
      m.querySelector('.modal').innerHTML = `
        <div class="reveal ${r.sticker.rarity}">
          <div class="sticker-big">${r.sticker.e}</div>
          <h2>${r.isNew ? 'Sticker mới! 🎉' : 'Bạn đã có sticker này rồi'}</h2>
          <div class="rar" style="color:${rar.color}">${rar.name}</div>
          <button class="btn big" data-close style="--c:#22c55e">Tuyệt vời!</button>
        </div>`;
      K.audio.sfx('win');
      K.fx.confetti(r.sticker.rarity === 'epic' ? 200 : r.sticker.rarity === 'rare' ? 140 : 80);
      K.store.checkBadges().forEach((b) => K.fx.toast(`${b.icon} Huy hiệu mới: ${b.name}`));
    }, 1400);
    m.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) route();
    });
  }

  /* ---------- Bài hát ABC ---------- */
  function openSong() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const m = modal(
      `<h2>🎵 Bài hát ABC</h2>
       <div class="abc-grid">${letters.map((l) => `<span data-l="${l}">${l}</span>`).join('')}</div>
       <p class="song-line">Hát cùng Cú Mèo nào!</p>
       <button class="btn big" data-start style="--c:#22c55e">▶ Bắt đầu hát</button>
       <button class="btn" data-close style="--c:#64748b">Đóng</button>`
    );
    let token = 0;
    const cells = [...m.querySelectorAll('[data-l]')];
    const line = m.querySelector('.song-line');
    const stop = () => { token++; K.audio.stop(); };
    m.addEventListener('click', (e) => {
      if (e.target === m || e.target.closest('[data-close]')) stop();
    });
    m.querySelector('[data-start]').addEventListener('click', () => {
      const mine = ++token;
      cells.forEach((c) => c.classList.remove('on', 'done'));
      let i = 0;
      (function step() {
        if (mine !== token || !document.body.contains(m)) return;
        if (i >= letters.length) {
          cells.forEach((c) => { c.classList.remove('on'); c.classList.add('done'); });
          line.textContent = 'Giỏi quá! Bạn hát xong bài ABC rồi! 🎉';
          K.audio.sfx('win');
          K.fx.confetti(120);
          return;
        }
        cells.forEach((c, n) => { c.classList.toggle('on', n === i); if (n < i) c.classList.add('done'); });
        line.textContent = `${letters[i]} – ${K.EXTRA_TOPICS.find((t) => t.id === 'abc').words[i].en}`;
        let advanced = false;
        const adv = () => {
          if (advanced || mine !== token || !document.body.contains(m)) return;
          advanced = true;
          i++;
          setTimeout(step, 120);
        };
        K.audio.speak(K.letterSpeech(letters[i]), { onend: adv });
        setTimeout(adv, 2500); // phòng khi trình duyệt không báo kết thúc
      })();
    });
  }

  /* ---------- Chọn người chơi ---------- */
  function renderWho() {
    const ps = K.store.profiles().filter((p) => p.welcomed && K.isFamily(p.name));
    app.innerHTML = `
      <section class="screen who">
        <header class="topbar">
          ${isPicked() ? '<button class="btn-round" data-go="#/" aria-label="Về trang chủ">←</button>' : ''}
          <h1 class="ttitle"><span>👥</span> Ai đang chơi nào? <small>Chạm vào tên của bạn để bắt đầu</small></h1>
        </header>
        <div class="who-grid">
          ${ps.map((p) => `
            <div class="who-card${p.active && isPicked() ? ' active' : ''}">
              <button class="who-pick" data-act="pick" data-id="${p.id}">
                <span class="avatar xxl">${K.avatarHtml(p.avatar)}</span>
                <b>${p.name ? K.esc(p.name) : 'Bé yêu'}</b>
                <small>Cấp ${p.level} · ⭐ ${p.stars} · 🪙 ${p.coins}</small>
              </button>
              <button class="who-edit" data-act="editprofile" data-id="${p.id}" aria-label="Đổi hình đại diện của ${p.name ? K.esc(p.name) : ''}">🎨</button>
            </div>`).join('')}
        </div>
        <div class="who-actions">
          <button class="btn" data-act="backup" style="--c:#06b6d4">💾 Sao lưu &amp; khôi phục</button>
        </div>
      </section>`;
  }

  function openEditProfile(id) {
    const p = K.store.profiles().find((x) => x.id === id);
    if (!p) return;
    const m = modal(
      `<h2>🎨 Hình của ${K.esc(p.name)}</h2>
       ${avatarPicker(p.avatar)}
       <button class="btn big" data-save style="--c:#22c55e">💾 Lưu</button>
       <button class="btn" data-close style="--c:#64748b">Đóng</button>`
    );
    wireAvatars(m);
    m.querySelector('[data-save]').addEventListener('click', () => {
      K.store.updateProfile(id, p.name, chosenAvatar(m));
      m.close();
      route();
    });
  }

  function downloadBackup(text, who) {
    const d = new Date();
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const tag = who ? '-' + who.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '') : '';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = `tien-trinh-hoc-tieng-anh${tag}-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }

  // Khu vực người lớn: sao lưu/khôi phục cần mật khẩu
  let pwFails = 0;
  let pwLockedUntil = 0;
  function openBackup() {
    const m = modal(
      `<h2>🔒 Nhập mật khẩu</h2>
       <p class="note-ok">Khu vực dành cho người lớn.</p>
       <input class="pw-input" type="password" inputmode="numeric" autocomplete="off" maxlength="20" placeholder="Mật khẩu" data-pw aria-label="Mật khẩu">
       <div class="pw-error" data-err aria-live="polite"></div>
       <button class="btn big" data-ok style="--c:#22c55e">Mở</button>
       <button class="btn" data-close style="--c:#64748b">Hủy</button>`
    );
    const input = m.querySelector('[data-pw]');
    const err = m.querySelector('[data-err]');
    setTimeout(() => input.focus(), 50);
    const submit = () => {
      const wait = Math.ceil((pwLockedUntil - Date.now()) / 1000);
      if (wait > 0) { err.textContent = `Thử lại sau ${wait} giây nhé.`; return; }
      if (K.checkPassword(input.value)) {
        pwFails = 0;
        m.close();
        showBackup();
        return;
      }
      pwFails++;
      input.value = '';
      K.audio.sfx('wrong');
      input.classList.remove('shake');
      void input.offsetWidth;
      input.classList.add('shake');
      if (pwFails >= 3) { pwLockedUntil = Date.now() + 30000; pwFails = 0; err.textContent = 'Sai nhiều lần. Thử lại sau 30 giây.'; }
      else err.textContent = 'Sai mật khẩu. Thử lại nhé!';
    };
    m.querySelector('[data-ok]').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function cloudSectionHtml() {
    if (!K.cloud.enabled()) {
      return `<hr><div class="cloud-box"><b>☁️ Đồng bộ đám mây</b>
        <p class="note-ok">Chưa được bật. Xem file <b>HUONG-DAN-DONG-BO.md</b> để bật (cần tạo dự án Firebase miễn phí, khoảng 10 phút).</p></div>`;
    }
    if (!K.cloud.linked()) {
      return `<hr><div class="cloud-box"><b>☁️ Đồng bộ đám mây</b>
        <p class="note-ok">Lưu tiến độ lên mạng, dùng được trên mọi thiết bị. Mỗi lần chơi có mạng, app tự lưu.</p>
        <button class="btn" data-cloud-create style="--c:#22c55e">✨ Tạo mã gia đình (máy đầu tiên)</button>
        <button class="btn" data-cloud-join style="--c:#7c5cff">🔗 Nhập mã gia đình (máy khác)</button>
        <div class="cloud-join" data-cloud-joinbox hidden>
          <input class="pw-input code-input" type="text" autocomplete="off" autocapitalize="characters" maxlength="30" placeholder="ABCD-EFGH-JKMN-PQRS-TUVW" data-cloud-code aria-label="Mã gia đình">
          <button class="btn" data-cloud-go style="--c:#22c55e">Kết nối</button>
        </div>
        <div class="cloud-msg" data-cloud-msg aria-live="polite"></div></div>`;
    }
    return `<hr><div class="cloud-box"><b>☁️ Đã bật đồng bộ</b>
      <div class="cloud-msg" data-cloud-msg aria-live="polite">${cloudStatusText()}</div>
      <p class="note-ok">Muốn thêm thiết bị khác? Sao chép <b>link kết nối</b>, gửi riêng cho người nhà (Zalo, tin nhắn). Mở link trên máy đó <b>một lần</b> là tự kết nối.</p>
      <button class="btn big" data-cloud-link style="--c:#22c55e">🔗 Sao chép link kết nối</button>
      <small class="muted">Hoặc nhập mã thủ công:</small>
      <div class="family-code" data-code>${K.cloud.code()}</div>
      <small class="muted">Hãy giữ link và mã này riêng tư, đừng đăng lên mạng.</small>
      <button class="btn" data-cloud-copy style="--c:#06b6d4">📋 Sao chép mã</button>
      <button class="btn" data-cloud-sync style="--c:#22c55e">🔄 Đồng bộ ngay</button>
      <button class="btn" data-cloud-unlink style="--c:#ef4444">⛔ Ngắt kết nối thiết bị này</button></div>`;
  }

  function wireCloud(m) {
    const q = (s) => m.querySelector(s);
    const msg = (t, bad) => {
      const e = q('[data-cloud-msg]');
      if (e) { e.textContent = t; e.classList.toggle('bad', !!bad); }
    };
    const rebuild = () => { m.remove(); showBackup(); };
    const busy = (btn, on) => { if (btn) btn.disabled = on; };

    const create = q('[data-cloud-create]');
    if (create) create.addEventListener('click', async () => {
      busy(create, true);
      msg('⏳ Đang tạo mã…');
      try {
        await K.cloud.createFamily();
        K.fx.toast('☁️ Đã bật đồng bộ!');
        rebuild();
      } catch (e) { busy(create, false); msg('⚠️ ' + e.message, true); }
    });

    const join = q('[data-cloud-join]');
    if (join) join.addEventListener('click', () => {
      q('[data-cloud-joinbox]').hidden = false;
      q('[data-cloud-code]').focus();
    });
    const go = q('[data-cloud-go]');
    if (go) {
      const connect = async () => {
        busy(go, true);
        msg('⏳ Đang kết nối…');
        try {
          await K.cloud.joinFamily(q('[data-cloud-code]').value);
          K.fx.toast('☁️ Đã kết nối! Tiến độ đã được đồng bộ.');
          document.querySelectorAll('#modal-root .modal-back').forEach((x) => x.remove());
          route();
        } catch (e) { busy(go, false); msg('⚠️ ' + e.message, true); }
      };
      go.addEventListener('click', connect);
      q('[data-cloud-code]').addEventListener('keydown', (e) => { if (e.key === 'Enter') connect(); });
    }

    const linkBtn = q('[data-cloud-link]');
    if (linkBtn) linkBtn.addEventListener('click', async () => {
      const link = K.cloud.joinLink();
      try { await navigator.clipboard.writeText(link); K.fx.toast('🔗 Đã sao chép link kết nối'); }
      catch (e) { window.prompt('Sao chép link kết nối:', link); }
    });
    const copy = q('[data-cloud-copy]');
    if (copy) copy.addEventListener('click', async () => {
      const code = K.cloud.code();
      try { await navigator.clipboard.writeText(code); K.fx.toast('📋 Đã sao chép mã'); }
      catch (e) { window.prompt('Sao chép mã gia đình:', code); }
    });
    const sync = q('[data-cloud-sync]');
    if (sync) sync.addEventListener('click', async () => {
      busy(sync, true);
      msg('⏳ Đang đồng bộ…');
      await K.cloud.syncNow();
      busy(sync, false);
      msg(cloudStatusText(), K.cloud.status() === 'error');
    });
    const unlink = q('[data-cloud-unlink]');
    if (unlink) unlink.addEventListener('click', () => {
      if (window.confirm('Ngắt kết nối thiết bị này? Tiến độ trên máy vẫn còn, nhưng sẽ không tự đồng bộ nữa.')) {
        K.cloud.unlink();
        rebuild();
      }
    });
  }

  function showBackup() {
    const n = K.store.profiles().filter((p) => p.welcomed && K.isFamily(p.name)).length;
    const m = modal(
      `<h2>💾 Sao lưu &amp; khôi phục</h2>
       <p class="note-ok">Tiến trình được lưu trong trình duyệt này. Hãy tải file sao lưu để không bị mất khi đổi máy hoặc xóa dữ liệu trình duyệt.</p>
       <button class="btn big" data-export-all style="--c:#22c55e">⬇️ Tải file sao lưu</button>
       <small class="muted">Gồm ${n} hồ sơ</small>
       <label class="btn big" style="--c:#7c5cff">⬆️ Khôi phục từ file
         <input type="file" accept=".json,application/json" data-import hidden>
       </label>
       ${cloudSectionHtml()}
       <button class="btn" data-close style="--c:#64748b">Đóng</button>`
    );
    wireCloud(m);
    m.querySelector('[data-export-all]').addEventListener('click', () => {
      downloadBackup(K.store.exportData());
      K.fx.toast('Đã tải file sao lưu 💾');
    });
    m.querySelector('[data-import]').addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 2e6) { K.fx.toast('Tệp quá lớn, không phải file sao lưu.'); return; }
      const res = K.store.importData(await file.text(), (name) =>
        window.confirm(`Hồ sơ "${name}" đã có trên máy này.\nBấm OK để ghi đè bằng bản sao lưu, hoặc Hủy để tạo thêm một bản sao.`)
      );
      e.target.value = '';
      if (res.error) { K.fx.toast('⚠️ ' + res.error); return; }
      document.querySelectorAll('#modal-root .modal-back').forEach((x) => x.remove());
      K.fx.toast(`✅ Đã khôi phục: ${res.added} mới, ${res.updated} cập nhật${res.skipped ? `, bỏ qua ${res.skipped}` : ''}`);
      if (K.store.profiles().filter((p) => p.welcomed && K.isFamily(p.name)).length > 1) {
        // Nhiều hồ sơ: để bé chọn "Ai đang chơi?"
        if (location.hash === '#/who') route(); else location.hash = '#/who';
      } else {
        setPicked();
        route();
      }
    });
  }

  /* ---------- Phần thưởng ---------- */
  function renderRewards() {
    const s = K.store.state;
    const lvl = K.store.level();
    const pct = Math.round(K.store.levelProgress() * 100);
    const masteredWords = Object.keys(s.mastered).map(K.findWord).filter(Boolean);
    app.innerHTML = `
      <section class="screen rewards">
        <header class="topbar">
          <button class="btn-round" data-go="#/" aria-label="Về trang chủ">←</button>
          <h1 class="ttitle"><span>🏆</span> Phần thưởng của ${s.name ? K.esc(s.name) : 'bé'}</h1>
          ${coinPill()}
        </header>

        <div class="level-card big">
          <span class="avatar xl">${K.avatarHtml(s.avatar)}</span>
          <div class="lvl-wrap">
            <span class="lvl">Cấp ${lvl}</span>
            <span class="lvl-bar"><i style="width:${pct}%"></i></span>
            <span class="lvl-next">${s.coins % K.store.COINS_PER_LEVEL}/${K.store.COINS_PER_LEVEL} 🪙 để lên cấp</span>
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat"><b>${K.store.totalStars()}</b><span>⭐ Sao</span></div>
          <div class="stat"><b>${K.store.masteredCount()}</b><span>📚 Từ đã thuộc</span></div>
          <div class="stat"><b>${s.streak.count}</b><span>🔥 Ngày liên tiếp</span></div>
          <div class="stat"><b>${s.stats.games}</b><span>🎮 Lượt chơi</span></div>
        </div>

        <button class="song-card" data-go="#/stickers"><span>🎁</span><b>Bộ sưu tập sticker</b><small>${K.store.stickerCount()}/${K.STICKERS.length} sticker${s.gifts > 0 ? ` · ${s.gifts} hộp quà đang chờ` : ''}</small></button>

        <h2 class="section-title">Huy hiệu</h2>
        <div class="badge-grid">
          ${K.BADGES.map((b) => {
            const on = s.badges[b.id];
            return `<div class="badge${on ? ' on' : ''}"><span class="b-ico">${on ? b.icon : '🔒'}</span><b>${b.name}</b><small>${b.desc}</small></div>`;
          }).join('')}
        </div>

        <h2 class="section-title">Sổ từ vựng</h2>
        ${
          masteredWords.length
            ? `<div class="word-chips">${masteredWords.map((w) => `<button class="chip" data-say="${w.en}">${K.visual(w)}<span>${w.en}</span></button>`).join('')}</div>`
            : '<p class="empty">Chưa có từ nào. Chơi game để thu thập từ vựng nhé! 🌱</p>'
        }
      </section>`;
  }

  /* ---------- Định tuyến ---------- */
  function cleanup() {
    // Đổi màn hình thì đóng mọi hộp thoại (trừ hộp thoại chào lần đầu)
    document.querySelectorAll('#modal-root .modal-back:not([data-keep])').forEach((m) => m.remove());
    if (current) current.destroy();
    current = null;
    K.audio.stop();
  }

  function route() {
    cleanup();
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    window.scrollTo(0, 0);

    if (parts[0] === 'topic' && K.getTopic(parts[1])) return renderTopic(K.getTopic(parts[1]));
    if (parts[0] === 'play' && K.getTopic(parts[1]) && K.games[parts[2]]) {
      return renderPlay(K.getTopic(parts[1]), K.games[parts[2]]);
    }
    if (parts[0] === 'join') {
      // Link kết nối gia đình: lấy mã rồi xóa ngay khỏi thanh địa chỉ để mã không bị lộ khi chụp màn hình hay chia sẻ lại
      const code = parts[1] || '';
      history.replaceState(null, '', location.href.split('#')[0] + '#/who');
      if (/^[A-Za-z0-9-]{20,40}$/.test(code)) handleJoin(code);
      return renderWho();
    }
    if (parts[0] === 'who') return renderWho();
    if (parts[0] === 'rewards') return renderRewards();
    if (parts[0] === 'stickers') return renderStickers();
    if (parts.length) { location.hash = '#/'; return; }
    renderHome();
  }

  /* ---------- Sự kiện chung ---------- */
  document.addEventListener('click', (e) => {
    const say = e.target.closest('[data-say]');
    if (say) {
      K.audio.speak(say.dataset.say);
      say.classList.remove('bounce');
      void say.offsetWidth;
      say.classList.add('bounce');
      return;
    }
    const go = e.target.closest('[data-go]');
    if (go) {
      K.audio.sfx('click');
      const target = go.dataset.go;
      if (location.hash === target) route();
      else location.hash = target;
      return;
    }
    const act = e.target.closest('[data-act]');
    if (!act) return;
    if (act.dataset.act === 'settings') openSettings();
    else if (act.dataset.act === 'again') route();
    else if (act.dataset.act === 'tab') { setTab(act.dataset.tab); rerender(); }
    else if (act.dataset.act === 'song') openSong();
    else if (act.dataset.act === 'backup') openBackup();
    else if (act.dataset.act === 'snooze') { K.store.snoozeBackup(); rerender(); }
    else if (act.dataset.act === 'editprofile') openEditProfile(act.dataset.id);
    else if (act.dataset.act === 'pick') {
      K.store.switchProfile(act.dataset.id);
      setPicked();
      K.audio.sfx('correct');
      if (location.hash === '#/') route(); else location.hash = '#/';
    }
    else if (act.dataset.act === 'gift') openGiftModal();
    else if (act.dataset.act === 'claim') {
      const n = K.store.claimMission(act.dataset.id);
      if (n) {
        K.audio.sfx('correct');
        K.fx.confetti(60);
        K.fx.toast(`+${n} 🪙 Nhận thưởng thành công!`);
        rerender();
      }
    } else if (act.dataset.act === 'chest') {
      if (K.store.claimChest()) {
        K.audio.sfx('win');
        K.fx.confetti(140);
        K.fx.toast('🎁 Bạn nhận được 1 hộp quà bí mật!');
        rerender();
      }
    } else if (act.dataset.act === 'pet') {
      K.audio.sfx('pop');
      act.classList.remove('bounce');
      void act.offsetWidth;
      act.classList.add('bounce');
    }
    else if (act.dataset.act === 'owl') {
      K.audio.speak(K.pick(['Hello!', 'Hi there!', "Let's play!", 'You can do it!']));
      act.classList.remove('bounce');
      void act.offsetWidth;
      act.classList.add('bounce');
    }
  });

  window.addEventListener('hashchange', route);

  /* ---------- Link kết nối gia đình: #/join/<mã> ---------- */
  async function handleJoin(raw) {
    if (!K.cloud.enabled()) { K.fx.toast('Đồng bộ chưa được bật trên app này.'); return; }
    const code = K.cloud.normalizeCode(raw);
    if (K.cloud.linked() && K.cloud.rawCode() === code) { K.fx.toast('☁️ Thiết bị này đã được kết nối rồi'); return; }
    if (K.cloud.linked() && !window.confirm('Thiết bị này đang dùng một mã gia đình khác. Chuyển sang gia đình trong link này?')) return;
    const m = modal(
      `<div class="mascot big">🦉</div><h2>Đang kết nối…</h2>
       <p class="note-ok">Cú Mèo đang lấy tiến độ của cả nhà. Chờ một chút nhé!</p>`,
      false
    );
    m.dataset.keep = '1';
    try {
      await K.cloud.joinFamily(code);
      m.remove();
      K.audio.sfx('win');
      K.fx.toast('☁️ Đã kết nối! Tiến độ cả nhà đã được đồng bộ.');
      route();
    } catch (e) {
      m.querySelector('.modal').innerHTML = `<h2>⚠️ Chưa kết nối được</h2>
        <p class="note-ok">${K.esc(e.message)}</p>
        <button class="btn big" data-retry style="--c:#22c55e">🔄 Thử lại</button>
        <button class="btn" data-close style="--c:#64748b">Đóng</button>`;
      m.querySelector('[data-retry]').addEventListener('click', () => { m.remove(); handleJoin(raw); });
    }
  }

  K.store.touchDay();
  // Nhiều hồ sơ: hỏi "Ai đang chơi?" mỗi lần mở app
  if (K.store.profiles().filter((p) => p.welcomed && K.isFamily(p.name)).length > 1 && !isPicked() && !location.hash.startsWith('#/join/')) {
    history.replaceState(null, '', '#/who');
  }
  route();
  if (!K.store.state.welcomed) openWelcome();
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* bỏ qua */ }

  // Đồng bộ đám mây: tự lưu khi có mạng, tự lấy dữ liệu mới khi mở app
  K.cloud.onStatus = () => {
    const pill = document.querySelector('[data-cloud]');
    if (pill) pill.textContent = cloudIcon();
    const msg = document.querySelector('[data-cloud-msg]');
    if (msg && K.cloud.linked()) msg.textContent = cloudStatusText();
  };
  K.cloud.onSynced = () => {
    // Chỉ vẽ lại màn hình tĩnh, không làm gián đoạn trò chơi hay hộp thoại đang mở
    if (document.querySelector('.modal-back')) return;
    if (['', '#', '#/', '#/who', '#/rewards', '#/stickers'].includes(location.hash)) route();
  };
  K.cloud.start();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
