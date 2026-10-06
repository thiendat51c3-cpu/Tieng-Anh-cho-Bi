/* 🃏 Lật hình: tìm cặp "hình – từ" giống nhau */
(function () {
  const K = window.K;
  const PAIRS = 6;

  K.registerGame({
    id: 'memory', name: 'Lật hình', icon: '🃏', color: '#14b8a6',
    desc: 'Tìm các cặp giống nhau',

    start(ctx) {
      const pairWords = K.sample(ctx.words, Math.min(PAIRS, ctx.words.length));
      const cards = K.shuffle(
        pairWords.flatMap((w) => [{ w, type: 'pic' }, { w, type: 'word' }])
      );
      const root = ctx.root;
      let flipped = [];
      let matched = 0;
      let moves = 0;
      let locked = false;

      root.innerHTML = `
        <div class="mem-info">Số lượt: <b data-moves>0</b></div>
        <div class="mem-grid">
          ${cards
            .map(
              (c, i) => `
            <button class="mcard" data-i="${i}" aria-label="Thẻ ${i + 1}">
              <span class="mface back"><b>?</b></span>
              <span class="mface front ${c.type}">${c.type === 'pic' ? K.visual(c.w) : c.w.en}</span>
            </button>`
            )
            .join('')}
        </div>`;
      ctx.say('Lật hai thẻ giống nhau nhé! 🃏');
      ctx.progress(0, pairWords.length);

      const movesEl = root.querySelector('[data-moves]');
      const els = [...root.querySelectorAll('.mcard')];

      els.forEach((el, i) =>
        el.addEventListener('click', () => {
          const c = cards[i];
          if (locked || el.classList.contains('flipped') || el.classList.contains('matched')) return;
          el.classList.add('flipped');
          K.audio.sfx('flip');
          K.audio.speak(c.w.en);
          flipped.push(i);
          if (flipped.length < 2) return;

          moves++;
          movesEl.textContent = moves;
          const [a, b] = flipped;
          flipped = [];
          if (cards[a].w.en === cards[b].w.en) {
            matched++;
            [a, b].forEach((n) => els[n].classList.add('matched'));
            ctx.progress(matched, pairWords.length);
            ctx.later(() => K.audio.sfx('correct'), 250);
            K.fx.sparkle(els[b]);
            ctx.reward(15, els[b]);
            ctx.mastered(cards[a].w);
            ctx.say(K.pick(K.PRAISE));
            if (matched === pairWords.length) {
              const n = pairWords.length;
              const stars = moves <= n * 1.5 ? 3 : moves <= n * 2.5 ? 2 : 1;
              ctx.later(() => ctx.finish({ correct: n, total: n, stars, summary: `Bạn ghép xong sau ${moves} lượt!` }), 1300);
            }
          } else {
            locked = true;
            ctx.say(K.pick(K.OOPS));
            ctx.later(() => {
              [a, b].forEach((n) => els[n].classList.remove('flipped'));
              locked = false;
            }, 1000);
          }
        })
      );
    },
  });
})();
