/* Dữ liệu từ vựng: mỗi từ = [tiếng Anh, tiếng Việt, emoji]  (màu sắc dùng mã màu thay cho emoji) */
(function () {
  const K = (window.K = window.K || {});

  const w = (en, vi, e) => ({ en, vi, e });
  const color = (en, vi, c) => ({ en, vi, c });

  K.TOPICS = [
    {
      id: 'animals', en: 'Animals', vi: 'Động vật', icon: '🐶', color: '#ff8a3d',
      words: [
        w('cat', 'con mèo', '🐱'), w('dog', 'con chó', '🐶'), w('bird', 'con chim', '🐦'),
        w('fish', 'con cá', '🐟'), w('rabbit', 'con thỏ', '🐰'), w('elephant', 'con voi', '🐘'),
        w('lion', 'sư tử', '🦁'), w('monkey', 'con khỉ', '🐵'), w('duck', 'con vịt', '🦆'),
        w('pig', 'con heo', '🐷'), w('tiger', 'con hổ', '🐯'), w('frog', 'con ếch', '🐸'),
      ],
    },
    {
      id: 'colors', en: 'Colors', vi: 'Màu sắc', icon: '🎨', color: '#ec4899',
      words: [
        color('red', 'màu đỏ', '#ef4444'), color('orange', 'màu cam', '#f97316'),
        color('yellow', 'màu vàng', '#facc15'), color('green', 'màu xanh lá', '#22c55e'),
        color('blue', 'màu xanh dương', '#3b82f6'), color('purple', 'màu tím', '#a855f7'),
        color('pink', 'màu hồng', '#f9a8d4'), color('brown', 'màu nâu', '#92400e'),
        color('black', 'màu đen', '#111827'), color('white', 'màu trắng', '#ffffff'),
      ],
    },
    {
      id: 'numbers', en: 'Numbers', vi: 'Con số', icon: '🔢', color: '#3b82f6',
      words: [
        w('one', 'số 1', '1️⃣'), w('two', 'số 2', '2️⃣'), w('three', 'số 3', '3️⃣'),
        w('four', 'số 4', '4️⃣'), w('five', 'số 5', '5️⃣'), w('six', 'số 6', '6️⃣'),
        w('seven', 'số 7', '7️⃣'), w('eight', 'số 8', '8️⃣'), w('nine', 'số 9', '9️⃣'),
        w('ten', 'số 10', '🔟'),
      ],
    },
    {
      id: 'fruits', en: 'Fruits', vi: 'Trái cây', icon: '🍎', color: '#ef4444',
      words: [
        w('apple', 'quả táo', '🍎'), w('banana', 'quả chuối', '🍌'), w('lemon', 'quả chanh', '🍋'),
        w('grapes', 'quả nho', '🍇'), w('strawberry', 'dâu tây', '🍓'), w('watermelon', 'dưa hấu', '🍉'),
        w('pineapple', 'quả dứa', '🍍'), w('cherry', 'quả anh đào', '🍒'), w('peach', 'quả đào', '🍑'),
        w('mango', 'quả xoài', '🥭'), w('coconut', 'quả dừa', '🥥'),
      ],
    },
    {
      id: 'people', en: 'People', vi: 'Gia đình & Nghề nghiệp', icon: '👨‍👩‍👧', color: '#f59e0b',
      words: [
        w('baby', 'em bé', '👶'), w('boy', 'bé trai', '👦'), w('girl', 'bé gái', '👧'),
        w('mom', 'mẹ', '👩'), w('dad', 'bố', '👨'), w('grandma', 'bà', '👵'),
        w('grandpa', 'ông', '👴'), w('teacher', 'giáo viên', '👩‍🏫'), w('doctor', 'bác sĩ', '👨‍⚕️'),
        w('king', 'nhà vua', '🤴'), w('queen', 'nữ hoàng', '👸'), w('police', 'cảnh sát', '👮'),
      ],
    },
    {
      id: 'body', en: 'Body', vi: 'Cơ thể', icon: '👀', color: '#14b8a6',
      words: [
        w('eye', 'con mắt', '👁️'), w('ear', 'cái tai', '👂'), w('nose', 'cái mũi', '👃'),
        w('mouth', 'cái miệng', '👄'), w('hand', 'bàn tay', '✋'), w('foot', 'bàn chân', '🦶'),
        w('leg', 'cái chân', '🦵'), w('arm', 'cánh tay', '💪'), w('tooth', 'cái răng', '🦷'),
        w('tongue', 'cái lưỡi', '👅'), w('brain', 'bộ não', '🧠'),
      ],
    },
    {
      id: 'food', en: 'Food', vi: 'Đồ ăn', icon: '🍔', color: '#eab308',
      words: [
        w('bread', 'bánh mì', '🍞'), w('milk', 'sữa', '🥛'), w('egg', 'quả trứng', '🥚'),
        w('rice', 'cơm', '🍚'), w('cake', 'bánh ngọt', '🍰'), w('pizza', 'bánh pizza', '🍕'),
        w('hamburger', 'bánh hamburger', '🍔'), w('cheese', 'phô mai', '🧀'), w('candy', 'kẹo', '🍬'),
        w('cookie', 'bánh quy', '🍪'), w('soup', 'món súp', '🍲'), w('noodles', 'mì', '🍜'),
      ],
    },
    {
      id: 'school', en: 'School', vi: 'Trường học', icon: '🎒', color: '#8b5cf6',
      words: [
        w('book', 'quyển sách', '📖'), w('pencil', 'bút chì', '✏️'), w('pen', 'bút mực', '🖊️'),
        w('bag', 'cái cặp', '🎒'), w('scissors', 'cái kéo', '✂️'), w('ruler', 'cái thước', '📏'),
        w('clock', 'đồng hồ', '⏰'), w('computer', 'máy tính', '💻'), w('school', 'trường học', '🏫'),
        w('music', 'âm nhạc', '🎵'), w('paint', 'vẽ tranh', '🎨'),
      ],
    },
    {
      id: 'transport', en: 'Transport', vi: 'Phương tiện', icon: '🚗', color: '#06b6d4',
      words: [
        w('car', 'ô tô', '🚗'), w('bus', 'xe buýt', '🚌'), w('bike', 'xe đạp', '🚲'),
        w('train', 'tàu hỏa', '🚆'), w('plane', 'máy bay', '✈️'), w('boat', 'con thuyền', '⛵'),
        w('ship', 'tàu thủy', '🚢'), w('truck', 'xe tải', '🚚'), w('helicopter', 'trực thăng', '🚁'),
        w('rocket', 'tên lửa', '🚀'), w('taxi', 'xe taxi', '🚕'),
      ],
    },
    {
      id: 'nature', en: 'Nature', vi: 'Thiên nhiên', icon: '🌈', color: '#22c55e',
      words: [
        w('sun', 'mặt trời', '☀️'), w('moon', 'mặt trăng', '🌙'), w('star', 'ngôi sao', '⭐'),
        w('cloud', 'đám mây', '☁️'), w('rain', 'cơn mưa', '🌧️'), w('snow', 'tuyết', '❄️'),
        w('wind', 'gió', '💨'), w('rainbow', 'cầu vồng', '🌈'), w('fire', 'ngọn lửa', '🔥'),
        w('tree', 'cái cây', '🌳'), w('flower', 'bông hoa', '🌸'), w('mountain', 'ngọn núi', '⛰️'),
      ],
    },
    {
      id: 'clothes', en: 'Clothes', vi: 'Quần áo', icon: '👕', color: '#d946ef',
      words: [
        w('shirt', 'áo sơ mi', '👕'), w('pants', 'quần dài', '👖'), w('dress', 'cái váy', '👗'),
        w('hat', 'cái mũ', '👒'), w('shoes', 'đôi giày', '👟'), w('socks', 'đôi tất', '🧦'),
        w('gloves', 'găng tay', '🧤'), w('scarf', 'khăn quàng', '🧣'), w('coat', 'áo khoác', '🧥'),
        w('glasses', 'kính mắt', '👓'), w('crown', 'vương miện', '👑'),
      ],
    },
    {
      id: 'toys', en: 'Toys', vi: 'Đồ chơi', icon: '🧸', color: '#fb7185',
      words: [
        w('ball', 'quả bóng', '⚽'), w('kite', 'con diều', '🪁'), w('teddy', 'gấu bông', '🧸'),
        w('robot', 'người máy', '🤖'), w('balloon', 'bóng bay', '🎈'), w('gift', 'món quà', '🎁'),
        w('drum', 'cái trống', '🥁'), w('guitar', 'đàn ghi-ta', '🎸'), w('piano', 'đàn piano', '🎹'),
        w('puzzle', 'trò xếp hình', '🧩'), w('dice', 'xúc xắc', '🎲'),
      ],
    },
    {
      id: 'feelings', en: 'Feelings', vi: 'Cảm xúc', icon: '😀', color: '#84cc16',
      words: [
        w('happy', 'vui vẻ', '😀'), w('sad', 'buồn', '😢'), w('angry', 'tức giận', '😠'),
        w('sleepy', 'buồn ngủ', '😴'), w('scared', 'sợ hãi', '😱'), w('surprised', 'ngạc nhiên', '😮'),
        w('cool', 'ngầu', '😎'), w('love', 'yêu thương', '😍'), w('sick', 'bị ốm', '🤒'),
        w('laugh', 'cười lớn', '😂'),
      ],
    },
  ];

  // Chủ đề "Chào hỏi" (có cụm từ nhiều chữ)
  K.TOPICS.push({
    id: 'greetings', en: 'Greetings', vi: 'Chào hỏi', icon: '👋', color: '#0ea5e9', tag: 'Mới!',
    words: [
      w('hello', 'xin chào', '👋'), w('welcome', 'chào mừng', '🤗'), w('please', 'làm ơn', '🥺'),
      w('sorry', 'xin lỗi', '🙇'), w('thank you', 'cảm ơn', '🙏'), w('yes', 'vâng, đúng rồi', '✅'),
      w('no', 'không', '❌'), w('good morning', 'chào buổi sáng', '🌅'), w('good night', 'chúc ngủ ngon', '🌃'),
      w('i love you', 'tôi yêu bạn', '🥰'), w('happy birthday', 'chúc mừng sinh nhật', '🎂'),
    ],
  });

  // Bảng chữ cái: mỗi chữ một từ khoá (dùng lại từ đã có, bổ sung các chữ còn thiếu)
  const byEn = {};
  K.TOPICS.forEach((t) => t.words.forEach((x) => (byEn[x.en] = x)));
  [
    w('ice cream', 'cây kem', '🍦'), w('juice', 'nước ép', '🧃'), w('octopus', 'con bạch tuộc', '🐙'),
    w('umbrella', 'cái ô', '☂️'), w('violin', 'đàn vi-ô-lông', '🎻'), w('xylophone', 'đàn xylophone', '🎶'),
    w('yo-yo', 'con quay yo-yo', '🪀'), w('zebra', 'ngựa vằn', '🦓'),
  ].forEach((x) => (byEn[x.en] = x));
  const ABC = [
    'apple', 'banana', 'cat', 'dog', 'elephant', 'fish', 'grapes', 'hat', 'ice cream', 'juice', 'kite', 'lion', 'monkey',
    'nose', 'octopus', 'pizza', 'queen', 'rainbow', 'sun', 'tiger', 'umbrella', 'violin', 'watermelon', 'xylophone', 'yo-yo', 'zebra',
  ].map((en) => byEn[en]);
  K.TOPICS.unshift({ id: 'abc', en: 'ABC', vi: 'Bảng chữ cái', icon: '🔤', color: '#6366f1', tag: 'Mới!', words: ABC });

  // Tên đọc của từng chữ cái (để giọng đọc không đọc sai)
  K.LETTER_NAMES = ['ay', 'bee', 'see', 'dee', 'ee', 'eff', 'gee', 'aitch', 'eye', 'jay', 'kay', 'el', 'em', 'en', 'oh', 'pee', 'cue', 'are', 'ess', 'tee', 'you', 'vee', 'double you', 'ex', 'why', 'zee'];
  K.letterOf = (x) => ((x.en.match(/[a-z]/i) || ['?'])[0]).toUpperCase();
  K.letterSpeech = (letter) => K.LETTER_NAMES[letter.charCodeAt(0) - 65] || letter;

  // Các chủ đề từ vựng vui mở rộng (ngoài chương trình). Chương trình lớp 4 nằm ở js/curriculum.js
  K.EXTRA_TOPICS = K.TOPICS.slice();
  K.EXTRA_TOPICS.forEach((t) => { t.group = 'extra'; delete t.tag; });

  // Sticker để sưu tầm (mở bằng hộp quà)
  const stk = (rarity, list) => list.split(' ').map((e) => ({ id: e, e, rarity }));
  K.STICKERS = [
    ...stk('common', '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🐤 🦆 🦉 🦄 🐝 🦋 🐌 🐞 🐢 🐙 🐠 🐬'),
    ...stk('rare', '🦖 🦕 🐳 🦈 🦜 🦒 🦔 🐲 🦚 🦢 🦞 🐊'),
    ...stk('epic', '🌈 🚀 👑 🏆 💎 🛸'),
  ];
  K.RARITY = {
    common: { name: 'Thường', weight: 70, color: '#64748b' },
    rare: { name: 'Hiếm ⭐', weight: 25, color: '#3b82f6' },
    epic: { name: 'Siêu hiếm 🌟', weight: 5, color: '#f59e0b' },
  };

  // Hình đại diện: các nhân vật tự vẽ (SVG) + emoji
  const svg = (inner) => `<svg viewBox="0 0 100 100" role="img" aria-hidden="true">${inner}</svg>`;
  const EYES = (y, dx) => `<circle cx="${50 - dx}" cy="${y}" r="4.5" fill="#2d2250"/><circle cx="${50 + dx}" cy="${y}" r="4.5" fill="#2d2250"/><circle cx="${51.4 - dx}" cy="${y - 1.6}" r="1.5" fill="#fff"/><circle cx="${51.4 + dx}" cy="${y - 1.6}" r="1.5" fill="#fff"/>`;
  K.AVATAR_SVG = {
    // Capybara đội trái quýt
    capy: svg(
      '<circle cx="25" cy="32" r="9" fill="#8f6234"/><circle cx="75" cy="32" r="9" fill="#8f6234"/>' +
      '<circle cx="25" cy="32" r="4.5" fill="#c68f5a"/><circle cx="75" cy="32" r="4.5" fill="#c68f5a"/>' +
      '<rect x="13" y="28" width="74" height="62" rx="32" fill="#b8864f"/>' +
      '<ellipse cx="50" cy="68" rx="29" ry="19" fill="#d9aa72"/>' +
      EYES(48, 17) +
      '<ellipse cx="24" cy="62" rx="6" ry="4" fill="#ff9aa2" opacity=".55"/><ellipse cx="76" cy="62" rx="6" ry="4" fill="#ff9aa2" opacity=".55"/>' +
      '<ellipse cx="42" cy="62" rx="3" ry="4" fill="#5a3b1d"/><ellipse cx="58" cy="62" rx="3" ry="4" fill="#5a3b1d"/>' +
      '<path d="M43 75 Q50 81 57 75" stroke="#5a3b1d" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="50" cy="25" r="11" fill="#ffa63d"/><path d="M51 15 q8 -8 15 -3 q-6 8 -15 3z" fill="#4cae4f"/>'
    ),
    // Kỳ nhông Mexico (axolotl)
    axolotl: svg(
      [-1, 1].map((s) => [[-28, 33], [0, 48], [28, 63]].map(([r, y]) =>
        `<ellipse cx="${50 + s * 37}" cy="${y}" rx="13" ry="4.5" fill="#ff7fa8" transform="rotate(${s * r} ${50 + s * 37} ${y})"/>`).join('')).join('') +
      '<ellipse cx="50" cy="54" rx="35" ry="31" fill="#ffc2d4"/>' +
      EYES(50, 14) +
      '<circle cx="30" cy="60" r="5.5" fill="#ff9cb8" opacity=".8"/><circle cx="70" cy="60" r="5.5" fill="#ff9cb8" opacity=".8"/>' +
      '<path d="M39 63 Q50 75 61 63" stroke="#2d2250" stroke-width="3" fill="none" stroke-linecap="round"/>'
    ),
    // Quái vật nhỏ (nhân vật gốc)
    monster: svg(
      '<path d="M32 26 L26 8" stroke="#7c5cff" stroke-width="4" stroke-linecap="round"/><circle cx="26" cy="8" r="5" fill="#ffd23f"/>' +
      '<path d="M68 26 L74 8" stroke="#7c5cff" stroke-width="4" stroke-linecap="round"/><circle cx="74" cy="8" r="5" fill="#ffd23f"/>' +
      '<circle cx="50" cy="58" r="37" fill="#a78bfa"/>' +
      '<circle cx="36" cy="50" r="10" fill="#fff"/><circle cx="64" cy="50" r="10" fill="#fff"/>' +
      '<circle cx="38" cy="51" r="5" fill="#2d2250"/><circle cx="62" cy="51" r="5" fill="#2d2250"/>' +
      '<circle cx="39.5" cy="49" r="1.7" fill="#fff"/><circle cx="63.5" cy="49" r="1.7" fill="#fff"/>' +
      '<path d="M30 68 Q50 90 70 68 Q50 76 30 68z" fill="#fff" stroke="#2d2250" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M41 72 l3 6 l3 -5 M53 73 l3 5 l3 -6" stroke="#2d2250" stroke-width="2" fill="none" stroke-linejoin="round"/>' +
      '<circle cx="22" cy="66" r="5" fill="#ff8fb3" opacity=".7"/><circle cx="78" cy="66" r="5" fill="#ff8fb3" opacity=".7"/>'
    ),
    // Gấu trúc đỏ
    redpanda: svg(
      '<circle cx="24" cy="30" r="12" fill="#d9622b"/><circle cx="76" cy="30" r="12" fill="#d9622b"/>' +
      '<circle cx="24" cy="31" r="6" fill="#fff"/><circle cx="76" cy="31" r="6" fill="#fff"/>' +
      '<ellipse cx="50" cy="56" rx="37" ry="31" fill="#e8793a"/>' +
      '<ellipse cx="28" cy="64" rx="13" ry="11" fill="#fff"/><ellipse cx="72" cy="64" rx="13" ry="11" fill="#fff"/>' +
      '<path d="M40 38 q-1 -8 -4 -10 M60 38 q1 -8 4 -10" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      EYES(50, 14) +
      '<path d="M32 56 q-3 8 0 12 M68 56 q3 8 0 12" stroke="#7a2e10" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="50" cy="68" rx="12" ry="9" fill="#fff"/><ellipse cx="50" cy="63" rx="4.5" ry="3.2" fill="#2d2250"/>' +
      '<path d="M44 72 Q50 77 56 72" stroke="#2d2250" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
    ),
  };
  K.AVATARS = ['capy', 'axolotl', 'monster', 'redpanda', '🦊', '🐼', '🐯', '🐸', '🐵', '🦄', '🐰', '🐻'];
  K.avatarHtml = (a) => K.AVATAR_SVG[a] || K.esc(a);

  // Gia đình: các hồ sơ được tạo sẵn ở lần mở app đầu tiên trên mỗi thiết bị (sửa tên/hình ở đây nếu cần)
  K.FAMILY = [
    { name: 'Bon', avatar: 'capy' },
    { name: 'Bi', avatar: 'axolotl' },
    { name: 'Bố', avatar: '🐻' },
    { name: 'Mẹ', avatar: '🦄' },
  ];
  K.isFamily = (name) => K.FAMILY.some((f) => f.name.toLowerCase() === String(name || '').trim().toLowerCase());

  // Mật khẩu khu vực người lớn (sao lưu/khôi phục). Chỉ lưu mã băm, không lưu mật khẩu dạng chữ.
  // Lưu ý: đây là web tĩnh nên chỉ để ngăn trẻ nhỏ bấm nhầm, không phải bảo mật thật sự.
  const cyrb53 = (str) => {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
  };
  K.checkPassword = (input) => cyrb53('be-vui:' + String(input).trim()) === '58de42cfc49d9df3';

  K.PRAISE = ['Great job! 🎉', 'Tuyệt vời!', 'Excellent! ⭐', 'Giỏi quá!', 'Perfect! 🌟', 'Yay! 🥳', 'Đúng rồi!', 'Wow! 👏'];
  K.OOPS = ['Thử lại nhé! 💪', 'Try again!', 'Gần đúng rồi!', 'Cố lên nào!', 'Oops! 🙈'];
})();
