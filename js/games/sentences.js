/* Các trò chơi với câu mẫu của từng unit:
   💬 Hiểu câu (nghe câu tiếng Anh, chọn nghĩa tiếng Việt)  và  🧩 Sắp xếp câu (xếp các từ thành câu đúng) */
(function () {
  const K = window.K;

  const countWords = (s) => s.en.split(' ').length;
  const hasSentences = (t) => !!t.sentences && t.sentences.length >= 4;
  const hasLongSentences = (t) => !!t.sentences && t.sentences.filter((s) => countWords(s) >= 3).length >= 4;

  /* ---------- 💬 Hiểu câu ---------- */
  K.registerGame({
    id: 'meaning', name: 'Hiểu câu', icon: '💬', color: '#0ea5e9',
    desc: 'Nghe câu, chọn nghĩa tiếng Việt',
    available: hasSentences,

    start(ctx) {
      const pool = ctx.topic.sentences;
      const questions = K.sample(pool, Math.min(8, pool.length));
      const root = ctx.root;
      let idx = 0;
      let correct = 0;
      let mistakes = 0;
      let locked = false;

      function show() {
        if (idx >= questions.length) {
          ctx.progress(questions.length, questions.length);
          ctx.finish({ correct, total: questions.length });
          return;
        }
        const s = questions[idx];
        mistakes = 0;
        locked = false;
        ctx.progress(idx, questions.length);
        const others = K.sample(pool.filter((x) => x.vi !== s.vi), 3);
        const opts = K.shuffle([s, ...others]);
        root.innerHTML = `
          <div class="q-card sent-card">
            <button class="big-speak small" data-speak aria-label="Nghe câu">🔊</button>
            <div class="sent-en">${K.esc(s.en)}</div>
            <button class="btn slow-btn" data-slow style="--c:#22c55e">🐢 Nghe chậm</button>
          </div>
          <div class="opts sents">
            ${opts.map((o) => `<button class="opt sent" data-k="${K.esc(o.vi)}">${K.esc(o.vi)}</button>`).join('')}
          </div>`;
        ctx.say('Câu này có nghĩa là gì nhỉ? 🤔');
        ctx.later(() => K.audio.speak(s.en), 350);
        root.querySelector('[data-speak]').addEventListener('click', () => K.audio.speak(s.en));
        root.querySelector('[data-slow]').addEventListener('click', () => K.audio.speak(s.en, { rate: 0.5 }));
        root.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => choose(b, s)));
      }

      function choose(btn, s) {
        if (locked || btn.disabled) return;
        if (btn.dataset.k === s.vi) {
          locked = true;
          btn.classList.add('right');
          K.audio.sfx('correct');
          K.fx.sparkle(btn);
          if (mistakes === 0) { correct++; ctx.reward(10, btn); } else ctx.reward(3, btn);
          ctx.say(K.pick(K.PRAISE));
          root.querySelectorAll('.opt').forEach((b) => { if (b !== btn) b.disabled = true; });
          ctx.later(() => K.audio.speak(s.en), 300);
          ctx.later(() => { idx++; show(); }, 2000);
        } else {
          mistakes++;
          btn.disabled = true;
          btn.classList.add('wrong');
          K.audio.sfx('wrong');
          ctx.say(K.pick(K.OOPS));
        }
      }

      show();
    },
  });

  /* ---------- 🧩 Sắp xếp câu ---------- */
  K.registerGame({
    id: 'order', name: 'Sắp xếp câu', icon: '🧩', color: '#f43f5e',
    desc: 'Xếp các từ thành câu đúng',
    available: hasLongSentences,

    start(ctx) {
      const pool = ctx.topic.sentences.filter((s) => countWords(s) >= 3);
      const questions = K.sample(pool, Math.min(6, pool.length));
      const root = ctx.root;
      let idx = 0;
      let correct = 0;
      let s, tokens, tiles, placed, locked, hints, mistakes, done;

      function scramble() {
        let t;
        let tries = 0;
        do { t = K.shuffle(tokens.map((tok, id) => ({ id, tok }))); tries++; }
        while (t.map((x) => x.tok).join(' ') === s.en && tries < 10);
        return t;
      }

      function show() {
        if (idx >= questions.length) {
          ctx.progress(questions.length, questions.length);
          ctx.finish({ correct, total: questions.length });
          return;
        }
        s = questions[idx];
        tokens = s.en.split(' ');
        tiles = scramble();
        placed = [];
        locked = 0;
        hints = 0;
        mistakes = 0;
        done = false;
        ctx.progress(idx, questions.length);
        ctx.say('Xếp các từ thành câu nhé! ✍️');
        root.innerHTML = `
          <div class="q-card sent-card">
            <div class="sent-vi">${K.esc(s.vi)}</div>
            <button class="btn" data-speak style="--c:#06b6d4">🔊 Nghe câu</button>
          </div>
          <div class="ans-line" data-ans></div>
          <div class="tok-pool" data-pool></div>
          <div class="sp-actions">
            <button class="btn" data-hint style="--c:#f59e0b">💡 Gợi ý</button>
            <button class="btn" data-clear style="--c:#64748b">↺ Xếp lại</button>
          </div>`;
        root.querySelector('[data-speak]').addEventListener('click', () => K.audio.speak(s.en));
        root.querySelector('[data-hint]').addEventListener('click', hint);
        root.querySelector('[data-clear]').addEventListener('click', clearAll);
        render();
      }

      const textOf = (id) => tiles.find((t) => t.id === id).tok;

      function render(state) {
        const ans = root.querySelector('[data-ans]');
        const pool = root.querySelector('[data-pool]');
        ans.className = 'ans-line' + (state ? ' ' + state : '');
        ans.innerHTML = placed.length
          ? placed.map((id, i) => `<button class="tok placed${i < locked ? ' locked' : ''}" data-i="${i}">${K.esc(textOf(id))}</button>`).join('')
          : '<span class="ans-hint">Chạm vào các từ bên dưới</span>';
        const used = new Set(placed);
        pool.innerHTML = tiles.map((t) => `<button class="tok${used.has(t.id) ? ' used' : ''}" data-id="${t.id}">${K.esc(t.tok)}</button>`).join('');
        ans.querySelectorAll('.placed').forEach((b) => b.addEventListener('click', () => removeAt(+b.dataset.i)));
        pool.querySelectorAll('.tok').forEach((b) => b.addEventListener('click', () => place(+b.dataset.id)));
      }

      function place(id) {
        if (done || placed.includes(id)) return;
        placed.push(id);
        K.audio.sfx('click');
        render();
        if (placed.length === tokens.length) check();
      }

      function removeAt(i) {
        if (done || i < locked) return;
        placed.splice(i, 1);
        K.audio.sfx('click');
        render();
      }

      function clearAll() {
        if (done) return;
        placed = placed.slice(0, locked);
        render();
      }

      function hint() {
        if (done || locked >= tokens.length - 1) return;
        locked++;
        hints++;
        placed = [];
        for (let i = 0; i < locked; i++) {
          const t = tiles.find((x) => x.tok === tokens[i] && !placed.includes(x.id));
          placed.push(t.id);
        }
        K.audio.sfx('click');
        ctx.say('Mình giúp bạn một từ nhé 💡');
        render();
      }

      function check() {
        const attempt = placed.map(textOf).join(' ');
        if (attempt === s.en) {
          done = true;
          render('ok');
          K.audio.sfx('correct');
          K.fx.sparkle(root.querySelector('[data-ans]'));
          if (mistakes === 0 && hints === 0) { correct++; ctx.reward(15, root.querySelector('[data-ans]')); } else ctx.reward(5, root.querySelector('[data-ans]'));
          ctx.say(K.pick(K.PRAISE));
          ctx.later(() => K.audio.speak(s.en), 300);
          ctx.later(() => { idx++; show(); }, 2300);
        } else {
          mistakes++;
          K.audio.sfx('wrong');
          ctx.say(K.pick(K.OOPS));
          render('shake');
          ctx.later(() => { if (!done) clearAll(); }, 700);
        }
      }

      show();
    },
  });
})();
