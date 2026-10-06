/* 🖼️ Đoán hình (nhìn hình chọn từ) và 👂 Nghe & chọn (nghe từ chọn hình) */
(function () {
  const K = window.K;
  const ROUNDS = 8;

  function makeChoice(mode) {
    return function start(ctx) {
      const questions = K.sample(ctx.words, Math.min(ROUNDS, ctx.words.length));
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
        const w = questions[idx];
        mistakes = 0;
        locked = false;
        ctx.progress(idx, questions.length);
        const opts = K.shuffle([w, ...K.distractors(ctx.words, w, 3)]);

        if (mode === 'pic') {
          root.innerHTML = `
            <div class="q-card">
              <button class="q-visual" data-speak aria-label="Nghe phát âm">${K.visual(w)}</button>
              <div class="q-label">Đây là gì nhỉ?</div>
            </div>
            <div class="opts words">
              ${opts.map((o) => `<button class="opt" data-en="${o.en}">${o.en}</button>`).join('')}
            </div>`;
          ctx.say('Đây là gì nhỉ? 🤔');
        } else {
          root.innerHTML = `
            <div class="q-card listen">
              <button class="big-speak" data-speak aria-label="Nghe lại">🔊</button>
              <button class="btn slow-btn" data-slow style="--c:#22c55e">🐢 Nghe chậm</button>
            </div>
            <div class="opts pics">
              ${opts.map((o) => `<button class="opt pic" data-en="${o.en}" aria-label="${o.vi}">${K.visual(o)}</button>`).join('')}
            </div>`;
          ctx.say('Nghe kỹ nhé! 👂');
          ctx.later(() => K.audio.speak(w.en), 350);
        }

        root.querySelectorAll('[data-speak]').forEach((b) => b.addEventListener('click', () => K.audio.speak(w.en)));
        const slow = root.querySelector('[data-slow]');
        if (slow) slow.addEventListener('click', () => K.audio.speak(w.en, { rate: 0.5 }));
        root.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => choose(b, w)));
      }

      function choose(btn, w) {
        if (locked || btn.disabled) return;
        if (btn.dataset.en === w.en) {
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
})();
