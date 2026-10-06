/* Ứng dụng chính: định tuyến (hash), các màn hình, màn kết quả, cài đặt */
(function () {
  const K = window.K;
  const app = document.getElementById('app');
  const AVATARS = ['🦊', '🐼', '🐯', '🐸', '🐵', '🦄', '🐰', '🐻'];
  let current = null; // trò chơi đang chạy

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
      ${AVATARS.map((a) => `<button type="button" class="avatar-opt${a === selected ? ' on' : ''}" data-avatar="${a}" role="radio" aria-checked="${a === selected}">${a}</button>`).join('')}
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
  const chosenAvatar = (m) => (m.querySelector('.avatar-opt.on') || {}).dataset.avatar || '🦊';

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
       <button class="btn big" data-ok style="--c:#22c55e">🚀 Bắt đầu thôi!</button>`,
      false
    );
    m.dataset.keep = '1';
    wireAvatars(m);
    m.querySelector('[data-ok]').addEventListener('click', () => {
      s.name = m.querySelector('[data-name]').value.trim();
      s.avatar = chosenAvatar(m);
      s.welcomed = true;
      K.store.save();
      K.audio.sfx('correct');
      K.audio.speak(s.name ? `Hello, ${s.name}!` : 'Hello!');
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
       <label class="field">Tên của bạn
         <input type="text" maxlength="14" data-name autocomplete="off" value="${K.esc(s.name)}">
       </label>
       ${avatarPicker(s.avatar)}
       <hr>
       <button class="btn" data-reset style="--c:#ef4444">🗑️ Xóa toàn bộ tiến trình</button>
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
      if (window.confirm('Xóa hết sao, xu và huy hiệu? Không thể khôi phục lại đâu nhé!')) {
        K.store.reset();
        m.close();
        K.store.touchDay();
        route();
      }
    });
    m.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]') || e.target === m) {
        s.name = m.querySelector('[data-name]').value.trim();
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

  /* ---------- Thành phần giao diện ---------- */
  const coinPill = () => `<span class="pill coin" data-coins>🪙 ${K.store.state.coins}</span>`;
  const topicStarsMax = () => K.gameOrder.length * 3;

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
    app.innerHTML = `
      <section class="screen home">
        <header class="topbar">
          <button class="profile" data-act="settings" aria-label="Hồ sơ và cài đặt">
            <span class="avatar">${s.avatar}</span>
            <span class="pname">${s.name ? K.esc(s.name) : 'Bé yêu'}</span>
          </button>
          <div class="pills">
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

        <div class="level-card">
          <span class="lvl">Cấp ${lvl}</span>
          <span class="lvl-bar"><i style="width:${pct}%"></i></span>
          <span class="lvl-next">${s.coins % K.store.COINS_PER_LEVEL}/${K.store.COINS_PER_LEVEL} 🪙</span>
        </div>

        ${missionsCard()}

        <button class="daily" data-go="#/topic/mix">
          <span class="daily-icon">🎲</span>
          <span><b>Thử thách tổng hợp</b><small>Tất cả từ vựng trộn lẫn – thử sức nào!</small></span>
        </button>

        <h2 class="section-title">Chọn chủ đề</h2>
        <div class="topic-grid">
          ${K.TOPICS.map((t) => {
            const st = K.store.topicStars(t.id);
            const pc = Math.round((st / topicStarsMax()) * 100);
            return `<button class="tcard" style="--tc:${t.color}" data-go="#/topic/${t.id}">
              ${t.tag ? `<span class="t-tag">${t.tag}</span>` : ''}
              <span class="t-icon">${t.icon}</span>
              <span class="t-name">${t.vi}</span>
              <span class="t-en">${t.en}</span>
              <span class="t-bar"><i style="width:${pc}%"></i></span>
              <span class="t-stars">⭐ ${st}/${topicStarsMax()}</span>
            </button>`;
          }).join('')}
        </div>
      </section>`;
  }

  /* ---------- Màn hình chủ đề ---------- */
  function renderTopic(topic) {
    const learned = K.store.state.learned[topic.id];
    const preview = topic.id === 'mix' ? K.sample(topic.words, 12) : topic.words;
    app.innerHTML = `
      <section class="screen topic" style="--tc:${topic.color}">
        <header class="topbar">
          <button class="btn-round" data-go="#/" aria-label="Về trang chủ">←</button>
          <h1 class="ttitle"><span>${topic.icon}</span> ${topic.vi} <small>${topic.en}</small></h1>
          ${coinPill()}
        </header>

        <p class="hint-line">👆 Chạm vào từng từ để nghe phát âm</p>
        <div class="word-chips">
          ${preview
            .map((w) =>
              topic.id === 'abc'
                ? `<button class="chip" data-say="${K.letterSpeech(K.letterOf(w))}. ${w.en}"><b class="chip-letter">${K.letterOf(w)}</b>${K.visual(w)}<span>${w.en}</span></button>`
                : `<button class="chip" data-say="${w.en}">${K.visual(w)}<span>${w.en}</span></button>`
            )
            .join('')}
        </div>
        ${topic.id === 'abc' ? '<button class="song-card" data-act="song"><span>🎵</span><b>Hát bài ABC cùng Cú Mèo</b><small>Nghe và nhìn từng chữ cái nhảy múa</small></button>' : ''}

        <button class="learn-card" data-go="#/play/${topic.id}/learn">
          <span class="g-icon">📖</span>
          <span class="g-text"><b>Học từ mới</b><small>Xem hình, nghe phát âm, học nghĩa</small></span>
          <span class="g-done">${learned ? '✅' : '▶'}</span>
        </button>

        <h2 class="section-title">Chơi game</h2>
        <div class="game-grid">
          ${K.gameOrder
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

    const idx = K.gameOrder.indexOf(game.id);
    const nextId = scored ? K.gameOrder[(idx + 1) % K.gameOrder.length] : K.gameOrder[0];
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
        line.textContent = `${letters[i]} – ${K.TOPICS[0].words[i].en}`;
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
          <span class="avatar xl">${s.avatar}</span>
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
    else if (act.dataset.act === 'song') openSong();
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

  K.store.touchDay();
  route();
  if (!K.store.state.welcomed) openWelcome();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
