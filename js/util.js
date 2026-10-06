/* Các hàm tiện ích dùng chung */
(function () {
  const K = (window.K = window.K || {});

  K.games = {};
  K.gameOrder = []; // các trò chơi có tính sao (không gồm "Học từ")

  K.esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  K.rand = (n) => Math.floor(Math.random() * n);
  K.pick = (a) => a[K.rand(a.length)];
  K.shuffle = (a) => {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = K.rand(i + 1);
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  K.sample = (a, n) => K.shuffle(a).slice(0, n);
  K.distractors = (pool, word, n) => K.sample(pool.filter((x) => x.en !== word.en), n);

  K.html = (str) => {
    const t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstElementChild;
  };

  // Hình minh hoạ của một từ (emoji hoặc chấm màu)
  K.visual = (w) =>
    w.c ? `<span class="swatch" style="--c:${w.c}"></span>` : `<span class="emo">${w.e}</span>`;

  K.registerGame = (g) => {
    K.games[g.id] = g;
    if (g.scored !== false) K.gameOrder.push(g.id);
  };
})();
