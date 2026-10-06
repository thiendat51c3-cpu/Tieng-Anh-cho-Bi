/* Các trò chọn đáp án:
   🖼️ Đoán hình (nhìn hình chọn từ), 👂 Nghe & chọn (nghe từ chọn hình), 🔡 Chữ cái đầu (từ bắt đầu bằng chữ gì) */
(function () {
  const K = window.K;
  const ROUNDS = 8;
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  function makeChoice(mode) {
    return function start(ctx) {
      const questions = K.sample(ctx.words, Math.min(ROUNDS, ctx.words.length));
      const root = ctx.root;
      let idx = 0;
      let correct = 0;
      let mistakes = 0;
      let locked = false;

      // Mỗi đáp án: key để so sánh, html để hiển thị
      function buildOptions(w) {
        if (mode === 'letter') {
          const right = K.letterOf(w);
          const others = K.sample(ALPHABET.filter((l) => l !== right), 3);
          return { key: right, opts: K.shuffle([right, ...others]).map((l) => ({ key: l, html: `${l}<small>${l.toLowerCase()}</small>` })) };
        }
        const opts = K.shuffle([w, ...K.distractors(ctx.words, w, 3)]);
        return {
          key: w.en,
          opts: opts.map((o) => ({ key: o.en, html: mode === 'pic' ? o.en : K.visual(o), label: o.vi })),
        };
      }

      function show() {
        if (idx >= questions.length) {
          ctx.progress(questions.length, questions.length);
          ctx.finish({ correct, total: questions.length });
          return;
        }
        const w = questions[idx];
        mistakes = 0;
        locked = false;
        ctx.progress(idx, questions.length);
        const { key, opts } = buildOptions(w);
        const cls = mode === 'listen' ? 'pics' : mode === 'letter' ? 'letters' : 'words';
        const optsHtml = opts
          .map((o) => `<button class="opt${mode === 'listen' ? ' pic' : ''}${mode === 'letter' ? ' letter' : ''}" data-k="${o.key}"${o.label ? ` aria-label="${o.label}"` : ''}>${o.html}</button>`)
          .join('');

        if (mode === 'pic') {
          root.innerHTML = `
            <div class="q-card">
              <button class="q-visual" data-speak aria-label="Nghe phát âm">${K.visual(w)}</button>
              <div class="q-label">Đây là gì nhỉ?</div>
            </div>
            <div class="opts ${cls}">${optsHtml}</div>`;
          ctx.say('Đây là gì nhỉ? 🤔');
        } else if (mode === 'listen') {
          root.innerHTML = `
            <div class="q-card listen">
              <button class="big-speak" data-speak aria-label="Nghe lại">🔊</button>
              <button class="btn slow-btn" data-slow style="--c:#22c55e">🐢 Nghe chậm</button>
            </div>
            <div class="opts ${cls}">${optsHtml}</div>`;
          ctx.say('Nghe kỹ nhé! 👂');
          ctx.later(() => K.audio.speak(w.en), 350);
        } else {
          root.innerHTML = `
            <div class="q-card">
              <button class="q-visual" data-speak aria-label="Nghe phát âm">${K.visual(w)}</button>
              <div class="q-word"><span class="blank">?</span>${K.esc(w.en.slice(1))}</div>
              <div class="q-label">Từ này bắt đầu bằng chữ gì?</div>
            </div>
            <div class="opts ${cls}">${optsHtml}</div>`;
          ctx.say('Chữ cái đầu tiên là gì nhỉ? 🔡');
          ctx.later(() => K.audio.speak(w.en), 350);
        }

        root.querySelectorAll('[data-speak]').forEach((b) => b.addEventListener('click', () => K.audio.speak(w.en)));
        const slow = root.querySelector('[data-slow]');
        if (slow) slow.addEventListener('click', () => K.audio.speak(w.en, { rate: 0.5 }));
        root.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => choose(b, w, key)));
      }

      function choose(btn, w, key) {
        if (locked || btn.disabled) return;
        if (btn.dataset.k === key) {
          locked = true;
          btn.classList.add('right');
          K.audio.sfx('correct');
          K.fx.sparkle(btn);
          if (mistakes === 0) {
            correct++;
            ctx.reward(10, btn);
            ctx.mastered(w);
          } else ctx.reward(3, btn);
          ctx.say(K.pick(K.PRAISE));
          root.querySelectorAll('.opt').forEach((b) => { if (b !== btn) b.disabled = true; });
          const blank = root.querySelector('.blank');
          if (blank) blank.textContent = w.en[0];
          ctx.later(() => K.audio.speak(w.en), 300);
          ctx.later(() => { idx++; show(); }, 1600);
        } else {
          mistakes++;
          btn.disabled = true;
          btn.classList.add('wrong');
          K.audio.sfx('wrong');
          ctx.say(K.pick(K.OOPS));
        }
      }

      show();
    };
  }

  K.registerGame({
    id: 'picquiz', name: 'Đoán hình', icon: '🖼️', color: '#ff8a3d',
    desc: 'Nhìn hình, chọn từ đúng', start: makeChoice('pic'),
  });
  K.registerGame({
    id: 'listen', name: 'Nghe & chọn', icon: '👂', color: '#06b6d4',
    desc: 'Nghe từ, chọn hình đúng', start: makeChoice('listen'),
  });
  K.registerGame({
    id: 'firstletter', name: 'Chữ cái đầu', icon: '🔡', color: '#10b981',
    desc: 'Từ này bắt đầu bằng chữ gì?', start: makeChoice('letter'),
  });
})();
