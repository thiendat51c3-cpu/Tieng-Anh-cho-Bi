/* Sticker anime siêu siêu hiếm: 100 nhân vật tự vẽ (SVG), không dùng nhân vật của bất kỳ phim hay truyện nào.
   Chỉ mở được bằng "Hộp quà Anime" (K.ANIME_COST xu mỗi lần). */
(function () {
  const K = (window.K = window.K || {});
  const L = '#2d2250';
  const stroke = `stroke="${L}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const star5 = (cx, cy, r, fill) => {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r;
      pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}" ${stroke}/>`;
  };
  const sparkle = (x, y, r, c = '#fde047') => `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}z" fill="${c}"/>`;
  const eyes = (c) => [38, 62].map((x) => `<ellipse cx="${x}" cy="52" rx="6.5" ry="8" fill="#fff" stroke="${L}" stroke-width="1.6"/><ellipse cx="${x}" cy="53.5" rx="5" ry="6.5" fill="${c}"/><ellipse cx="${x}" cy="54.5" rx="2.6" ry="3.6" fill="${L}"/><circle cx="${x - 2}" cy="50.5" r="2.2" fill="#fff"/><circle cx="${x + 2}" cy="56" r="1" fill="#fff"/><path d="M${x - 7} 47q7-5 14 0" fill="none" stroke="${L}" stroke-width="2" stroke-linecap="round"/>`).join('');
  const face = (skin = '#ffe3d1') => `<ellipse cx="50" cy="52" rx="27" ry="25" fill="${skin}" ${stroke}/>`;
  const cheeks = '<ellipse cx="29" cy="63" rx="4.5" ry="2.6" fill="#ff8fa3" opacity=".7"/><ellipse cx="71" cy="63" rx="4.5" ry="2.6" fill="#ff8fa3" opacity=".7"/>';
  const smile = `<path d="M44 65q6 6 12 0" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const body = (c) => `<path d="M24 100c0-15 11-23 26-23s26 8 26 23z" fill="${c}" ${stroke}/>`;
  const bangs = (c) => `<path d="M22 54C18 26 34 13 50 13s32 13 28 41c-2-9-6-16-12-20-6 8-18 14-36 20-3 0-6 0-8 0z" fill="${c}" ${stroke}/>`;
  const longBack = (c) => `<path d="M19 54C13 22 33 9 50 9s37 13 31 45c2 18 6 30 2 40H17c-4-10 0-22 2-40z" fill="${c}" ${stroke}/>`;
  const shortBack = (c) => `<path d="M21 54C16 24 34 10 50 10s34 14 29 44c-2-10-6-16-12-20H33c-6 4-10 10-12 20z" fill="${c}" ${stroke}/>`;
  const tail = (c, side) => `<path d="M${side < 0 ? 24 : 76} 34C${side < 0 ? 2 : 98} 26 ${side < 0 ? -2 : 102} 62 ${side < 0 ? 10 : 90} 86c${side < 0 ? 4 : -4}-14 ${side < 0 ? 12 : -12}-26 ${side < 0 ? 16 : -16}-36z" fill="${c}" ${stroke}/>`;
  const bow = (x, y, c) => `<path d="M${x} ${y}l-9-6v12zM${x} ${y}l9-6v12z" fill="${c}" ${stroke}/><circle cx="${x}" cy="${y}" r="3" fill="${c}" ${stroke}/>`;
  const cat = (x, c, inner) => `<path d="M${x - 10} 30L${x} 4l11 22z" fill="${c}" ${stroke}/><path d="M${x - 4} 26L${x} 12l5 12z" fill="${inner}"/>`;

  const A = [
    { id: 'an-sakura', name: 'Pháp sư Hoa Anh Đào', art: `${tail('#ff8fc7', -1)}${tail('#ff8fc7', 1)}${shortBack('#ff8fc7')}${body('#fb7185')}<path d="M44 80l6 8 6-8z" fill="#fff" ${stroke}/>${face()}${bangs('#ff8fc7')}${bow(24, 28, '#ef4444')}${bow(76, 28, '#ef4444')}${eyes('#ec4899')}${cheeks}${smile}<path d="M84 94L92 66" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>${star5(92, 60, 9, '#fde047')}${sparkle(10, 16, 6)}${sparkle(90, 20, 5, '#fff')}` },
    { id: 'an-ninja', name: 'Ninja Gió Xanh', art: `${shortBack('#3b82f6')}<path d="M30 16l4-12 8 10 8-14 8 14 8-10 4 12z" fill="#3b82f6" ${stroke}/>${body('#1e3a8a')}${face()}${bangs('#3b82f6')}<path d="M22 38q28-14 56 0v9q-28-10-56 0z" fill="#1e293b" ${stroke}/><rect x="38" y="33" width="24" height="10" rx="2" fill="#cbd5e1" ${stroke}/><path d="M46 38h8" stroke="${L}" stroke-width="2"/>${eyes('#0ea5e9')}<path d="M24 60q26 10 52 0v12q-26 14-52 0z" fill="#1e293b" ${stroke}/>${cheeks.replace(/opacity=".7"/g, 'opacity="0"')}<path d="M84 74l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" fill="#94a3b8" ${stroke}/>` },
    { id: 'an-samurai', name: 'Kiếm sĩ Samurai', art: `<path d="M6 96L40 58" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/><path d="M2 100l8-8" stroke="#92400e" stroke-width="6" stroke-linecap="round"/>${shortBack('#1f2937')}<circle cx="50" cy="8" r="7" fill="#1f2937" ${stroke}/><rect x="44" y="12" width="12" height="5" rx="2" fill="#ef4444" ${stroke}/>${body('#b91c1c')}<path d="M40 80l10 12 10-12" fill="#fff" ${stroke}/>${face()}${bangs('#1f2937')}${eyes('#78350f')}<path d="M26 44l9 3M74 44l-9 3" stroke="${L}" stroke-width="3" stroke-linecap="round"/>${cheeks}<path d="M45 66h10" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>` },
    { id: 'an-witch', name: 'Phù thủy Luna', art: `${longBack('#a78bfa')}${body('#4c1d95')}${face()}${bangs('#a78bfa')}<path d="M10 36q40 14 80 0l-6-8q-34 10-68 0z" fill="#5b21b6" ${stroke}/><path d="M24 30q6-22 30-26 6 12 12 26z" fill="#6d28d9" ${stroke}/><path d="M38 22a7 7 0 108 8 5 5 0 01-8-8z" fill="#fde047"/>${eyes('#7c3aed')}${cheeks}${smile}${sparkle(14, 60, 6)}${sparkle(88, 56, 7, '#fff')}${star5(82, 84, 7, '#fde047')}` },
    { id: 'an-neko', name: 'Mèo Neko', art: `<path d="M78 92c14-4 22-18 14-34" fill="none" stroke="#fbbf24" stroke-width="7" stroke-linecap="round"/>${shortBack('#fbbf24')}${cat(30, '#fbbf24', '#fda4af')}${cat(70, '#fbbf24', '#fda4af')}${body('#f472b6')}${face()}${bangs('#fbbf24')}${eyes('#16a34a')}${cheeks}<path d="M46 64l4 3 4-3" fill="none" stroke="${L}" stroke-width="2" stroke-linecap="round"/><path d="M12 56l14 2M12 64l14-2M88 56l-14 2M88 64l-14-2" stroke="${L}" stroke-width="1.6" stroke-linecap="round"/><path d="M36 82q14 8 28 0" stroke="#ef4444" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="50" cy="90" r="4" fill="#fde047" ${stroke}/>` },
    { id: 'an-dragon', name: 'Chiến binh Rồng Lửa', art: `<path d="M8 90C0 60 16 40 20 14c8 16 14 24 12 42zM92 90c8-30-8-50-12-76-8 16-14 24-12 42z" fill="#fb923c" ${stroke}/><path d="M14 80C10 62 20 52 22 38c4 10 8 16 6 28z" fill="#fde047"/>${shortBack('#dc2626')}<path d="M30 20l-2-14 12 8zM70 20l2-14-12 8z" fill="#fef3c7" ${stroke}/><path d="M32 18l2-12 8 6 8-10 8 10 8-6 2 12z" fill="#dc2626" ${stroke}/>${body('#7f1d1d')}<path d="M34 80h32v6H34z" fill="#fbbf24" ${stroke}/>${face()}${bangs('#dc2626')}${eyes('#f59e0b')}<path d="M26 44l10 4M74 44l-10 4" stroke="${L}" stroke-width="3" stroke-linecap="round"/>${cheeks}<path d="M44 65q6 4 12 0" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>` },
    { id: 'an-ice', name: 'Công chúa Băng', art: `${longBack('#7dd3fc')}${body('#e0f2fe')}${face('#fff1ea')}${bangs('#7dd3fc')}<path d="M32 18l5-10 6 8 7-14 7 14 6-8 5 10z" fill="#e0f2fe" ${stroke}/><circle cx="50" cy="12" r="3" fill="#38bdf8" ${stroke}/>${eyes('#0ea5e9')}${cheeks}${smile}${sparkle(12, 40, 7, '#bae6fd')}${sparkle(88, 70, 6, '#fff')}<path d="M86 24v14M79 31h14M81 26l10 10M91 26L81 36" stroke="#bae6fd" stroke-width="2.4" stroke-linecap="round"/>` },
    { id: 'an-mecha', name: 'Phi công Mecha', art: `<path d="M50 6V16" stroke="${L}" stroke-width="3"/><circle cx="50" cy="6" r="4" fill="#ef4444" ${stroke}/>${body('#64748b')}<rect x="42" y="82" width="16" height="10" rx="2" fill="#38bdf8" ${stroke}/><rect x="22" y="22" width="56" height="52" rx="18" fill="#cbd5e1" ${stroke}/><rect x="28" y="38" width="44" height="22" rx="10" fill="#0f172a" ${stroke}/><rect x="33" y="44" width="14" height="10" rx="5" fill="#22d3ee"/><rect x="53" y="44" width="14" height="10" rx="5" fill="#22d3ee"/><circle cx="26" cy="66" r="3" fill="#94a3b8" ${stroke}/><circle cx="74" cy="66" r="3" fill="#94a3b8" ${stroke}/><path d="M40 68h20" stroke="${L}" stroke-width="3" stroke-linecap="round"/><path d="M14 40v20M86 40v20" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>${sparkle(86, 18, 6, '#67e8f9')}` },
    { id: 'an-fox', name: 'Hồ ly Kitsune', art: `<path d="M26 84C4 84-4 56 8 40c6 12 12 18 22 22z" fill="#fb923c" ${stroke}/><path d="M8 40c-2 6-2 12 0 18 4-2 8-8 6-14z" fill="#fff"/><path d="M74 84c22 0 30-28 18-44-6 12-12 18-22 22z" fill="#fb923c" ${stroke}/><path d="M92 40c2 6 2 12 0 18-4-2-8-8-6-14z" fill="#fff"/>${shortBack('#fb923c')}<path d="M24 34L28 4l20 18zM76 34L72 4 52 22z" fill="#fb923c" ${stroke}/><path d="M30 26l2-12 10 8zM70 26l-2-12-10 8z" fill="#fff"/>${body('#fff')}<path d="M26 100c0-8 4-14 10-18l14 18z" fill="#ef4444" ${stroke}/>${face()}${bangs('#fb923c')}${eyes('#f59e0b')}${cheeks}${smile}<path d="M62 30q18-6 22 12-4 16-18 12-6-10-4-24z" fill="#fff" ${stroke}/><path d="M68 38l12 2M68 46l10 6" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/>` },
    { id: 'an-angel', name: 'Thiên thần Ánh Sáng', art: `<path d="M26 70C4 70-2 44 6 24c8 10 20 14 26 26zM74 70c22 0 28-26 20-46-8 10-20 14-26 26z" fill="#fff" ${stroke}/>${shortBack('#fde68a')}${body('#fff')}${face()}${bangs('#fde68a')}<ellipse cx="50" cy="8" rx="16" ry="5" fill="none" stroke="#fbbf24" stroke-width="4"/>${eyes('#38bdf8')}${cheeks}${smile}${sparkle(14, 12, 7, '#fff')}${sparkle(88, 8, 6, '#fde047')}${sparkle(90, 80, 5, '#fde047')}` },
    { id: 'an-detective', name: 'Thám tử Kid', art: `${shortBack('#78350f')}${body('#a16207')}<path d="M40 80l10 10 10-10" fill="#fff" ${stroke}/>${face()}${bangs('#78350f')}<path d="M20 36C24 14 40 8 50 8s26 6 30 28c-10-6-20-8-30-8s-20 2-30 8z" fill="#d6a85c" ${stroke}/><path d="M32 18l6 8M46 12l2 10M60 14l-2 10M72 22l-6 8" stroke="#a16207" stroke-width="2.4" stroke-linecap="round"/><rect x="42" y="3" width="16" height="7" rx="3" fill="#a16207" ${stroke}/>${eyes('#92400e')}${cheeks}${smile}<circle cx="80" cy="80" r="9" fill="#e0f2fe" opacity=".8" ${stroke}/><path d="M86 87l9 9" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>` },
    { id: 'an-idol', name: 'Idol Sao Băng', art: `${tail('#2dd4bf', -1)}${tail('#2dd4bf', 1)}${shortBack('#2dd4bf')}${body('#ec4899')}${star5(50, 90, 6, '#fde047')}${face()}${bangs('#2dd4bf')}${star5(24, 28, 7, '#fde047')}${star5(76, 28, 7, '#fde047')}${eyes('#0d9488')}${cheeks}<path d="M43 63q7 9 14 0z" fill="#fb7185" ${stroke}/><rect x="84" y="62" width="7" height="20" rx="3.5" fill="#f472b6" ${stroke} transform="rotate(20 87 72)"/><circle cx="87" cy="58" r="6" fill="#e2e8f0" ${stroke}/>${sparkle(8, 12, 6, '#fff')}${sparkle(92, 40, 6)}` },
  ];


  /* ===== 88 nhân vật còn lại: ghép ngẫu nhiên (có hạt giống cố định) từ nhiều kiểu mắt, miệng, mặt, tóc, quần áo, phụ kiện, nền ===== */
  const ELS = [
    { n: 'Hỏa Diệm', hair: '#ef4444', out: '#991b1b', eye: '#f59e0b', ac: '#fb923c', bg: '#fecaca', em: 'flame' },
    { n: 'Thủy Tinh', hair: '#38bdf8', out: '#0369a1', eye: '#0ea5e9', ac: '#bae6fd', bg: '#e0f2fe', em: 'drop' },
    { n: 'Lôi Điện', hair: '#facc15', out: '#a16207', eye: '#8b5cf6', ac: '#fde047', bg: '#fef9c3', em: 'bolt' },
    { n: 'Phong Vân', hair: '#4ade80', out: '#15803d', eye: '#16a34a', ac: '#bbf7d0', bg: '#dcfce7', em: 'swirl' },
    { n: 'Hải Lam', hair: '#2563eb', out: '#1e3a8a', eye: '#06b6d4', ac: '#67e8f9', bg: '#cffafe', em: 'wave' },
    { n: 'Địa Hoàng', hair: '#a16207', out: '#78350f', eye: '#65a30d', ac: '#d6a85c', bg: '#fde68a', em: 'rock' },
    { n: 'Dạ Nguyệt', hair: '#6366f1', out: '#312e81', eye: '#e879f9', ac: '#c7d2fe', bg: '#c7d2fe', em: 'moon' },
    { n: 'Tinh Tú', hair: '#fde68a', out: '#b45309', eye: '#f43f5e', ac: '#fbbf24', bg: '#fed7aa', em: 'star' },
    { n: 'Hoa Hồng', hair: '#f472b6', out: '#be185d', eye: '#e11d48', ac: '#fda4af', bg: '#fbcfe8', em: 'flower' },
    { n: 'Kim Cương', hair: '#e2e8f0', out: '#475569', eye: '#38bdf8', ac: '#a5f3fc', bg: '#e2e8f0', em: 'gem' },
    { n: 'Cầu Vồng', hair: '#c084fc', out: '#7c3aed', eye: '#22c55e', ac: '#f9a8d4', bg: '#f3e8ff', em: 'rainbow' },
  ];
  const HAIRS = ['#1f2937', '#78350f', '#fbbf24', '#f9a8d4', '#e2e8f0', '#0ea5e9', '#7c3aed', '#16a34a', '#dc2626', '#fb923c'];
  const SKINS = ['#ffe3d1', '#fcd9b6', '#f6cfb0', '#e8b48c', '#c68a5e', '#8d5a3b', '#f3e4ff', '#d9f2e6', '#cfe8ff'];
  const rng = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const emblem = (k, c) => ({
    flame: `<path d="M50 82c6 6 8 10 4 14-3 2-9 2-8-3 0-3 3-4 2-8 1 1 2 1 2-3z" fill="${c}" ${stroke}/>`,
    drop: `<path d="M50 80c6 8 9 12 5 16-3 2-9 2-10-2-1-4 3-8 5-14z" fill="${c}" ${stroke}/>`,
    bolt: `<path d="M53 80l-8 10h5l-3 10 10-12h-6z" fill="${c}" ${stroke}/>`,
    swirl: `<path d="M50 94a6 6 0 116-6 4 4 0 11-7-1" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
    wave: `<path d="M38 90q6-6 12 0t12 0M38 97q6-6 12 0t12 0" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
    rock: `<path d="M42 96l4-12 10-2 6 12z" fill="${c}" ${stroke}/>`,
    moon: `<path d="M54 82a9 9 0 100 16 7 7 0 01 0-16z" fill="${c}" ${stroke}/>`,
    star: star5(50, 90, 8, c),
    flower: `<g fill="${c}" ${stroke}><circle cx="50" cy="83" r="4"/><circle cx="57" cy="89" r="4"/><circle cx="54" cy="97" r="4"/><circle cx="46" cy="97" r="4"/><circle cx="43" cy="89" r="4"/></g><circle cx="50" cy="91" r="3.5" fill="#fde047"/>`,
    gem: `<path d="M40 86l6-6h8l6 6-10 14z" fill="${c}" ${stroke}/><path d="M40 86h20" stroke="${L}" stroke-width="1.6"/>`,
    rainbow: `<path d="M38 98a12 12 0 0124 0" fill="none" stroke="#ef4444" stroke-width="3"/><path d="M42 98a8 8 0 0116 0" fill="none" stroke="#fde047" stroke-width="3"/><path d="M46 98a4 4 0 018 0" fill="none" stroke="#38bdf8" stroke-width="3"/>`,
  })[k];

  // --- Khuôn mặt, mắt, miệng, lông mày ---
  const FACES = [
    (k) => `<ellipse cx="50" cy="52" rx="27" ry="25" fill="${k}" ${stroke}/>`,
    (k) => `<path d="M23 50C23 30 36 24 50 24s27 6 27 26c0 14-10 29-27 29S23 64 23 50z" fill="${k}" ${stroke}/>`,
    (k) => `<ellipse cx="50" cy="54" rx="30" ry="23" fill="${k}" ${stroke}/>`,
    (k) => `<ellipse cx="50" cy="52" rx="24" ry="28" fill="${k}" ${stroke}/>`,
  ];
  const eyeSet = (st, c, skin) => [38, 62].map((x, i) => {
    const big = `<ellipse cx="${x}" cy="52" rx="6.5" ry="8" fill="#fff" stroke="${L}" stroke-width="1.6"/><ellipse cx="${x}" cy="53.5" rx="5" ry="6.5" fill="${c}"/><ellipse cx="${x}" cy="54.5" rx="2.6" ry="3.6" fill="${L}"/><circle cx="${x - 2}" cy="50.5" r="2.2" fill="#fff"/><circle cx="${x + 2}" cy="56" r="1" fill="#fff"/><path d="M${x - 7} 47q7-5 14 0" fill="none" stroke="${L}" stroke-width="2" stroke-linecap="round"/>`;
    const happy = `<path d="M${x - 7} 55q7-10 14 0" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;
    return ({
      0: big,
      1: `<path d="M${x - 8.5} 54q8.5-11 17 0q-8.5 6-17 0z" fill="#fff" stroke="${L}" stroke-width="1.6"/><ellipse cx="${x}" cy="53" rx="3.8" ry="4.4" fill="${c}"/><ellipse cx="${x}" cy="53.4" rx="1.8" ry="2.4" fill="${L}"/><path d="M${x - 9.5} 53q9.5-12 19 0" fill="none" stroke="${L}" stroke-width="3.2" stroke-linecap="round"/><circle cx="${x - 1}" cy="51.6" r="1.1" fill="#fff"/>`,
      2: happy,
      3: `<ellipse cx="${x}" cy="54" rx="6.5" ry="6" fill="#fff" stroke="${L}" stroke-width="1.6"/><circle cx="${x}" cy="55.5" r="4.4" fill="${c}"/><circle cx="${x}" cy="56" r="2" fill="${L}"/><path d="M${x - 7} 54a7 6.5 0 0114 0z" fill="${skin}" stroke="${L}" stroke-width="2" stroke-linejoin="round"/>`,
      4: `<circle cx="${x}" cy="53" r="7.4" fill="${c}" stroke="${L}" stroke-width="1.8"/><circle cx="${x}" cy="53" r="3.4" fill="${L}"/>${star5(x - 2, 50.4, 2.8, '#fff')}<circle cx="${x + 2.4}" cy="57" r="1.2" fill="#fff"/>`,
      5: `<circle cx="${x}" cy="53" r="4.4" fill="${L}"/><circle cx="${x - 1.4}" cy="51.6" r="1.5" fill="#fff"/>`,
      6: i === 0 ? big : happy,
      7: `<ellipse cx="${x}" cy="53" rx="6.6" ry="8" fill="${c}" stroke="${L}" stroke-width="1.8"/><ellipse cx="${x}" cy="53" rx="1.8" ry="6.4" fill="${L}"/><circle cx="${x - 2.4}" cy="50" r="1.8" fill="#fff"/>`,
    })[st];
  }).join('');
  const MOUTHS = [
    `<path d="M44 65q6 6 12 0" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    `<path d="M43 63q7 13 14 0z" fill="#7f1d1d" ${stroke}/><path d="M47 69q3-3 6 0" fill="#fb7185"/>`,
    `<path d="M44 65q3 4 6 0q3 4 6 0" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    `<path d="M45 66q7 3 12-4" stroke="${L}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    `<ellipse cx="50" cy="66" rx="2.6" ry="3.2" fill="#7f1d1d" stroke="${L}" stroke-width="1.6"/>`,
    `<path d="M44 64q6 6 12 0" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M50 68q0 6 4.5 6 3.5 0 3-6z" fill="#fb7185" ${stroke}/>`,
  ];
  const BROWS = ['', `<path d="M30 44q7-4 14 0M56 44q7-4 14 0" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>`, `<path d="M29 42l15 5M71 42l-15 5" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`];

  // --- Tóc: phần sau và phần mái ---
  const BACKS = [
    (c) => shortBack(c),
    (c) => longBack(c),
    (c) => tail(c, -1) + tail(c, 1) + shortBack(c),
    (c) => shortBack(c) + `<path d="M72 30C98 22 102 60 88 92c-2-16-8-30-16-38z" fill="${c}" ${stroke}/>`,
    (c) => `<path d="M20 52L10 22l16 8 4-22 12 16 8-20 8 20 12-16 6 22 14-8-8 30z" fill="${c}" ${stroke}/>` + shortBack(c),
    (c) => shortBack(c) + `<circle cx="50" cy="8" r="10" fill="${c}" ${stroke}/>`,
    (c) => shortBack(c) + `<circle cx="22" cy="18" r="10" fill="${c}" ${stroke}/><circle cx="78" cy="18" r="10" fill="${c}" ${stroke}/>`,
    (c) => shortBack(c) + `<circle cx="16" cy="40" r="11" fill="${c}" ${stroke}/><circle cx="84" cy="40" r="11" fill="${c}" ${stroke}/><circle cx="30" cy="12" r="11" fill="${c}" ${stroke}/><circle cx="70" cy="12" r="11" fill="${c}" ${stroke}/>`,
    (c) => shortBack(c) + [-1, 1].map((d) => [0, 1, 2, 3].map((j) => `<ellipse cx="${50 + d * 29 - d * j * 1}" cy="${62 + j * 9}" rx="5" ry="6" fill="${c}" ${stroke}/>`).join('')).join(''),
    (c) => `<path d="M18 52C14 20 34 8 50 8s36 12 32 44c1 14 2 26 0 36H64V68H36v20H18c-2-10-1-22 0-36z" fill="${c}" ${stroke}/>`,
  ];
  const BANGS = [
    (c) => bangs(c),
    (c) => `<path d="M22 54C18 26 34 13 50 13s32 13 28 41c-4-12-12-20-28-22-16 2-24 10-28 22z" fill="${c}" ${stroke}/>`,
    (c) => `<path d="M23 50C19 24 35 12 50 12s31 12 27 38l-3-12H26z" fill="${c}" ${stroke}/>`,
    (c) => `<path d="M22 54C18 26 34 13 50 13s30 14 28 30C70 34 58 32 38 40c-6 4-10 8-16 14z" fill="${c}" ${stroke}/>`,
    (c) => `<path d="M22 54L20 30l10 8 2-16 8 12 10-16 8 16 10-12 2 16 10-8-2 24c-6-8-10-14-14-16-4 6-10 10-14 10s-10-4-14-10c-4 2-8 8-14 16z" fill="${c}" ${stroke}/>`,
  ];
  // --- Quần áo ---
  const OUTFITS = [
    (o, ac, em) => `${body(o)}${emblem(em, ac)}`,
    (o, ac) => `${body(o)}<path d="M38 80l12 16 12-16z" fill="#f8fafc" ${stroke}/><path d="M47 82h6l2 12-5 5-5-5z" fill="${ac}" ${stroke}/>`,
    (o, ac) => `${body(o)}<path d="M28 82q22 16 44 0l-6-9H34z" fill="#fff" ${stroke}/><path d="M33 80q17 10 34 0" stroke="${ac}" stroke-width="2.4" fill="none"/><path d="M50 91l-7-5v10zM50 91l7-5v10z" fill="${ac}" ${stroke}/>`,
    (o, ac) => `<ellipse cx="50" cy="80" rx="30" ry="14" fill="${o}" ${stroke}/>${body(o)}<path d="M44 84v12M56 84v12" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="44" cy="97" r="2" fill="${ac}"/><circle cx="56" cy="97" r="2" fill="${ac}"/>`,
    (o, ac, em) => `${body('#94a3b8')}<circle cx="24" cy="86" r="10" fill="${ac}" ${stroke}/><circle cx="76" cy="86" r="10" fill="${ac}" ${stroke}/><path d="M38 80h24l-4 18H42z" fill="#e2e8f0" ${stroke}/>${emblem(em, o)}`,
    (o, ac) => `${body('#fff')}<path d="M26 100L50 80l24 20z" fill="${o}" ${stroke}/><path d="M32 82l18 16 18-16" fill="none" stroke="${o}" stroke-width="5" stroke-linecap="round"/><rect x="26" y="94" width="48" height="8" fill="${ac}" ${stroke}/>`,
    (o, ac) => `<path d="M8 100C8 72 24 62 50 62s42 10 42 38z" fill="${ac}" ${stroke}/>${body(o)}<circle cx="50" cy="82" r="4.5" fill="#fde047" ${stroke}/>`,
    (o, ac) => `${body(o)}${star5(36, 90, 5, ac)}${star5(50, 96, 5, ac)}${star5(64, 90, 5, ac)}`,
  ];
  // --- Phụ kiện ngẫu nhiên thêm (ngoài phụ kiện theo nghề) ---
  const EXTRAS = [
    () => '',
    () => '',
    () => `<g fill="none" stroke="${L}" stroke-width="2.2"><circle cx="38" cy="52" r="9.5"/><circle cx="62" cy="52" r="9.5"/><path d="M47.5 52h5"/></g>`,
    (c) => `<path d="M22 54q-4-18 28-24 32 6 28 24" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/><rect x="17" y="48" width="9" height="14" rx="4" fill="${c}" ${stroke}/><rect x="74" y="48" width="9" height="14" rx="4" fill="${c}" ${stroke}/>`,
    () => '<g fill="#b45309" opacity=".6"><circle cx="30" cy="60" r="1.2"/><circle cx="34" cy="63" r="1.2"/><circle cx="38" cy="60" r="1.2"/><circle cx="62" cy="60" r="1.2"/><circle cx="66" cy="63" r="1.2"/><circle cx="70" cy="60" r="1.2"/></g>',
    () => `<rect x="62" y="56" width="14" height="6" rx="1" fill="#fde2e4" ${stroke} transform="rotate(-25 69 59)"/>`,
    (c) => `<circle cx="22" cy="66" r="3.4" fill="${c}" ${stroke}/><circle cx="78" cy="66" r="3.4" fill="${c}" ${stroke}/>`,
    (c) => star5(70, 28, 6, c),
    (c) => `<g ${stroke}><circle cx="70" cy="28" r="3.6" fill="${c}"/><circle cx="76" cy="31" r="3.6" fill="${c}"/><circle cx="74" cy="37" r="3.6" fill="${c}"/><circle cx="66" cy="34" r="3.6" fill="${c}"/><circle cx="71" cy="33" r="2.4" fill="#fde047" stroke="none"/></g>`,
    (c) => `<rect x="24" y="30" width="52" height="9" rx="4.5" fill="${c}" ${stroke}/><circle cx="36" cy="34.5" r="5.4" fill="#e0f2fe" ${stroke}/><circle cx="64" cy="34.5" r="5.4" fill="#e0f2fe" ${stroke}/>`,
    () => `<path d="M26 46h24v14H26z" fill="#1f2937" opacity=".0"/><ellipse cx="38" cy="53" rx="9" ry="8" fill="#1f2937" ${stroke}/><path d="M22 40L38 53M38 53L64 36" stroke="#1f2937" stroke-width="2.4"/>`,
    () => `<path d="M72 44l-5 14M69 47l6-2" stroke="#b91c1c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  ];
  // --- Nghề: phụ kiện đặc trưng ---
  const ROLES = [
    { n: 'Công chúa', back: () => '', front: (e) => `<path d="M32 20l5-10 6 8 7-14 7 14 6-8 5 10z" fill="#fde047" ${stroke}/><circle cx="50" cy="13" r="3.2" fill="${e.ac}" ${stroke}/>` },
    { n: 'Hiệp sĩ', back: () => '', front: (e) => `<path d="M50 6c10-12 26-8 30 6-10-4-20-2-26 8z" fill="${e.ac}" ${stroke}/><path d="M22 40C20 16 36 6 50 6s30 10 28 34c-8-5-16-7-28-7s-20 2-28 7z" fill="#94a3b8" ${stroke}/><path d="M30 28q20-8 40 0" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>` },
    { n: 'Phù thủy', back: () => '', front: (e) => `<path d="M10 38q40 14 80 0l-6-8q-34 10-68 0z" fill="${e.out}" ${stroke}/><path d="M24 32q6-24 30-30 6 14 12 30z" fill="${e.out}" ${stroke}/><path d="M28 30q22 6 40 0v-5q-20 6-40 0z" fill="${e.ac}"/>` },
    { n: 'Ninja', back: () => '', front: (e) => `<path d="M22 38q28-14 56 0v9q-28-10-56 0z" fill="${e.out}" ${stroke}/><rect x="38" y="33" width="24" height="10" rx="2" fill="#cbd5e1" ${stroke}/><path d="M78 40l14 6-12 4zM78 44l12 10-14 0z" fill="${e.out}" ${stroke}/>` },
    { n: 'Thiên thần', back: () => `<path d="M26 70C4 70-2 44 6 24c8 10 20 14 26 26zM74 70c22 0 28-26 20-46-8 10-20 14-26 26z" fill="#fff" ${stroke}/>`, front: () => `<ellipse cx="50" cy="8" rx="16" ry="5" fill="none" stroke="#fbbf24" stroke-width="4"/>` },
    { n: 'Tiểu quỷ', back: (e) => `<path d="M74 88c12 0 18-8 14-20l-4 4z" fill="none" stroke="${e.ac}" stroke-width="4" stroke-linecap="round"/>`, front: (e) => `<path d="M30 28C16 24 16 8 24 2c2 10 8 16 16 20zM70 28c14-4 14-20 6-26-2 10-8 16-16 20z" fill="#4c1d95" ${stroke}/><path d="M24 8c1 6 4 10 8 13M76 8c-1 6-4 10-8 13" stroke="${e.ac}" stroke-width="2" fill="none" stroke-linecap="round"/>` },
    { n: 'Mèo', back: (e) => `<path d="M30 30L20 4l20 14zM70 30L80 4 60 18z" fill="${e.hair}" ${stroke}/><path d="M28 24l-4-12 10 8zM72 24l4-12-10 8z" fill="#fda4af"/>`, front: () => '<path d="M12 56l14 2M12 64l14-2M88 56l-14 2M88 64l-14-2" stroke="#2d2250" stroke-width="1.6" stroke-linecap="round"/>' },
    { n: 'Thỏ', back: (e) => `<ellipse cx="36" cy="20" rx="8" ry="19" fill="${e.hair}" ${stroke}/><ellipse cx="36" cy="20" rx="3.6" ry="13" fill="#fda4af"/><ellipse cx="64" cy="20" rx="8" ry="19" fill="${e.hair}" ${stroke}/><ellipse cx="64" cy="20" rx="3.6" ry="13" fill="#fda4af"/>`, front: () => '' },
  ];

  // --- Nền thẻ: càng hiếm càng lộng lẫy ---
  const bgArt = (tier, c, ac) => {
    let o = `<rect x="2" y="2" width="96" height="96" rx="16" fill="${c}"/>`;
    if (tier === 1) o += `<circle cx="50" cy="52" r="42" fill="#fff" opacity=".4"/>`;
    if (tier === 2) o += `<circle cx="50" cy="52" r="44" fill="#fff" opacity=".35"/><circle cx="50" cy="52" r="36" fill="none" stroke="${ac}" stroke-width="3" opacity=".7"/>${sparkle(10, 12, 6, '#fff')}${sparkle(90, 90, 6, '#fff')}`;
    if (tier >= 3) {
      o += Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6, b = a + Math.PI / 12; return `<path d="M50 52L${(50 + 90 * Math.cos(a)).toFixed(1)} ${(52 + 90 * Math.sin(a)).toFixed(1)}L${(50 + 90 * Math.cos(b)).toFixed(1)} ${(52 + 90 * Math.sin(b)).toFixed(1)}z" fill="#fff" opacity=".4"/>`; }).join('');
      o += `<circle cx="50" cy="52" r="40" fill="${ac}" opacity=".25"/>${sparkle(10, 12, 7, '#fff')}${sparkle(90, 12, 6, '#fde047')}${sparkle(88, 88, 7, '#fff')}${sparkle(12, 90, 6, '#fde047')}`;
    }
    if (tier === 4) o += `<rect x="3" y="3" width="94" height="94" rx="15" fill="none" stroke="#f59e0b" stroke-width="3.5"/>${star5(14, 14, 6, '#fde047')}${star5(86, 14, 6, '#fde047')}`;
    return o;
  };

  // --- Phân bậc hiếm cho 100 nhân vật: 5 Huyền thoại, 12 Cực hiếm, 28 Siêu hiếm, 55 Hiếm ---
  const TIER_OF = {};
  ['an-sakura', 'an-dragon', 'an-ice', 'an-angel', 'an-idol'].forEach((id) => (TIER_OF[id] = 4));
  ['an-ninja', 'an-samurai', 'an-witch', 'an-neko', 'an-mecha', 'an-fox', 'an-detective'].forEach((id) => (TIER_OF[id] = 3));
  const gen = [];
  ROLES.forEach((r, ri) => ELS.forEach((e, ei) => gen.push({ r, e, ri, ei })));
  const order = gen.map((_, i) => i);
  { const R = rng(20251013); for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } }
  order.forEach((gi, rank) => { gen[gi].tier = rank < 5 ? 3 : rank < 33 ? 2 : 1; }); // 5 cực hiếm + 28 siêu hiếm + 55 hiếm

  gen.forEach((g, gi) => {
    const R = rng(1000 + gi * 7919), pick = (arr) => arr[Math.floor(R() * arr.length)];
    const { r, e } = g;
    const hairC = R() < 0.55 ? e.hair : pick(HAIRS);
    const skin = r.n === 'Tiểu quỷ' ? pick(['#f8a5a5', '#c4b5fd', '#fca5a5', '#f6cfb0']) : pick(SKINS);
    const eyeSt = Math.floor(R() * 8), mouth = Math.floor(R() * MOUTHS.length), brow = Math.floor(R() * 3);
    const face = Math.floor(R() * FACES.length), back = Math.floor(R() * BACKS.length), bang = Math.floor(R() * BANGS.length);
    const outfit = Math.floor(R() * OUTFITS.length), extra = Math.floor(R() * EXTRAS.length);
    const ahoge = R() < 0.3 ? `<path d="M50 14q-10-14 2-16 10 0 6 10" fill="none" stroke="${hairC}" stroke-width="3.4" stroke-linecap="round"/>` : '';
    const fang = r.n === 'Tiểu quỷ' && mouth === 0 ? `<path d="M46 66l2 4 2-4" fill="#fff" ${stroke}/>` : '';
    const tier = g.tier + 0; // 1..3 (cực hiếm = 3)
    const art = `${bgArt(tier, e.bg, e.ac)}${r.back(e)}${BACKS[back](hairC)}${OUTFITS[outfit](e.out, e.ac, e.em)}${FACES[face](skin)}${BANGS[bang](hairC)}${ahoge}${r.front(e)}${eyeSet(eyeSt, e.eye, skin)}${BROWS[brow]}${cheeks}${MOUTHS[mouth]}${fang}${EXTRAS[extra](e.ac)}${sparkle(12 + (g.ei % 3) * 4, 24 + (g.ri % 4) * 10, 5, e.ac)}`;
    A.push({ id: `an-g${String(g.ri * ELS.length + g.ei + 1).padStart(2, '0')}`, name: `${r.n} ${e.n}`, art, tier });
  });

  // Nền cho 12 nhân vật vẽ tay (theo bậc), rồi đăng ký sticker
  const HAND_BG = { 'an-sakura': '#fbcfe8', 'an-ninja': '#bfdbfe', 'an-samurai': '#fecaca', 'an-witch': '#ddd6fe', 'an-neko': '#fef3c7', 'an-dragon': '#fed7aa', 'an-ice': '#bae6fd', 'an-mecha': '#e2e8f0', 'an-fox': '#fed7aa', 'an-angel': '#fef9c3', 'an-detective': '#e7e5e4', 'an-idol': '#99f6e4' };
  A.forEach((a) => { if (HAND_BG[a.id]) { a.tier = TIER_OF[a.id] || 2; a.art = bgArt(a.tier, HAND_BG[a.id], '#f9a8d4') + a.art; } });

  const TIERS = {
    1: { key: 'an1', name: 'Anime Hiếm ⭐', color: '#3b82f6', animeWeight: 60 },
    2: { key: 'an2', name: 'Anime Siêu hiếm 🌟', color: '#f59e0b', animeWeight: 28 },
    3: { key: 'an3', name: 'Anime Cực hiếm 💎', color: '#a855f7', animeWeight: 9 },
    4: { key: 'an4', name: 'Anime Huyền thoại 👑', color: '#ec4899', animeWeight: 3 },
  };
  K.ANIME_STICKERS = A.map((a) => ({
    id: a.id, name: a.name, anime: true, rarity: TIERS[a.tier].key,
    e: `<svg viewBox="0 0 100 100" role="img" aria-label="${a.name}" xmlns="http://www.w3.org/2000/svg">${a.art}</svg>`,
  }));
  K.STICKERS.push(...K.ANIME_STICKERS);
  Object.values(TIERS).forEach((t) => { K.RARITY[t.key] = { name: t.name, weight: 0, animeWeight: t.animeWeight, color: t.color, anime: true }; }); // weight 0: chỉ có trong Hộp quà Anime
})();
