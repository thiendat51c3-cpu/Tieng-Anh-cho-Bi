/* 🎈 Bắn bóng bay: bóng bay lơ lửng, chạm vào bóng có hình đúng với từ được đọc */
(function () {
  const K = window.K;
  const ROUNDS = 8;
  const COLORS = ['#ff5d8f', '#ffb703', '#3ddc97', '#4cc9f0', '#a78bfa', '#ff8a3d'];

  K.registerGame({
    id: 'balloon', name: 'Bắn bóng bay', icon: '🎈', color: '#ec4899',
    desc: 'Chạm vào bóng bay đúng hình',

    start(ctx) {
      const words = K.sample(ctx.words, Math.min(ROUNDS, ctx.words.length));
      const root = ctx.root;
      let idx = 0;
      let correct = 0;
      let mistakes = 0;
      let locked = false;

      root.innerHTML = `
        <div class="b-prompt">
          <button class="speak-chip" data-speak aria-label="Nghe lại">🔊 <b class="b-word"></b></button>
        </div>
        <div class="sky"></div>`;
      const sky = root.querySelector('.sky');
      const label = root.querySelector('.b-word');
      let target = null;

      root.querySelector('[data-speak]').addEventListener('click', () => target && K.audio.speak(target.en));

      function round() {
        if (idx >= words.length) {
          ctx.progress(words.length, words.length);
          ctx.finish({ correct, total: words.length });
          return;
        }
        target = words[idx];
        mistakes = 0;
        locked = false;
        ctx.progress(idx, words.length);
        label.textContent = target.en;
        ctx.say('Tìm bóng bay đúng nào! 🎯');
        ctx.later(() => K.audio.speak(target.en), 300);

        sky.innerHTML = '';
        sky.style.setProperty('--rise', (sky.clientHeight || 360) + 170 + 'px');
        const opts = K.shuffle([target, ...K.distractors(ctx.words, target, 4)]);
        const cols = K.shuffle([0, 1, 2, 3, 4]);
        const colors = K.shuffle(COLORS);
        opts.forEach((o, i) => {
          const b = K.html(`
            <button class="balloon" aria-label="${o.vi}"
              style="--x:${(cols[i] + 0.5) * 20}%;--dur:${(7 + Math.random() * 4).toFixed(1)}s;--delay:-${(Math.random() * 7).toFixed(1)}s;--bc:${colors[i % colors.length]}">
              <span class="b-body"><span class="b-vis">${K.visual(o)}</span></span>
              <span class="b-string"></span>
            </button>`);
          b.addEventListener('click', () => hit(b, o));
          sky.appendChild(b);
        });
      }

      function hit(b, o) {
        if (locked) return;
        if (o.en === target.en) {
          locked = true;
          b.classList.add('pop');
          K.audio.sfx('pop');
          K.fx.sparkle(b);
          sky.querySelectorAll('.balloon').forEach((x) => { if (x !== b) x.classList.add('fade'); });
          if (mistakes === 0) {
            correct++;
            ctx.reward(10, b);
            ctx.mastered(target);
          } else ctx.reward(3, b);
          ctx.say(K.pick(K.PRAISE));
          ctx.later(() => K.audio.sfx('correct'), 150);
          ctx.later(() => { idx++; round(); }, 1300);
        } else {
          mistakes++;
          const body = b.querySelector('.b-body');
          body.classList.remove('shake');
          void body.offsetWidth;
          body.classList.add('shake');
          K.audio.sfx('wrong');
          ctx.say(K.pick(K.OOPS));
        }
      }

      round();
    },
  });
})();
