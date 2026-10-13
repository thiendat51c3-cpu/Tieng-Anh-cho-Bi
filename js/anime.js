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


  /* ===== 88 nhân vật còn lại: ghép "nghề" x "nguyên tố" (8 x 11), mỗi nhân vật một kiểu tóc/màu/biểu tượng riêng ===== */
  const ELS = [
    { n: 'Hỏa Diệm', hair: '#ef4444', out: '#991b1b', eye: '#f59e0b', ac: '#fb923c', em: 'flame' },
    { n: 'Thủy Tinh', hair: '#38bdf8', out: '#0369a1', eye: '#0ea5e9', ac: '#bae6fd', em: 'drop' },
    { n: 'Lôi Điện', hair: '#facc15', out: '#a16207', eye: '#8b5cf6', ac: '#fde047', em: 'bolt' },
    { n: 'Phong Vân', hair: '#4ade80', out: '#15803d', eye: '#16a34a', ac: '#bbf7d0', em: 'swirl' },
    { n: 'Hải Lam', hair: '#2563eb', out: '#1e3a8a', eye: '#06b6d4', ac: '#67e8f9', em: 'wave' },
    { n: 'Địa Hoàng', hair: '#a16207', out: '#78350f', eye: '#65a30d', ac: '#d6a85c', em: 'rock' },
    { n: 'Dạ Nguyệt', hair: '#6366f1', out: '#312e81', eye: '#e879f9', ac: '#c7d2fe', em: 'moon' },
    { n: 'Tinh Tú', hair: '#fde68a', out: '#b45309', eye: '#f43f5e', ac: '#fbbf24', em: 'star' },
    { n: 'Hoa Hồng', hair: '#f472b6', out: '#be185d', eye: '#e11d48', ac: '#fda4af', em: 'flower' },
    { n: 'Kim Cương', hair: '#e2e8f0', out: '#475569', eye: '#38bdf8', ac: '#a5f3fc', em: 'gem' },
    { n: 'Cầu Vồng', hair: '#c084fc', out: '#7c3aed', eye: '#22c55e', ac: '#f9a8d4', em: 'rainbow' },
  ];
  const SKINS = ['#ffe3d1', '#fcd9b6', '#f6cfb0', '#ffe9dd'];
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
  const hairBack = (style, c) => ({
    0: shortBack(c),
    1: longBack(c),
    2: tail(c, -1) + tail(c, 1) + shortBack(c),
    3: shortBack(c) + `<path d="M72 30C98 22 102 60 88 92c-2-16-8-30-16-38z" fill="${c}" ${stroke}/>`,
    4: `<path d="M20 52L10 22l16 8 4-22 12 16 8-20 8 20 12-16 6 22 14-8-8 30z" fill="${c}" ${stroke}/>` + shortBack(c),
    5: shortBack(c) + `<circle cx="50" cy="8" r="10" fill="${c}" ${stroke}/>`,
  })[style];
  const ROLES = [
    { n: 'Công chúa', back: () => '', front: (e) => `<path d="M32 20l5-10 6 8 7-14 7 14 6-8 5 10z" fill="#fde047" ${stroke}/><circle cx="50" cy="13" r="3.2" fill="${e.ac}" ${stroke}/>`, neck: () => '' },
    { n: 'Hiệp sĩ', back: () => '', front: (e) => `<path d="M50 6c10-12 26-8 30 6-10-4-20-2-26 8z" fill="${e.ac}" ${stroke}/><path d="M22 40C20 16 36 6 50 6s30 10 28 34c-8-5-16-7-28-7s-20 2-28 7z" fill="#94a3b8" ${stroke}/><path d="M30 28q20-8 40 0" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>`, neck: () => '' },
    { n: 'Phù thủy', back: () => '', front: (e) => `<path d="M10 38q40 14 80 0l-6-8q-34 10-68 0z" fill="${e.out}" ${stroke}/><path d="M24 32q6-24 30-30 6 14 12 30z" fill="${e.out}" ${stroke}/><path d="M28 30q22 6 40 0v-5q-20 6-40 0z" fill="${e.ac}"/>`, neck: () => '' },
    { n: 'Ninja', back: () => '', front: (e) => `<path d="M22 38q28-14 56 0v9q-28-10-56 0z" fill="${e.out}" ${stroke}/><rect x="38" y="33" width="24" height="10" rx="2" fill="#cbd5e1" ${stroke}/><path d="M78 40l14 6-12 4zM78 44l12 10-14 0z" fill="${e.out}" ${stroke}/>`, neck: (e) => `<path d="M30 78q20 10 40 0v8q-20 10-40 0z" fill="${e.ac}" ${stroke}/>` },
    { n: 'Thiên thần', back: () => `<path d="M26 70C4 70-2 44 6 24c8 10 20 14 26 26zM74 70c22 0 28-26 20-46-8 10-20 14-26 26z" fill="#fff" ${stroke}/>`, front: () => `<ellipse cx="50" cy="8" rx="16" ry="5" fill="none" stroke="#fbbf24" stroke-width="4"/>`, neck: () => '' },
    { n: 'Tiểu quỷ', back: (e) => `<path d="M74 88c12 0 18-8 14-20l-4 4z" fill="none" stroke="${e.ac}" stroke-width="4" stroke-linecap="round"/>`, front: (e) => `<path d="M30 28C16 24 16 8 24 2c2 10 8 16 16 20zM70 28c14-4 14-20 6-26-2 10-8 16-16 20z" fill="#4c1d95" ${stroke}/><path d="M24 8c1 6 4 10 8 13M76 8c-1 6-4 10-8 13" stroke="${e.ac}" stroke-width="2" fill="none" stroke-linecap="round"/>`, neck: () => '', fang: true },
    { n: 'Mèo', back: (e) => `<path d="M30 30L20 4l20 14zM70 30L80 4 60 18z" fill="${e.hair}" ${stroke}/><path d="M28 24l-4-12 10 8zM72 24l4-12-10 8z" fill="#fda4af"/>`, front: () => '<path d="M12 56l14 2M12 64l14-2M88 56l-14 2M88 64l-14-2" stroke="#2d2250" stroke-width="1.6" stroke-linecap="round"/>', neck: () => '' },
    { n: 'Thỏ', back: (e) => `<ellipse cx="36" cy="20" rx="8" ry="19" fill="${e.hair}" ${stroke}/><ellipse cx="36" cy="20" rx="3.6" ry="13" fill="#fda4af"/><ellipse cx="64" cy="20" rx="8" ry="19" fill="${e.hair}" ${stroke}/><ellipse cx="64" cy="20" rx="3.6" ry="13" fill="#fda4af"/>`, front: () => '', neck: () => '' },
  ];
  ROLES.forEach((r, ri) => ELS.forEach((e, ei) => {
    const style = (ei + ri * 2 + Math.floor(ei / 2)) % 6;
    const art = `${r.back(e)}${hairBack(style, e.hair)}${body(e.out)}${emblem(e.em, e.ac)}${r.neck(e)}${face(SKINS[(ei + ri) % 4])}${bangs(e.hair)}${r.front(e)}${eyes(e.eye)}${cheeks}${r.fang ? `<path d="M44 65q6 6 12 0" fill="#fff" stroke="${L}" stroke-width="2" stroke-linejoin="round"/>` : smile}${sparkle(12 + (ei % 3) * 4, 20 + (ri % 4) * 10, 5, e.ac)}${sparkle(90, 14 + (ei % 4) * 12, 4, '#fff')}`;
    A.push({ id: `an-g${String(ri * ELS.length + ei + 1).padStart(2, '0')}`, name: `${r.n} ${e.n}`, art });
  }));

  K.ANIME_STICKERS = A.map((a) => ({
    id: a.id, name: a.name, rarity: 'mythic',
    e: `<svg viewBox="0 0 100 100" role="img" aria-label="${a.name}" xmlns="http://www.w3.org/2000/svg">${a.art}</svg>`,
  }));
  K.STICKERS.push(...K.ANIME_STICKERS);
  K.RARITY.mythic = { name: 'Anime siêu siêu hiếm 💫', weight: 0, color: '#ec4899' }; // weight 0: chỉ có trong Hộp quà Anime
})();
