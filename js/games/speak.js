/* 🎤 Nói tiếng Anh: nghe mẫu rồi nói theo. Dùng nhận diện giọng nói của trình duyệt (Chrome, Edge, Safari);
   nếu không dùng được micro thì chuyển sang chế độ luyện tập (bé tự đọc, tối đa 2 sao). */
(function () {
  const K = window.K;
  const ROUNDS = 6;
  const MAX_TRIES = 3;
  const NUMBERS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' };

  const normalize = (s) =>
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9' ]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((t) => (NUMBERS[t] !== undefined ? NUMBERS[t] : t))
      .join(' ');

  // Khớp nếu bé nói đúng từ (kể cả khi nói kèm các từ khác như "it is a cat")
  K.speechMatches = (alternatives, target) => {
    const t = normalize(target);
    return alternatives.some((a) => {
      const n = normalize(a);
      return n === t || (' ' + n + ' ').includes(' ' + t + ' ');
    });
  };

  K.registerGame({
    id: 'speak', name: 'Nói tiếng Anh', icon: '🎤', color: '#ef4444',
    desc: 'Nghe rồi nói theo Cú Mèo',

    start(ctx) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const words = K.sample(ctx.words, Math.min(ROUNDS, ctx.words.length));
      const root = ctx.root;
      let practice = !SR; // chế độ luyện tập khi không có micro
      let idx = 0;
      let correct = 0;
      let tries = 0;
      let locked = false;
      let rec = null;

      ctx.say(practice ? 'Trình duyệt chưa có micro, mình luyện đọc to nhé! 🗣️' : 'Bấm micro rồi nói thật to nhé! 🎤');

      function show() {
        if (idx >= words.length) {
          ctx.progress(words.length, words.length);
          // Chế độ luyện tập không kiểm tra được giọng nói nên giới hạn 2 sao
          const acc = correct / words.length;
          const stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : acc >= 0.4 ? 1 : 0;
          ctx.finish({
            correct, total: words.length, stars: practice ? Math.min(stars, 2) : stars,
            summary: practice ? `Bạn đã luyện đọc ${words.length} từ! (chế độ luyện tập)` : null,
          });
          return;
        }
        const w = words[idx];
        tries = 0;
        locked = false;
        ctx.progress(idx, words.length);
        root.innerHTML = `
          <div class="q-card">
            <button class="q-visual" data-listen aria-label="Nghe mẫu">${K.visual(w)}</button>
            <div class="q-word say">${K.esc(w.en)}</div>
            ${K.hasPicture(w) ? `<div class="sp-vi">${w.vi}</div>` : ''}
            <button class="btn" data-listen style="--c:#06b6d4">🔊 Nghe mẫu</button>
          </div>
          <div class="mic-zone">
            ${practice
              ? `<button class="btn big" data-done style="--c:#22c55e">🗣️ Mình đã đọc xong!</button>`
              : `<button class="mic-btn" data-mic aria-label="Bấm để nói">🎤</button>`}
            <div class="mic-status" data-status>${practice ? 'Nghe mẫu, đọc to theo, rồi bấm nút xanh.' : 'Bấm micro rồi nói "' + K.esc(w.en) + '"'}</div>
          </div>`;
        root.querySelectorAll('[data-listen]').forEach((b) => b.addEventListener('click', () => K.audio.speak(w.en)));
        const mic = root.querySelector('[data-mic]');
        if (mic) mic.addEventListener('click', () => listen(w));
        const done = root.querySelector('[data-done]');
        if (done) done.addEventListener('click', () => success(w, true));
        ctx.later(() => K.audio.speak(w.en), 350);
      }

      const status = (t) => {
        const e = root.querySelector('[data-status]');
        if (e) e.textContent = t;
      };

      function listen(w) {
        if (locked) return;
        K.audio.stop();
        const mic = root.querySelector('[data-mic]');
        try {
          rec = new SR();
        } catch (e) { return fallback(); }
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 5;
        let handled = false;

        rec.onstart = () => { mic.classList.add('listening'); status('Cú Mèo đang nghe... 👂'); };
        rec.onresult = (e) => {
          handled = true;
          const alts = [...e.results[0]].map((r) => r.transcript);
          if (K.speechMatches(alts, w.en)) success(w, false);
          else miss(w, alts[0]);
        };
        rec.onerror = (e) => {
          handled = true;
          if (['not-allowed', 'service-not-allowed', 'audio-capture', 'network', 'language-not-supported'].includes(e.error)) fallback();
          else if (e.error === 'no-speech') status('Mình chưa nghe thấy gì, thử lại nhé! 🎤');
        };
        rec.onend = () => {
          mic && mic.classList.remove('listening');
          if (!handled && !locked) status('Bấm micro rồi nói lại nhé! 🎤');
        };
        try { rec.start(); } catch (e) { fallback(); }
      }

      // Micro không dùng được: chuyển sang chế độ luyện tập cho các từ còn lại
      function fallback() {
        if (practice) return;
        practice = true;
        ctx.say('Micro chưa dùng được, mình luyện đọc to nhé! 🗣️');
        show();
      }

      function success(w, byPractice) {
        if (locked) return;
        locked = true;
        K.audio.sfx('correct');
        const card = root.querySelector('.q-card');
        K.fx.sparkle(card);
        if (tries === 0) {
          correct++;
          ctx.reward(byPractice ? 5 : 12, card);
        } else ctx.reward(5, card);
        if (!byPractice) ctx.mastered(w);
        ctx.say(K.pick(K.PRAISE));
        status('Đúng rồi! ' + w.en + ' ✅');
        ctx.later(() => K.audio.speak(w.en), 250);
        ctx.later(() => { idx++; show(); }, 1700);
      }

      function miss(w, heard) {
        tries++;
        K.audio.sfx('wrong');
        if (tries >= MAX_TRIES) {
          locked = true;
          ctx.say('Không sao, mình nghe lại nhé! 💪');
          status('Từ này là "' + w.en + '". Mình thử từ khác nhé!');
          ctx.later(() => K.audio.speak(w.en), 300);
          ctx.later(() => { idx++; show(); }, 2400);
        } else {
          ctx.say(K.pick(K.OOPS));
          status(`Mình nghe là "${heard}". Thử lại nhé! (${tries}/${MAX_TRIES})`);
        }
      }

      ctx.onDestroy(() => { try { if (rec) rec.abort(); } catch (e) { /* bỏ qua */ } });
      show();
    },
  });
})();
