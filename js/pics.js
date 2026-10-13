/* Hình minh hoạ tự vẽ (SVG) cho những từ mà emoji không diễn tả được: môn học, quốc kỳ, việc nhà...
   Tất cả là hình gốc do app tự vẽ, không lấy từ sách. Khoá là từ tiếng Anh, khung 64x64. */
(function () {
  const K = (window.K = window.K || {});
  const S = 'stroke-linecap="round" stroke-linejoin="round"';
  const star = (cx, cy, r, fill) => {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.4 : r;
      pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
  };
  const txt = (x, y, size, fill, s) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="${fill}" font-family="Arial,sans-serif">${s}</text>`;
  const frame = '<rect x="6" y="14" width="52" height="36" rx="3" fill="none" stroke="#475569" stroke-opacity=".5" stroke-width="2"/>';
  const jack = (x, y, w, h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 60 30" preserveAspectRatio="none"><rect width="60" height="30" fill="#012169"/><path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L60 30M60 0L0 30" stroke="#c8102e" stroke-width="2"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
  const stripes = (n, y0, h, c1, c2, x = 6, w = 52) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${(y0 + (h / n) * i).toFixed(1)}" width="${w}" height="${(h / n + 0.3).toFixed(1)}" fill="${i % 2 ? c2 : c1}"/>`).join('');
  const teacher = (board) => `<rect x="24" y="8" width="38" height="28" rx="3" fill="#166534" stroke="#92400e" stroke-width="3"/>${txt(43, 29, 14, '#fff', board)}<circle cx="13" cy="26" r="8" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/><path d="M2 58c0-14 5-20 11-20s11 6 11 20z" fill="#3b82f6"/><path d="M24 40l14-4" stroke="#92400e" stroke-width="3" ${S}/>`;
  const people = (x) => `<circle cx="${x}" cy="40" r="4" fill="#fcd9b6" stroke="#b45309" stroke-width="1.5"/><path d="M${x} 44v8M${x - 6} 47l6 2 6-2M${x} 52l-5 7M${x} 52l5 7" stroke="#7c3aed" stroke-width="3" fill="none" ${S}/>`;
  const logs = '<path d="M8 54L40 44M56 54L24 44" stroke="#92400e" stroke-width="6" fill="none" stroke-linecap="round"/>';
  const flame = (cx, cy, s) => `<path transform="translate(${cx} ${cy}) scale(${s})" d="M0-22C6-14 12-8 12 2a12 12 0 01-24 0c0-5 3-8 5-11 1 4 3 5 5 4-2-6 0-11 2-17z" fill="#f97316"/><path transform="translate(${cx} ${cy}) scale(${s})" d="M0-6c3 4 6 6 6 10a6 6 0 01-12 0c0-3 3-5 6-10z" fill="#fde047"/>`;
  const arrow = (dir, c) => `<circle cx="32" cy="32" r="26" fill="${c}"/><path d="M${dir < 0 ? 38 : 26} 14L${dir < 0 ? 20 : 44} 32l${dir < 0 ? 18 : -18} 18" fill="none" stroke="#fff" stroke-width="8" ${S}/>`;

  const P = {
    // ----- Môn học
    art: '<path d="M32 8C16 8 6 20 6 32c0 12 10 22 22 22 5 0 6-3 4-6-2-4 1-7 6-7h10c6 0 10-4 10-10C58 18 46 8 32 8z" fill="#fde68a" stroke="#b45309" stroke-width="3"/><circle cx="20" cy="26" r="4" fill="#ef4444"/><circle cx="32" cy="19" r="4" fill="#3b82f6"/><circle cx="45" cy="26" r="4" fill="#22c55e"/><circle cx="19" cy="40" r="4" fill="#a855f7"/>',
    English: `<path d="M8 10h48a4 4 0 014 4v26a4 4 0 01-4 4H28L16 56V44H8a4 4 0 01-4-4V14a4 4 0 014-4z" fill="#60a5fa" stroke="#1d4ed8" stroke-width="3" ${S}/>${txt(32, 35, 19, '#fff', 'ABC')}`,
    maths: `<rect x="6" y="6" width="52" height="52" rx="10" fill="#fb923c" stroke="#c2410c" stroke-width="3"/>${txt(20, 30, 26, '#fff', '+')}${txt(44, 30, 26, '#fff', '−')}${txt(20, 54, 26, '#fff', '×')}${txt(44, 54, 26, '#fff', '÷')}`,
    'history and geography': '<circle cx="32" cy="32" r="25" fill="#38bdf8" stroke="#0369a1" stroke-width="3"/><path d="M16 22c6-5 13-2 11 4s-9 5-8 11-8 2-9-4c0-4 2-8 6-11zM38 12c7 0 13 5 11 11s-7 5-8 11-9 5-9-1 3-7 3-11-2-10 3-10zM30 46c5 0 9 3 6 7s-9 3-9-1z" fill="#4ade80"/>',
    Vietnamese: `<rect x="12" y="6" width="42" height="52" rx="5" fill="#ef4444" stroke="#991b1b" stroke-width="3"/><rect x="8" y="10" width="6" height="44" rx="2" fill="#b91c1c"/>${star(34, 32, 13, '#fde047')}`,
    PE: '<circle cx="32" cy="32" r="25" fill="#fb923c" stroke="#9a3412" stroke-width="3"/><path d="M7 32h50M32 7v50M14 14c10 8 10 28 0 36M50 14c-10 8-10 28 0 36" fill="none" stroke="#9a3412" stroke-width="2.5"/>',
    IT: `<rect x="6" y="8" width="52" height="36" rx="5" fill="#334155"/><rect x="11" y="13" width="42" height="26" rx="2" fill="#7dd3fc"/>${txt(32, 33, 16, '#0c4a6e', 'IT')}<path d="M26 44h12l3 10H23z" fill="#64748b"/><rect x="16" y="54" width="32" height="4" rx="2" fill="#475569"/>`,
    science: `<path d="M24 6h16v4h-3v14l16 26c2 4 0 8-5 8H16c-5 0-7-4-5-8l16-26V10h-3z" fill="#e0f2fe" stroke="#0369a1" stroke-width="3" ${S}/><path d="M19 42h26l7 12c1 2 0 4-3 4H15c-3 0-4-2-3-4z" fill="#a78bfa"/><circle cx="28" cy="34" r="2.5" fill="#22c55e"/><circle cx="36" cy="28" r="2" fill="#22c55e"/>`,
    music: '<g fill="#8b5cf6"><ellipse cx="20" cy="46" rx="9" ry="7"/><ellipse cx="46" cy="40" rx="9" ry="7"/><path d="M27 46V14l26-6v32h-5V16l-16 4v26z"/></g>',
    'English teacher': teacher('ABC'),
    'maths teacher': teacher('1+2'),
    'school garden': '<path d="M6 18L32 4l26 14z" fill="#ef4444"/><rect x="10" y="18" width="44" height="22" fill="#fecaca" stroke="#b91c1c" stroke-width="3"/><rect x="26" y="26" width="12" height="14" fill="#7c2d12"/><g stroke="#16a34a" stroke-width="3" fill="none"><path d="M14 58V46M26 58V46M38 58V46M50 58V46"/></g><circle cx="14" cy="43" r="4" fill="#f43f5e"/><circle cx="26" cy="43" r="4" fill="#fbbf24"/><circle cx="38" cy="43" r="4" fill="#a855f7"/><circle cx="50" cy="43" r="4" fill="#f43f5e"/>',
    // ----- Việc nhà, nơi chốn, hành động
    live: '<path d="M6 30L32 8l26 22" fill="none" stroke="#b91c1c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="12" y="30" width="40" height="26" fill="#fde68a" stroke="#b45309" stroke-width="3"/><rect x="26" y="40" width="12" height="16" fill="#92400e"/><path d="M32 26c-6-6-12 0-6 5l6 5 6-5c6-5 0-11-6-5z" fill="#ef4444"/>',
    hair: '<path d="M32 6C18 6 12 18 14 34c1 10-2 16-6 20 10 2 16-2 18-8h12c2 6 8 10 18 8-4-4-7-10-6-20C52 18 46 6 32 6z" fill="#7c2d12"/><ellipse cx="32" cy="34" rx="14" ry="17" fill="#fcd9b6"/><path d="M18 30c6-2 20-8 28 0 0-10-8-18-14-18S18 20 18 30z" fill="#7c2d12"/><circle cx="26" cy="36" r="2" fill="#333"/><circle cx="38" cy="36" r="2" fill="#333"/><path d="M27 44q5 4 10 0" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>',
    'wash the clothes': '<path d="M6 34h52l-5 20a4 4 0 01-4 3H15a4 4 0 01-4-3z" fill="#60a5fa" stroke="#1d4ed8" stroke-width="3"/><path d="M20 36l-8-10 10-5 5 4 5-4 10 5-8 10z" fill="#fde047" stroke="#ca8a04" stroke-width="2"/><circle cx="14" cy="16" r="5" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/><circle cx="48" cy="12" r="6" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/><circle cx="54" cy="26" r="4" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>',
    'wash the dishes': '<circle cx="30" cy="38" r="20" fill="#fff" stroke="#94a3b8" stroke-width="3"/><circle cx="30" cy="38" r="12" fill="#e0f2fe" stroke="#94a3b8" stroke-width="2"/><circle cx="46" cy="14" r="6" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/><circle cx="14" cy="14" r="4" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/><circle cx="56" cy="30" r="4" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>',
    'swimming pool': '<path d="M18 36V14a5 5 0 0110 0M38 36V14a5 5 0 0110 0" stroke="#94a3b8" fill="none" stroke-width="4" stroke-linecap="round"/><rect x="4" y="32" width="56" height="26" rx="4" fill="#38bdf8" stroke="#0369a1" stroke-width="3"/><path d="M8 42q6-5 12 0t12 0 12 0 12 0M8 52q6-5 12 0t12 0 12 0 12 0" stroke="#fff" fill="none" stroke-width="3" stroke-linecap="round"/>',
    'water park': '<rect x="6" y="8" width="8" height="48" fill="#a16207"/><path d="M14 14c26 0 36 14 34 30" fill="none" stroke="#f97316" stroke-width="9" stroke-linecap="round"/><rect x="2" y="48" width="60" height="12" rx="5" fill="#38bdf8"/><path d="M46 44c0-6 6-6 6 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>',
    left: arrow(-1, '#3b82f6'),
    right: arrow(1, '#ef4444'),
    dong: `<rect x="4" y="16" width="56" height="32" rx="4" fill="#86efac" stroke="#15803d" stroke-width="3"/><circle cx="32" cy="32" r="10" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>${txt(32, 38, 15, '#166534', '₫')}<circle cx="12" cy="24" r="2.5" fill="#15803d"/><circle cx="52" cy="40" r="2.5" fill="#15803d"/>`,
    'roar loudly': '<circle cx="26" cy="34" r="22" fill="#f59e0b"/><circle cx="26" cy="34" r="15" fill="#fcd34d"/><circle cx="20" cy="30" r="2.5" fill="#333"/><circle cx="32" cy="30" r="2.5" fill="#333"/><path d="M22 36h8l-4 3z" fill="#7c2d12"/><ellipse cx="26" cy="46" rx="6" ry="5" fill="#7f1d1d"/><path d="M52 24q5 10 0 20M59 18q8 16 0 32" stroke="#ef4444" stroke-width="3" fill="none" stroke-linecap="round"/>',
    'build a campfire': `${logs}${flame(32, 36, 0.9)}<path d="M50 14l6 6-10 10-6-6z" fill="#92400e"/>`,
    'dance around the campfire': `${logs.replace('M8 54L40 44M56 54L24 44', 'M24 56L40 50M40 56L24 50')}${flame(32, 44, 0.8)}${people(10)}${people(54)}`,
    'tell a story': `<path d="M32 22c-8-6-20-6-26-2v34c6-4 18-4 26 2 8-6 20-6 26-2V20c-6-4-18-4-26 2z" fill="#fef3c7" stroke="#b45309" stroke-width="3" ${S}/><path d="M32 22v34" stroke="#b45309" stroke-width="3"/>${star(32, 9, 7, '#fbbf24')}${star(48, 12, 5, '#fb923c')}${star(16, 12, 5, '#fb923c')}`,
    jam: `<rect x="14" y="6" width="36" height="9" rx="3" fill="#94a3b8"/><path d="M12 17h40v33a8 8 0 01-8 8H20a8 8 0 01-8-8z" fill="#ef4444" stroke="#991b1b" stroke-width="3"/><rect x="17" y="29" width="30" height="17" rx="3" fill="#fff"/>${txt(32, 42, 12, '#991b1b', 'JAM')}`,
    // ----- Quốc kỳ (vẽ đơn giản)
    'Viet Nam': `<rect x="6" y="14" width="52" height="36" rx="3" fill="#da251d"/>${star(32, 33, 12, '#ffcd00')}`,
    Japan: `<rect x="6" y="14" width="52" height="36" rx="3" fill="#fff"/>${frame}<circle cx="32" cy="32" r="10" fill="#bc002d"/>`,
    Thailand: `<rect x="6" y="14" width="52" height="6" fill="#a51931"/><rect x="6" y="20" width="52" height="6" fill="#f4f5f8"/><rect x="6" y="26" width="52" height="12" fill="#2d2a4a"/><rect x="6" y="38" width="52" height="6" fill="#f4f5f8"/><rect x="6" y="44" width="52" height="6" fill="#a51931"/>`,
    Singapore: `<rect x="6" y="14" width="52" height="18" fill="#ed2939"/><rect x="6" y="32" width="52" height="18" fill="#fff"/>${frame}<circle cx="18" cy="23" r="7" fill="#fff"/><circle cx="21" cy="23" r="6.5" fill="#ed2939"/>${star(30, 18, 2.2, '#fff')}${star(36, 22, 2.2, '#fff')}${star(34, 28, 2.2, '#fff')}${star(26, 28, 2.2, '#fff')}${star(24, 21, 2.2, '#fff')}`,
    Malaysia: `${stripes(7, 14, 36, '#cc0001', '#fff')}<rect x="6" y="14" width="26" height="20" fill="#010066"/><circle cx="17" cy="24" r="6" fill="#fc0"/><circle cx="19" cy="24" r="5" fill="#010066"/>${star(24, 24, 3.5, '#fc0')}<rect x="6" y="50" width="0" height="0"/>`,
    America: `${stripes(7, 14, 36, '#b22234', '#fff')}<rect x="6" y="14" width="24" height="20" fill="#3c3b6e"/>${[[11, 19], [18, 19], [25, 19], [14, 24], [21, 24], [11, 29], [18, 29], [25, 29]].map(([x, y]) => star(x, y, 2.4, '#fff')).join('')}`,
    Britain: `${jack(6, 14, 52, 36)}`,
    Australia: `<rect x="6" y="14" width="52" height="36" rx="3" fill="#012169"/>${jack(6, 14, 26, 18)}${star(19, 42, 5, '#fff')}${star(44, 22, 3.5, '#fff')}${star(50, 32, 3.5, '#fff')}${star(44, 43, 3.5, '#fff')}${star(38, 32, 3.5, '#fff')}`,
  };


  /* ===== Đợt 2: lịch, đồng hồ, địa danh, vị trí, buổi trong ngày, tính từ ===== */
  const cal = (body) => `<rect x="8" y="10" width="48" height="48" rx="6" fill="#fff" stroke="#94a3b8" stroke-width="3"/><path d="M8 24V16a6 6 0 016-6h36a6 6 0 016 6v8z" fill="#ef4444"/><rect x="18" y="5" width="5" height="12" rx="2.5" fill="#475569"/><rect x="41" y="5" width="5" height="12" rx="2.5" fill="#475569"/>${body}`;
  const day = (s) => cal(txt(32, 46, 17, '#1e293b', s));
  const month = (s, n) => cal(`${txt(32, 41, 16, '#1e293b', s)}${txt(32, 54, 11, '#ef4444', n)}`);
  const clock = (h, m) => {
    const ha = ((h % 12) * 30 + m * 0.5) * Math.PI / 180, ma = m * 6 * Math.PI / 180;
    const pt = (a, r) => `${(32 + r * Math.sin(a)).toFixed(1)} ${(32 - r * Math.cos(a)).toFixed(1)}`;
    const ticks = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${pt(a, 20)}L${pt(a, 23)}" stroke="#64748b" stroke-width="2"/>`; }).join('');
    return `<circle cx="32" cy="32" r="27" fill="#fff" stroke="#3b82f6" stroke-width="4"/>${ticks}<path d="M32 32L${pt(ha, 14)}" stroke="#1e293b" stroke-width="4" ${S}/><path d="M32 32L${pt(ma, 21)}" stroke="#ef4444" stroke-width="3" ${S}/><circle cx="32" cy="32" r="2.5" fill="#1e293b"/>`;
  };
  const scene = (sky, sun, ground) => `<rect x="4" y="6" width="56" height="52" rx="8" fill="${sky}"/>${sun}<rect x="4" y="44" width="56" height="14" rx="0" fill="${ground}"/><path d="M4 50a8 8 0 008 8h40a8 8 0 008-8" fill="${ground}"/>`;
  const box = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#d97706" stroke="#92400e" stroke-width="3"/>`;
  const ball = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ef4444" stroke="#991b1b" stroke-width="3"/>`;
  const house = (x, y, c) => `<path d="M${x - 11} ${y}l11-10 11 10z" fill="#ef4444"/><rect x="${x - 9}" y="${y}" width="18" height="12" fill="${c}" stroke="#92400e" stroke-width="2"/><rect x="${x - 3}" y="${y + 4}" width="6" height="8" fill="#7c2d12"/>`;
  const kid = (x, top, bot, w, c) => { const h = bot - top, r = Math.min(7, h * 0.14 + 2); return `<circle cx="${x}" cy="${top + r}" r="${r}" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/><rect x="${x - w / 2}" y="${top + 2 * r + 1}" width="${w}" height="${h - 2 * r - 1}" rx="3" fill="${c}"/>`; };
  const vArrow = (x, y1, y2, c) => `<path d="M${x} ${y1}V${y2}M${x - 4} ${y1 + 5}L${x} ${y1}l4 5M${x - 4} ${y2 - 5}L${x} ${y2}l4-5" stroke="${c}" stroke-width="3" fill="none" ${S}/>`;

  const P2 = {
    // ----- Thứ trong tuần
    Monday: day('MON'), Tuesday: day('TUE'), Wednesday: day('WED'), Thursday: day('THU'), Friday: day('FRI'), Saturday: day('SAT'), Sunday: day('SUN'),
    weekend: cal(`${txt(32, 40, 13, '#2563eb', 'SAT')}${txt(32, 54, 13, '#2563eb', 'SUN')}`),
    yesterday: cal(`${txt(36, 47, 16, '#1e293b', '−1')}<path d="M20 38a8 8 0 0111-3M20 38l1-6M20 38l6 1" stroke="#ef4444" stroke-width="2.5" fill="none" ${S}/>`),
    // ----- Tháng
    January: month('JAN', '1'), February: month('FEB', '2'), March: month('MAR', '3'), April: month('APR', '4'), May: month('MAY', '5'), June: month('JUN', '6'),
    July: month('JUL', '7'), August: month('AUG', '8'), September: month('SEP', '9'), October: month('OCT', '10'), November: month('NOV', '11'), December: month('DEC', '12'),
    // ----- Giờ
    fifteen: clock(6, 15), thirty: clock(6, 30), 'forty-five': clock(6, 45),
    // ----- Buổi trong ngày
    morning: scene('#fde68a', '<circle cx="22" cy="44" r="13" fill="#fb923c"/>', '#86efac'),
    noon: scene('#7dd3fc', '<circle cx="32" cy="20" r="11" fill="#fde047" stroke="#f59e0b" stroke-width="3"/>', '#86efac'),
    afternoon: scene('#fdba74', '<circle cx="46" cy="32" r="10" fill="#fbbf24"/>', '#86efac'),
    evening: scene('#312e81', `<path d="M22 14a10 10 0 1012 12 8 8 0 01-12-12z" fill="#fde68a"/>${star(44, 16, 4, '#fde047')}${star(50, 30, 3, '#fde047')}${star(12, 28, 3, '#fde047')}`, '#14532d'),
    // ----- Thành phố (địa danh)
    London: '<path d="M32 4l6 10H26z" fill="#a16207"/><rect x="25" y="14" width="14" height="10" fill="#ca8a04"/><circle cx="32" cy="29" r="7" fill="#fff" stroke="#a16207" stroke-width="3"/><path d="M32 25v4l3 2" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="25" y="36" width="14" height="22" fill="#d6a85c" stroke="#a16207" stroke-width="2"/><rect x="21" y="52" width="22" height="6" fill="#a16207"/>',
    Tokyo: '<path d="M32 4v10" stroke="#ef4444" stroke-width="3"/><path d="M32 12L20 58h24z" fill="#ef4444"/><path d="M27 30h10M24 42h16M28 22h8" stroke="#fff" stroke-width="3"/><rect x="25" y="26" width="14" height="4" fill="#fff"/><path d="M32 30L22 58M32 30l10 28" stroke="#fff" stroke-width="2"/>',
    Sydney: '<rect x="2" y="50" width="60" height="10" fill="#38bdf8"/><rect x="6" y="46" width="52" height="6" fill="#cbd5e1"/><path d="M8 46C8 30 16 20 30 16c-4 10-3 22 4 30z" fill="#fff" stroke="#94a3b8" stroke-width="2"/><path d="M26 46c0-12 6-20 18-24-3 8-2 16 4 24z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/><path d="M42 46c2-8 8-12 16-12-2 6-2 8 0 12z" fill="#fff" stroke="#94a3b8" stroke-width="2"/>',
    Bangkok: '<path d="M32 4l3 14h-6z" fill="#f59e0b"/><path d="M26 18h12l8 40H18z" fill="#e7d3a7" stroke="#a16207" stroke-width="2"/><path d="M28 22h8l5 36H23z" fill="#d6b87a"/><rect x="29" y="34" width="6" height="10" rx="3" fill="#7c2d12"/><path d="M10 36l4-10 4 10zM46 36l4-10 4 10z" fill="#f59e0b"/><rect x="10" y="36" width="8" height="22" fill="#e7d3a7" stroke="#a16207" stroke-width="2"/><rect x="46" y="36" width="8" height="22" fill="#e7d3a7" stroke="#a16207" stroke-width="2"/>',
    // ----- Vị trí
    behind: `${ball(32, 24, 14)}${box(14, 30, 36, 28)}`,
    between: `${box(4, 32, 18, 26)}${box(42, 32, 18, 26)}${ball(32, 48, 9)}<path d="M24 38l-3 3 3 3M40 38l3 3-3 3" stroke="#475569" stroke-width="2" fill="none" ${S}/>`,
    near: `${box(6, 30, 24, 28)}${ball(46, 48, 9)}<path d="M33 46h5" stroke="#475569" stroke-width="2.5" stroke-dasharray="2 3"/>`,
    opposite: `<rect x="2" y="26" width="60" height="14" fill="#64748b"/><path d="M6 33h8M22 33h8M38 33h8M54 33h6" stroke="#fde047" stroke-width="2.5"/>${house(32, 14, '#fde68a')}<g transform="translate(64 66) rotate(180)">${house(32, 14, '#bfdbfe')}</g>`,
    // ----- Tính từ
    tall: `${kid(26, 6, 58, 12, '#3b82f6')}${vArrow(46, 8, 56, '#ef4444')}`,
    short: `${kid(26, 36, 58, 12, '#3b82f6')}${vArrow(46, 36, 58, '#ef4444')}<path d="M10 58h44" stroke="#94a3b8" stroke-width="2"/>`,
    slim: `${kid(32, 6, 58, 8, '#8b5cf6')}<path d="M16 34l6 0M16 34l4-3M16 34l4 3M48 34l-6 0M48 34l-4-3M48 34l-4 3" stroke="#ef4444" stroke-width="2.5" fill="none" ${S}/>`,
    big: '<circle cx="26" cy="34" r="22" fill="#60a5fa" stroke="#1d4ed8" stroke-width="3"/><circle cx="53" cy="50" r="7" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>',
    long: '<rect x="4" y="22" width="56" height="20" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="3"/><path d="M12 22v8M20 22v5M28 22v8M36 22v5M44 22v8M52 22v5" stroke="#ca8a04" stroke-width="2.5"/><path d="M6 52h52M6 48v8M58 48v8" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    round: '<circle cx="32" cy="32" r="24" fill="#34d399" stroke="#047857" stroke-width="3"/><path d="M18 26a16 16 0 0112-10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>',
    busy: '<rect x="2" y="30" width="60" height="28" fill="#64748b"/><path d="M4 44h10M20 44h10M36 44h10M52 44h8" stroke="#fde047" stroke-width="2.5"/><rect x="6" y="32" width="22" height="9" rx="3" fill="#ef4444"/><rect x="36" y="32" width="22" height="9" rx="3" fill="#3b82f6"/><rect x="14" y="47" width="22" height="9" rx="3" fill="#22c55e"/><circle cx="12" cy="18" r="4" fill="#fcd9b6"/><rect x="9" y="22" width="6" height="8" fill="#8b5cf6"/><circle cx="30" cy="16" r="4" fill="#fcd9b6"/><rect x="27" y="20" width="6" height="10" fill="#f59e0b"/><circle cx="48" cy="18" r="4" fill="#fcd9b6"/><rect x="45" y="22" width="6" height="8" fill="#ec4899"/>',
    street: `<rect x="2" y="36" width="60" height="22" fill="#64748b"/><path d="M4 47h10M20 47h10M36 47h10M52 47h8" stroke="#fde047" stroke-width="2.5"/>${house(14, 24, '#fde68a')}${house(36, 22, '#fecaca')}${house(55, 25, '#bfdbfe')}`,
    // ----- Hoạt động, đồ vật, nơi chốn khác
    'roller skate': '<path d="M12 8h18v22l22 8c4 1 6 4 6 8v4H10z" fill="#ec4899" stroke="#9d174d" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="46" width="52" height="5" rx="2" fill="#475569"/><circle cx="18" cy="56" r="5" fill="#fde047" stroke="#475569" stroke-width="2.5"/><circle cx="50" cy="56" r="5" fill="#fde047" stroke="#475569" stroke-width="2.5"/><path d="M14 18h14M14 24h14" stroke="#fff" stroke-width="2.5"/>',
    'play tug of war': `<path d="M4 38h56" stroke="#a16207" stroke-width="4"/><path d="M32 38v-8l8 4-8 4" fill="#ef4444"/><path d="M14 20l-8 4" stroke="none"/><g stroke-width="3" fill="none" ${S}><circle cx="14" cy="22" r="4" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/><path d="M16 27l6 11M14 27l-6 13M20 32l-4 6" stroke="#3b82f6"/><path d="M8 40l-3 16M16 40l5 16" stroke="#3b82f6"/><circle cx="50" cy="22" r="4" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/><path d="M48 27l-6 11M50 27l6 13M44 32l4 6" stroke="#ef4444"/><path d="M56 40l3 16M48 40l-5 16" stroke="#ef4444"/></g>`,
    'nursing home': `<path d="M6 28L32 8l26 20" fill="none" stroke="#b91c1c" stroke-width="5" ${S}/><rect x="10" y="28" width="30" height="28" fill="#fde68a" stroke="#b45309" stroke-width="3"/><rect x="21" y="42" width="8" height="14" fill="#92400e"/><circle cx="50" cy="34" r="5" fill="#fcd9b6" stroke="#b45309" stroke-width="2"/><path d="M47 30a6 5 0 0112 0z" fill="#e5e7eb"/><path d="M48 40q-3 8-1 18M52 40q4 8 2 18M44 44l-4 4" stroke="#7c3aed" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M58 46v12" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>`,
    television: `<path d="M24 8l8 8 8-8" stroke="#475569" stroke-width="3" fill="none" ${S}/><rect x="6" y="16" width="52" height="36" rx="6" fill="#334155"/><rect x="11" y="21" width="42" height="26" rx="3" fill="#7dd3fc"/>${star(32, 34, 9, '#fde047')}<rect x="20" y="52" width="24" height="5" rx="2" fill="#475569"/>`,
    thousand: `<path d="M4 18h46l10 14-10 14H4z" fill="#fde68a" stroke="#b45309" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="32" r="3" fill="#fff" stroke="#b45309" stroke-width="2"/>${txt(26, 38, 15, '#7c2d12', '1,000')}`,
    hobby: '<rect x="4" y="14" width="56" height="36" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="3"/><circle cx="18" cy="32" r="8" fill="#f97316" stroke="#9a3412" stroke-width="2.5"/><path d="M12 28q6 4 12 0M12 36q6-4 12 0" stroke="#9a3412" stroke-width="2" fill="none"/><g fill="#8b5cf6"><ellipse cx="38" cy="38" rx="4" ry="3"/><path d="M41 38V24l8-2v4l-5 1v11z"/></g><path d="M52 40l4-8" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>',
    favourite: `<path d="M32 56C10 40 4 28 8 18c4-9 18-9 24 0 6-9 20-9 24 0 4 10-2 22-24 38z" fill="#f43f5e" stroke="#be123c" stroke-width="3" stroke-linejoin="round"/>${star(32, 30, 9, '#fde047')}`,
    subject: '<rect x="8" y="40" width="48" height="14" rx="3" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2.5"/><rect x="12" y="26" width="42" height="14" rx="3" fill="#ef4444" stroke="#991b1b" stroke-width="2.5"/><rect x="6" y="12" width="44" height="14" rx="3" fill="#22c55e" stroke="#15803d" stroke-width="2.5"/><path d="M14 47h18M18 33h18M12 19h18" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>',
    den: '<path d="M2 58C2 26 14 12 32 12s30 14 30 46z" fill="#a8a29e" stroke="#57534e" stroke-width="3"/><path d="M14 58c0-18 8-26 18-26s18 8 18 26z" fill="#1c1917"/><circle cx="27" cy="46" r="3" fill="#fde047"/><circle cx="37" cy="46" r="3" fill="#fde047"/>',
    turn: '<path d="M16 54V28a10 10 0 0110-10h24" fill="none" stroke="#3b82f6" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 6l14 12-14 12z" fill="#3b82f6"/>',
    'get (to)': '<path d="M8 56c12-4 8-16 20-16s8-12 18-14" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="1 8" stroke-linecap="round"/><path d="M48 6c-8 0-12 6-12 12 0 8 12 22 12 22s12-14 12-22c0-6-4-12-12-12z" fill="#ef4444" stroke="#991b1b" stroke-width="3"/><circle cx="48" cy="18" r="4.5" fill="#fff"/>',
    story: `<path d="M32 22c-8-6-20-6-26-2v34c6-4 18-4 26 2 8-6 20-6 26-2V20c-6-4-18-4-26 2z" fill="#fef3c7" stroke="#b45309" stroke-width="3" ${S}/><path d="M32 22v34" stroke="#b45309" stroke-width="3"/>${star(32, 9, 7, '#fbbf24')}${star(48, 12, 5, '#fb923c')}${star(16, 12, 5, '#fb923c')}`,
  };
  Object.assign(P, P2);

  K.PICS = {};
  Object.keys(P).forEach((k) => (K.PICS[k] = `<svg class="art" viewBox="0 0 64 64" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${P[k]}</svg>`));
})();
