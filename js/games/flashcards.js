/* 📖 Học từ mới: thẻ lật, chạm để xem nghĩa tiếng Việt, nghe phát âm */
(function () {
  const K = window.K;

  K.registerGame({
    id: 'learn',
    name: 'Học từ mới',
    icon: '📖',
    color: '#7c5cff',
    desc: 'Xem hình, nghe phát âm, học nghĩa',
    scored: false,

    start(ctx) {
      const words = ctx.topic.id === 'mix' ? K.sample(ctx.words, 12) : ctx.words.slice();
      const seen = new Set();
      const abc = ctx.topic.id === 'abc';
      let i = 0;

      ctx.root.innerHTML = `
        <div class="fc-stage">
          <button class="flashcard" aria-label="Lật thẻ">
            <span class="fc-inner">
              <span class="fc-face fc-front">
                <span class="fc-letter"></span>
                <span class="fc-visual"></span>
                <span class="fc-word"></span>
                <span class="fc-hint">👆 Chạm để xem nghĩa</span>
              </span>
              <span class="fc-face fc-back">
                <span class="fc-vi"></span>
                <span class="fc-word small"></span>
              </span>
            </span>
          </button>
          <div class="fc-count"></div>
          <div class="fc-nav">
            <button class="btn-round big" data-prev aria-label="Từ trước">◀</button>
            <button class="btn big" data-speak style="--c:#ff8a3d">🔊 Nghe</button>
            <button class="btn-round big" data-next aria-label="Từ sau">▶</button>
          </div>
        </div>`;

      const card = ctx.root.querySelector('.flashcard');
      const q = (s) => ctx.root.querySelector(s);

      function show(flip) {
        const w = words[i];
        seen.add(i);
        card.classList.remove('flipped');
        q('.fc-visual').innerHTML = K.hasPicture(w) ? K.visual(w) : '';
        q('.fc-letter').textContent = abc ? K.letterOf(w) + ' ' + K.letterOf(w).toLowerCase() : '';
        ctx.root.querySelectorAll('.fc-word').forEach((e) => (e.textContent = w.en));
        q('.fc-vi').textContent = w.vi;
        q('.fc-count').textContent = `${i + 1} / ${words.length}`;
        ctx.progress(seen.size, words.length);
        ctx.say(i === 0 ? 'Cùng học nào! Chạm vào thẻ nhé 👆' : K.pick(['Nhắc theo mình nhé! 🗣️', 'Say it with me! 🗣️', 'Từ này dễ quá!']));
        card.classList.remove('pop-in');
        void card.offsetWidth;
        card.classList.add('pop-in');
        say(w);
        if (flip) card.classList.add('flipped');
      }

      // Với bảng chữ cái: đọc tên chữ rồi đọc từ khoá ("ay... apple")
      function say(w) {
        K.audio.speak(abc ? `${K.letterSpeech(K.letterOf(w))}. ${w.en}` : w.en);
      }

      function next() {
        if (i >= words.length - 1) {
          ctx.finish({ correct: words.length, total: words.length, summary: `Bạn đã học ${words.length} từ mới!` });
          return;
        }
        i++;
        K.audio.sfx('click');
        show();
      }
      function prev() {
        if (i === 0) return;
        i--;
        K.audio.sfx('click');
        show();
      }

      card.addEventListener('click', () => {
        K.audio.sfx('flip');
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) say(words[i]);
      });
      q('[data-next]').addEventListener('click', next);
      q('[data-prev]').addEventListener('click', prev);
      q('[data-speak]').addEventListener('click', () => say(words[i]));
      ctx.listen(document, 'keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        else if (e.key === 'ArrowLeft') prev();
      });

      show();
    },
  });
})();
