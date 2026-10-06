/* Hiệu ứng: pháo giấy, tia sáng, số xu bay lên, thông báo nhỏ */
(function () {
  const K = (window.K = window.K || {});
  const reduce = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const COLORS = ['#ff5d8f', '#ffb703', '#3ddc97', '#4cc9f0', '#7c5cff', '#ff8a3d'];

  K.fx = {
    confetti(count) {
      if (reduce()) return;
      const canvas = document.createElement('canvas');
      canvas.className = 'confetti';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      const g = canvas.getContext('2d');
      const n = count || 120;
      const parts = Array.from({ length: n }, () => ({
        x: canvas.width / 2 + (Math.random() - 0.5) * 120,
        y: canvas.height * 0.35,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        s: Math.random() * 8 + 5,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        c: COLORS[K.rand(COLORS.length)],
      }));
      const t0 = performance.now();
      (function frame(t) {
        const age = t - t0;
        g.clearRect(0, 0, canvas.width, canvas.height);
        parts.forEach((p) => {
          p.vy += 0.35;
          p.x += p.vx;
          p.y += p.vy;
          p.r += p.vr;
          g.save();
          g.globalAlpha = Math.max(0, 1 - age / 2600);
          g.translate(p.x, p.y);
          g.rotate(p.r);
          g.fillStyle = p.c;
          g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
          g.restore();
        });
        if (age < 2600) requestAnimationFrame(frame);
        else canvas.remove();
      })(t0);
    },

    sparkle(el) {
      if (reduce() || !el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        s.className = 'spark';
        s.textContent = ['✨', '⭐', '💫'][i % 3];
        const a = (Math.PI * 2 * i) / 8;
        s.style.left = cx + 'px';
        s.style.top = cy + 'px';
        s.style.setProperty('--dx', Math.cos(a) * 70 + 'px');
        s.style.setProperty('--dy', Math.sin(a) * 70 + 'px');
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
      }
    },

    floatText(el, text) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = document.createElement('span');
      s.className = 'float-text';
      s.textContent = text;
      s.style.left = r.left + r.width / 2 + 'px';
      s.style.top = r.top + r.height / 3 + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    },

    toast(text) {
      const root = document.getElementById('toast-root');
      if (!root) return;
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = text;
      root.appendChild(t);
      setTimeout(() => t.remove(), 3200);
    },
  };
})();
