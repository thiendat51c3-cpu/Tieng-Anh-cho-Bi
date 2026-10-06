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

  // Chủ đề tổng hợp: gom tất cả từ vựng
  const all = [];
  K.TOPICS.forEach((t) => t.words.forEach((x) => all.push(x)));
  K.MIX = { id: 'mix', en: 'Mix', vi: 'Thử thách tổng hợp', icon: '🎲', color: '#7c5cff', words: all };

  K.getTopic = (id) => (id === 'mix' ? K.MIX : K.TOPICS.find((t) => t.id === id));
  K.findWord = (en) => all.find((x) => x.en === en);

  K.PRAISE = ['Great job! 🎉', 'Tuyệt vời!', 'Excellent! ⭐', 'Giỏi quá!', 'Perfect! 🌟', 'Yay! 🥳', 'Đúng rồi!', 'Wow! 👏'];
  K.OOPS = ['Thử lại nhé! 💪', 'Try again!', 'Gần đúng rồi!', 'Cố lên nào!', 'Oops! 🙈'];
})();
