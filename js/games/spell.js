/* 🔤 Xếp chữ: nhìn hình, sắp xếp các chữ cái thành từ đúng (có thể gõ bàn phím) */
(function () {
  const K = window.K;
  const ROUNDS = 6;

  K.registerGame({
    id: 'spell', name: 'Xếp chữ', icon: '🔤', color: '#8b5cf6',
    desc: 'Ghép các chữ cái thành từ',
    available: (t) => t.words.filter((w) => /^[A-Za-z]+$/.test(w.en)).length >= 3,

    start(ctx) {
      const words = K.sample(ctx.words.filter((w) => /^[A-Za-z]+$/.test(w.en)), ROUNDS);
      const root = ctx.root;
      let idx = 0;
      let correct = 0;
      let word, target, tiles, slots, locked, hints, mistakes, done;

      function scramble(letters) {
        let t;
        let tries = 0;
        do { t = K.shuffle(letters.map((ch, id) => ({ id, ch }))); tries++; }
        while (letters.length > 1 && t.map((x) => x.ch).join('') === letters.join('') && tries < 10);
        return t;
      }

      function show() {
        if (idx >= words.length) {
          ctx.progress(words.length, words.length);
          ctx.finish({ correct, total: words.length });
          return;
        }
        word = words[idx];
        target = word.en.toLowerCase();
        tiles = scramble(target.split(''));
        slots = new Array(target.length).fill(null);
        locked = 0;
        hints = 0;
        mistakes = 0;
        done = false;
        ctx.progress(idx, words.length);
        ctx.say('Xếp các chữ cái nhé! ✍️');

        root.innerHTML = `
          <div class="sp-card">
            <button class="sp-visual" data-speak aria-label="Nghe phát âm">${K.visual(word)}</button>
            ${K.hasPicture(word) ? `<div class="sp-vi">${word.vi}</div>` : ''}
          </div>
          <div class="slots"></div>
          <div class="tiles"></div>
          <div class="sp-actions">
            <button class="btn" data-hint style="--c:#f59e0b">💡 Gợi ý</button>
            <button class="btn" data-clear style="--c:#64748b">↺ Xếp lại</button>
          </div>`;
        root.querySelector('[data-speak]').addEventListener('click', () => K.audio.speak(word.en));
        root.querySelector('[data-hint]').addEventListener('click', hint);
        root.querySelector('[data-clear]').addEventListener('click', clearAll);
        render();
        ctx.later(() => K.audio.speak(word.en), 300);
      }

      const usedIds = () => new Set(slots.filter((s) => s !== null));

      function render(state) {
        const slotsEl = root.querySelector('.slots');
        const tilesEl = root.querySelector('.tiles');
        const byId = (id) => tiles.find((t) => t.id === id);
        slotsEl.innerHTML = slots
          .map((s, i) => {
            const cls = ['slot', s !== null ? 'filled' : '', i < locked ? 'locked' : '', state || ''].join(' ');
            return `<button class="${cls}" data-i="${i}" aria-label="Ô chữ ${i + 1}">${s !== null ? byId(s).ch : ''}</button>`;
          })
          .join('');
        const used = usedIds();
        tilesEl.innerHTML = tiles
          .map((t) => `<button class="tile${used.has(t.id) ? ' used' : ''}" data-id="${t.id}">${t.ch}</button>`)
          .join('');
        slotsEl.querySelectorAll('.slot').forEach((b) => b.addEventListener('click', () => removeAt(+b.dataset.i)));
        tilesEl.querySelectorAll('.tile').forEach((b) => b.addEventListener('click', () => place(+b.dataset.id)));
      }

      function place(id) {
        if (done) return;
        const i = slots.indexOf(null);
        if (i === -1 || usedIds().has(id)) return;
        slots[i] = id;
        K.audio.sfx('click');
        render();
        if (slots.every((s) => s !== null)) check();
      }

      function removeAt(i) {
        if (done || i < locked || slots[i] === null) return;
        slots[i] = null;
        K.audio.sfx('click');
        render();
      }

      function clearAll() {
        if (done) return;
        for (let i = locked; i < slots.length; i++) slots[i] = null;
        render();
      }

      function hint() {
        if (done || locked >= target.length - 1) return;
        locked++;
        hints++;
        const used = new Set();
        slots = new Array(target.length).fill(null);
        for (let i = 0; i < locked; i++) {
          const t = tiles.find((x) => x.ch === target[i] && !used.has(x.id));
          slots[i] = t.id;
          used.add(t.id);
        }
        K.audio.sfx('click');
        ctx.say('Mình giúp bạn một chữ nhé 💡');
        render();
      }

      function typed(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'Backspace') {
          for (let i = slots.length - 1; i >= locked; i--) {
            if (slots[i] !== null) { removeAt(i); break; }
          }
        } else if (/^[a-z]$/i.test(e.key)) {
          const used = usedIds();
          const t = tiles.find((x) => x.ch === e.key.toLowerCase() && !used.has(x.id));
          if (t) place(t.id);
        }
      }
      ctx.listen(document, 'keydown', typed);

      function check() {
        const attempt = slots.map((id) => tiles.find((t) => t.id === id).ch).join('');
        if (attempt === target) {
          done = true;
          render('ok');
          K.audio.sfx('correct');
          K.fx.sparkle(root.querySelector('.slots'));
          if (mistakes === 0 && hints === 0) {
            correct++;
            ctx.reward(15, root.querySelector('.slots'));
            ctx.mastered(word);
          } else ctx.reward(5, root.querySelector('.slots'));
          ctx.say(K.pick(K.PRAISE));
          ctx.later(() => K.audio.speak(word.en), 300);
          ctx.later(() => { idx++; show(); }, 1800);
        } else {
          mistakes++;
          K.audio.sfx('wrong');
          ctx.say(K.pick(K.OOPS));
          render('shake');
          ctx.later(() => { if (!done) clearAll(); }, 650);
        }
      }

      show();
    },
  });
})();
