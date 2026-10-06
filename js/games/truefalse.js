/* ⚡ Đúng hay sai?: 30 giây, hình và từ có khớp nhau không? */
(function () {
  const K = window.K;
  const TIME = 30;

  K.registerGame({
    id: 'truefalse', name: 'Đúng hay sai?', icon: '⚡', color: '#f59e0b',
    desc: '30 giây, càng nhanh càng tốt!',

    start(ctx) {
      const root = ctx.root;
      let score = 0;
      let attempts = 0;
      let combo = 0;
      let timeLeft = TIME;
      let current = null;
      let last = null;
      let locked = true;
      let ended = false;

      root.innerHTML = `
        <div class="tf-intro">
          <div class="tf-big">⚡</div>
          <p>Hình và từ có <b>khớp</b> nhau không?<br>Bạn có <b>${TIME} giây</b>. Sẵn sàng chưa?</p>
          <button class="btn big" data-start style="--c:#22c55e">▶ Bắt đầu!</button>
        </div>`;
      ctx.say('Sẵn sàng chưa nào? 🚀');
      root.querySelector('[data-start]').addEventListener('click', begin);

      function begin() {
        root.innerHTML = `
          <div class="tf-top">
            <div class="timer"><span data-bar></span></div>
            <div class="tf-score">⭐ <b data-score>0</b> <span class="combo" data-combo></span></div>
          </div>
          <div class="tf-card" data-card>
            <div class="tf-visual" data-vis></div>
            <div class="tf-word" data-word></div>
          </div>
          <div class="tf-btns">
            <button class="btn tf yes" data-yes style="--c:#22c55e">✅ Đúng</button>
            <button class="btn tf no" data-no style="--c:#ef4444">❌ Sai</button>
          </div>`;
        root.querySelector('[data-yes]').addEventListener('click', () => answer(true));
        root.querySelector('[data-no]').addEventListener('click', () => answer(false));
        ctx.listen(document, 'keydown', (e) => {
          if (e.key === 'ArrowLeft') answer(true);
          else if (e.key === 'ArrowRight') answer(false);
        });
        ctx.say('Nhanh tay lên! ⚡');
        next();
        ctx.interval(() => {
          if (ended) return;
          timeLeft = Math.max(0, +(timeLeft - 0.1).toFixed(1));
          root.querySelector('[data-bar]').style.width = (timeLeft / TIME) * 100 + '%';
          ctx.progress(TIME - timeLeft, TIME);
          if (timeLeft <= 5 && Math.abs(timeLeft - Math.round(timeLeft)) < 0.05) K.audio.sfx('tick');
          if (timeLeft <= 0) end();
        }, 100);
      }

      function next() {
        let w;
        do { w = K.pick(ctx.words); } while (last && w.en === last.en && ctx.words.length > 1);
        last = w;
        const match = Math.random() < 0.5;
        const shown = match ? w : K.distractors(ctx.words, w, 1)[0];
        current = { w, shown, match };
        root.querySelector('[data-vis]').innerHTML = K.visual(w);
        root.querySelector('[data-word]').textContent = shown.en;
        const card = root.querySelector('[data-card]');
        card.classList.remove('pop-in', 'flash-right', 'flash-wrong');
        void card.offsetWidth;
        card.classList.add('pop-in');
        locked = false;
        K.audio.speak(shown.en);
      }

      function answer(yes) {
        if (locked || ended) return;
        locked = true;
        attempts++;
        const card = root.querySelector('[data-card]');
        if (yes === current.match) {
          score++;
          combo++;
          K.audio.sfx('correct');
          card.classList.add('flash-right');
          ctx.reward(combo >= 3 ? 8 : 5, card);
          ctx.mastered(current.w);
          if (combo >= 3) ctx.say(`Combo x${combo}! 🔥`);
          else ctx.say(K.pick(K.PRAISE));
        } else {
          combo = 0;
          K.audio.sfx('wrong');
          card.classList.add('flash-wrong');
          ctx.say(K.pick(K.OOPS));
        }
        root.querySelector('[data-score]').textContent = score;
        root.querySelector('[data-combo]').textContent = combo >= 3 ? `🔥 x${combo}` : '';
        ctx.later(() => { if (!ended) next(); }, 380);
      }

      function end() {
        if (ended) return;
        ended = true;
        const stars = score >= 14 ? 3 : score >= 9 ? 2 : score >= 4 ? 1 : 0;
        K.audio.sfx('win');
        root.innerHTML = `<div class="tf-intro"><div class="tf-big">⏰</div><p><b>Hết giờ!</b></p></div>`;
        ctx.later(() => ctx.finish({ correct: score, total: attempts, stars, summary: `Bạn trả lời đúng ${score} câu trong ${TIME} giây!` }), 900);
      }
    },
  });
})();
