/* Chương trình Tiếng Anh 4 (Global Success, Kết nối tri thức với cuộc sống): Starter + 20 unit.
   Từ vựng và mẫu câu theo "Book map" của sách; câu ví dụ và bản dịch do app tự soạn.
   Từ không có hình minh hoạ rõ ràng sẽ hiển thị nghĩa tiếng Việt thay cho hình (xem K.visual). */
(function () {
  const K = (window.K = window.K || {});

  const W = (en, vi, e) => (e ? { en, vi, e } : { en, vi });

  // [tiếng Anh, tiếng Việt]
  const U = [
    {
      id: 'start', unit: 'Starter', book: 1, en: 'Starter', vi: 'Ôn tập đầu năm', icon: '👋', color: '#0ea5e9',
      theme: 'Em và những người bạn',
      words: [
        W('friend', 'bạn bè', '👫'), W('hobby', 'sở thích'), W('come in', 'vào, đi vào', '🚪'), W('sit down', 'ngồi xuống', '🪑'),
        W('stand up', 'đứng lên', '🧍'), W('open your books', 'mở sách ra', '📖'), W('read aloud', 'đọc to', '🗣️'),
        W('say goodbye', 'chào tạm biệt', '👋'), W('jump', 'nhảy', '🤸'), W('kick', 'đá', '⚽'), W('cycle', 'đạp xe', '🚴'), W('swim', 'bơi', '🏊'),
      ],
      structures: [['Hello. How are you?', "I'm fine, thank you."], ['This is …', 'Nice to see you.'], ['What are they doing?', "They're swimming."]],
      sentences: [
        ['Hello. How are you?', 'Xin chào. Bạn khỏe không?'], ["I'm fine, thank you.", 'Mình khỏe, cảm ơn bạn.'],
        ['This is Mary.', 'Đây là Mary.'], ['Nice to see you.', 'Rất vui được gặp bạn.'],
        ['Come in, please.', 'Mời bạn vào.'], ['Sit down, please.', 'Mời bạn ngồi xuống.'],
        ['Open your books, please.', 'Hãy mở sách ra.'], ['Stand up, please.', 'Hãy đứng lên.'],
        ['What are they doing?', 'Họ đang làm gì vậy?'], ["They're swimming.", 'Họ đang bơi.'],
      ],
      phonics: [],
    },
    {
      id: 'u1', unit: 'Unit 1', book: 1, en: 'My friends', vi: 'Những người bạn của em', icon: '🌏', color: '#3b82f6',
      theme: 'Em và những người bạn',
      words: [
        W('America', 'nước Mỹ'), W('Australia', 'nước Úc'), W('Britain', 'nước Anh'), W('Japan', 'nước Nhật Bản'),
        W('Malaysia', 'nước Ma-lai-xi-a'), W('Singapore', 'nước Xin-ga-po'), W('Thailand', 'nước Thái Lan'), W('Viet Nam', 'nước Việt Nam'),
      ],
      structures: [['Where are you from?', "I'm from …"], ["Where's he / she from?", "He's / She's from …"]],
      sentences: [
        ['Where are you from?', 'Bạn đến từ đâu?'], ["I'm from Viet Nam.", 'Mình đến từ Việt Nam.'], ["I'm from Japan.", 'Mình đến từ Nhật Bản.'],
        ["Where's he from?", 'Bạn nam ấy đến từ đâu?'], ["He's from Australia.", 'Bạn ấy đến từ nước Úc.'], ["He's from America.", 'Bạn ấy đến từ nước Mỹ.'],
        ["Where's she from?", 'Bạn nữ ấy đến từ đâu?'], ["She's from Thailand.", 'Bạn ấy đến từ Thái Lan.'], ["She's from Malaysia.", 'Bạn ấy đến từ Ma-lai-xi-a.'],
        ["I'm from Singapore.", 'Mình đến từ Xin-ga-po.'], ["He's from Britain.", 'Bạn ấy đến từ nước Anh.'],
      ],
      phonics: ['America', 'Australia'],
    },
    {
      id: 'u2', unit: 'Unit 2', book: 1, en: 'Time and daily routines', vi: 'Thời gian và thói quen hằng ngày', icon: '⏰', color: '#06b6d4',
      theme: 'Em và những người bạn',
      words: [
        W('o\'clock', 'giờ (đúng)', '🕒'), W('at', 'lúc'), W('fifteen', 'số 15'), W('thirty', 'số 30'), W('forty-five', 'số 45'),
        W('get up', 'thức dậy', '⏰'), W('go to bed', 'đi ngủ', '🛌'), W('go to school', 'đi học', '🏫'), W('have breakfast', 'ăn sáng', '🥞'),
      ],
      structures: [['What time is it?', "It's …"], ['What time do you …?', 'I … at …']],
      sentences: [
        ['What time is it?', 'Mấy giờ rồi?'], ["It's seven fifteen.", 'Bây giờ là bảy giờ mười lăm.'], ["It's nine o'clock.", 'Bây giờ là chín giờ đúng.'],
        ["It's six thirty.", 'Bây giờ là sáu giờ ba mươi.'], ["It's eight forty-five.", 'Bây giờ là tám giờ bốn mươi lăm.'],
        ['What time do you get up?', 'Bạn thức dậy lúc mấy giờ?'], ['I get up at six thirty.', 'Mình thức dậy lúc sáu giờ ba mươi.'],
        ['What time do you have breakfast?', 'Bạn ăn sáng lúc mấy giờ?'], ['I have breakfast at six forty-five.', 'Mình ăn sáng lúc sáu giờ bốn mươi lăm.'],
        ['What time do you go to school?', 'Bạn đi học lúc mấy giờ?'], ['I go to school at seven fifteen.', 'Mình đi học lúc bảy giờ mười lăm.'],
        ['What time do you go to bed?', 'Bạn đi ngủ lúc mấy giờ?'], ["I go to bed at nine o'clock.", 'Mình đi ngủ lúc chín giờ đúng.'],
      ],
      phonics: ['get', 'bed'],
    },
    {
      id: 'u3', unit: 'Unit 3', book: 1, en: 'My week', vi: 'Một tuần của em', icon: '📅', color: '#8b5cf6',
      theme: 'Em và những người bạn',
      words: [
        W('Monday', 'thứ Hai'), W('Tuesday', 'thứ Ba'), W('Wednesday', 'thứ Tư'), W('Thursday', 'thứ Năm'), W('Friday', 'thứ Sáu'),
        W('Saturday', 'thứ Bảy'), W('Sunday', 'Chủ nhật'), W('do housework', 'làm việc nhà', '🧺'), W('listen to music', 'nghe nhạc', '🎧'),
        W('study at school', 'học ở trường', '✏️'),
      ],
      structures: [['What day is it today?', "It's …"], ['What do you do on …?', 'I …']],
      sentences: [
        ['What day is it today?', 'Hôm nay là thứ mấy?'], ["It's Monday.", 'Hôm nay là thứ Hai.'], ["It's Friday.", 'Hôm nay là thứ Sáu.'], ["It's Sunday.", 'Hôm nay là Chủ nhật.'],
        ['What do you do on Saturdays?', 'Vào các ngày thứ Bảy bạn làm gì?'], ['I do housework.', 'Mình làm việc nhà.'],
        ['What do you do on Sundays?', 'Vào các ngày Chủ nhật bạn làm gì?'], ['I listen to music.', 'Mình nghe nhạc.'],
        ['What do you do on Tuesdays?', 'Vào các ngày thứ Ba bạn làm gì?'], ['I study at school.', 'Mình học ở trường.'],
      ],
      phonics: ['music', 'Sunday'],
    },
    {
      id: 'u4', unit: 'Unit 4', book: 1, en: 'My birthday party', vi: 'Tiệc sinh nhật của em', icon: '🎂', color: '#ec4899',
      theme: 'Em và những người bạn',
      words: [
        W('January', 'tháng Một'), W('February', 'tháng Hai'), W('March', 'tháng Ba'), W('April', 'tháng Tư'),
        W('birthday', 'ngày sinh nhật', '🎂'), W('party', 'buổi tiệc', '🎉'), W('chips', 'khoai tây rán', '🍟'), W('grapes', 'quả nho', '🍇'),
        W('jam', 'mứt'), W('juice', 'nước ép', '🧃'), W('lemonade', 'nước chanh', '🍋'), W('water', 'nước', '💧'),
      ],
      structures: [["When's your birthday?", "It's in …"], ['What do you want to eat / drink?', 'I want …']],
      sentences: [
        ["When's your birthday?", 'Sinh nhật của bạn là khi nào?'], ["It's in March.", 'Vào tháng Ba.'], ["It's in January.", 'Vào tháng Một.'], ["It's in April.", 'Vào tháng Tư.'],
        ['What do you want to eat?', 'Bạn muốn ăn gì?'], ['I want some chips.', 'Mình muốn ăn khoai tây rán.'], ['I want some grapes.', 'Mình muốn ăn nho.'],
        ['What do you want to drink?', 'Bạn muốn uống gì?'], ['I want some lemonade.', 'Mình muốn uống nước chanh.'], ['I want some water.', 'Mình muốn uống nước lọc.'],
      ],
      phonics: ['jam', 'water'],
    },
    {
      id: 'u5', unit: 'Unit 5', book: 1, en: 'Things we can do', vi: 'Những việc chúng ta có thể làm', icon: '🎸', color: '#f59e0b',
      theme: 'Em và những người bạn',
      words: [
        W('can', 'có thể, biết (làm gì)'), W('cook', 'nấu ăn', '👨‍🍳'), W('draw', 'vẽ', '🎨'), W('play the guitar', 'chơi đàn ghi-ta', '🎸'),
        W('play the piano', 'chơi đàn pi-a-nô', '🎹'), W('ride a bike', 'đạp xe', '🚲'), W('ride a horse', 'cưỡi ngựa', '🐴'),
        W('roller skate', 'trượt pa-tanh'), W('swim', 'bơi', '🏊'), W('but', 'nhưng'),
      ],
      structures: [['Can you …?', "Yes, I can. / No, I can't."], ['Can he / she …?', "Yes, he / she can. / No, he / she can't, but he / she can …"]],
      sentences: [
        ['Can you cook?', 'Bạn biết nấu ăn không?'], ['Yes, I can.', 'Có, mình biết.'], ["No, I can't.", 'Không, mình không biết.'],
        ['Can you ride a bike?', 'Bạn biết đạp xe không?'], ['Can he play the guitar?', 'Bạn ấy biết chơi đàn ghi-ta không?'], ['Yes, he can.', 'Có, bạn ấy biết.'],
        ['Can she swim?', 'Bạn ấy biết bơi không?'], ["No, she can't, but she can draw.", 'Không, bạn ấy không biết bơi, nhưng bạn ấy biết vẽ.'],
        ['Can you play the piano?', 'Bạn biết chơi đàn pi-a-nô không?'], ['I can ride a horse.', 'Mình biết cưỡi ngựa.'],
      ],
      phonics: ['yes', 'no'],
    },
    {
      id: 'u6', unit: 'Unit 6', book: 1, en: 'Our school facilities', vi: 'Cơ sở vật chất của trường', icon: '🏫', color: '#10b981',
      theme: 'Em và trường học',
      words: [
        W('city', 'thành phố', '🏙️'), W('town', 'thị trấn', '🏘️'), W('village', 'ngôi làng', '🏡'), W('mountains', 'những dãy núi', '⛰️'),
        W('building', 'toà nhà', '🏢'), W('computer room', 'phòng máy tính', '💻'), W('garden', 'vườn', '🌷'), W('playground', 'sân chơi', '🎠'),
        W('school garden', 'vườn trường'),
      ],
      structures: [["Where's your school?", "It's in the …"], ['How many … are there at your school?', 'There is / are …']],
      sentences: [
        ["Where's your school?", 'Trường của bạn ở đâu?'], ["It's in the city.", 'Nó ở trong thành phố.'], ["It's in the mountains.", 'Nó ở trên vùng núi.'], ["It's in a village.", 'Nó ở trong một ngôi làng.'],
        ['How many buildings are there at your school?', 'Trường bạn có bao nhiêu toà nhà?'], ['There are two buildings.', 'Có hai toà nhà.'],
        ['There is a computer room.', 'Có một phòng máy tính.'], ['There is a big playground.', 'Có một sân chơi lớn.'],
        ['There are two gardens.', 'Có hai khu vườn.'], ["It's in the town.", 'Nó ở trong thị trấn.'],
      ],
      phonics: ['mountains', 'villages'],
    },
    {
      id: 'u7', unit: 'Unit 7', book: 1, en: 'Our timetables', vi: 'Thời khoá biểu của chúng em', icon: '📚', color: '#6366f1',
      theme: 'Em và trường học',
      words: [
        W('subject', 'môn học'), W('art', 'môn Mĩ thuật'), W('English', 'môn Tiếng Anh'), W('history and geography', 'môn Lịch sử và Địa lí'),
        W('maths', 'môn Toán'), W('music', 'môn Âm nhạc'), W('science', 'môn Khoa học'), W('Vietnamese', 'môn Tiếng Việt'),
      ],
      structures: [['What subjects do you have today?', 'I have …'], ['When do you have …?', 'I have it on …']],
      sentences: [
        ['What subjects do you have today?', 'Hôm nay bạn có những môn học nào?'], ['I have maths and English.', 'Mình có môn Toán và môn Tiếng Anh.'],
        ['I have Vietnamese and science.', 'Mình có môn Tiếng Việt và môn Khoa học.'], ['When do you have music?', 'Khi nào bạn có môn Âm nhạc?'],
        ['I have it on Tuesdays.', 'Mình có môn đó vào các ngày thứ Ba.'], ['When do you have science?', 'Khi nào bạn có môn Khoa học?'],
        ['I have it on Thursdays.', 'Mình có môn đó vào các ngày thứ Năm.'], ['I have art on Mondays.', 'Mình có môn Mĩ thuật vào các ngày thứ Hai.'],
        ['When do you have history and geography?', 'Khi nào bạn có môn Lịch sử và Địa lí?'], ['I have it on Fridays.', 'Mình có môn đó vào các ngày thứ Sáu.'],
      ],
      phonics: ['Vietnamese', 'science'],
    },
    {
      id: 'u8', unit: 'Unit 8', book: 1, en: 'My favourite subjects', vi: 'Môn học yêu thích của em', icon: '⭐', color: '#f97316',
      theme: 'Em và trường học',
      words: [
        W('favourite', 'yêu thích'), W('IT', 'môn Tin học'), W('PE', 'môn Thể dục'), W('English teacher', 'giáo viên Tiếng Anh'),
        W('maths teacher', 'giáo viên Toán'), W('painter', 'hoạ sĩ', '🧑‍🎨'), W('because', 'bởi vì'), W('why', 'tại sao'),
      ],
      structures: [["What's your favourite subject?", "It's …"], ['Why do you like …?', 'Because I want to be …']],
      sentences: [
        ["What's your favourite subject?", 'Môn học yêu thích của bạn là gì?'], ["It's English.", 'Đó là môn Tiếng Anh.'], ["It's PE.", 'Đó là môn Thể dục.'], ["It's IT.", 'Đó là môn Tin học.'],
        ['Why do you like art?', 'Tại sao bạn thích môn Mĩ thuật?'], ['Because I want to be a painter.', 'Vì mình muốn trở thành hoạ sĩ.'],
        ['Why do you like English?', 'Tại sao bạn thích môn Tiếng Anh?'], ['Because I want to be an English teacher.', 'Vì mình muốn trở thành giáo viên Tiếng Anh.'],
        ['Why do you like maths?', 'Tại sao bạn thích môn Toán?'], ['Because I want to be a maths teacher.', 'Vì mình muốn trở thành giáo viên Toán.'],
      ],
      phonics: ['like', 'write'],
    },
    {
      id: 'u9', unit: 'Unit 9', book: 1, en: 'Our sports day', vi: 'Ngày hội thể thao của chúng em', icon: '🏅', color: '#ef4444',
      theme: 'Em và trường học',
      words: [
        W('sports day', 'ngày hội thể thao', '🏅'), W('May', 'tháng Năm'), W('June', 'tháng Sáu'), W('July', 'tháng Bảy'), W('August', 'tháng Tám'),
        W('September', 'tháng Chín'), W('October', 'tháng Mười'), W('November', 'tháng Mười Một'), W('December', 'tháng Mười Hai'),
      ],
      structures: [['Is your sports day in …?', "Yes, it is. / No, it isn't. It's in …"], ["When's your sports day?", "It's in …"]],
      sentences: [
        ['Is your sports day in May?', 'Ngày hội thể thao của bạn có vào tháng Năm không?'], ['Yes, it is.', 'Có, đúng vậy.'], ["No, it isn't. It's in June.", 'Không. Nó vào tháng Sáu.'],
        ["When's your sports day?", 'Ngày hội thể thao của bạn là khi nào?'], ["It's in October.", 'Nó vào tháng Mười.'], ["It's in December.", 'Nó vào tháng Mười Hai.'],
        ['Is your sports day in November?', 'Ngày hội thể thao của bạn có vào tháng Mười Một không?'], ["No, it isn't. It's in September.", 'Không. Nó vào tháng Chín.'],
        ["It's in July.", 'Nó vào tháng Bảy.'], ["It's in August.", 'Nó vào tháng Tám.'],
      ],
      phonics: ['February', 'July'],
    },
    {
      id: 'u10', unit: 'Unit 10', book: 1, en: 'Our summer holidays', vi: 'Kỳ nghỉ hè của chúng em', icon: '🏖️', color: '#14b8a6',
      theme: 'Em và trường học',
      words: [
        W('beach', 'bãi biển', '🏖️'), W('campsite', 'địa điểm cắm trại', '🏞️'), W('countryside', 'nông thôn, vùng quê', '🌾'),
        W('Bangkok', 'Băng Cốc (Thái Lan)'), W('London', 'Luân Đôn (Anh)'), W('Sydney', 'Xít-ni (Úc)'), W('Tokyo', 'Tô-ki-ô (Nhật Bản)'),
        W('weekend', 'ngày cuối tuần'), W('last', 'trước, vừa rồi'), W('yesterday', 'hôm qua'),
      ],
      structures: [['Were you … last weekend?', "Yes, I was. / No, I wasn't."], ['Where were you last summer?', 'I was in …']],
      sentences: [
        ['Were you at the beach last weekend?', 'Cuối tuần trước bạn có ở bãi biển không?'], ['Yes, I was.', 'Có, mình có ở đó.'], ["No, I wasn't.", 'Không, mình không ở đó.'],
        ['Where were you last summer?', 'Mùa hè năm ngoái bạn ở đâu?'], ['I was in Tokyo.', 'Mình ở Tô-ki-ô.'], ['I was in London.', 'Mình ở Luân Đôn.'],
        ['I was in Sydney.', 'Mình ở Xít-ni.'], ['I was in Bangkok.', 'Mình ở Băng Cốc.'], ['I was in the countryside.', 'Mình ở vùng quê.'], ['I was at the campsite.', 'Mình ở khu cắm trại.'],
      ],
      phonics: ['were', 'where'],
    },
    {
      id: 'u11', unit: 'Unit 11', book: 2, en: 'My home', vi: 'Nhà của em', icon: '🏠', color: '#ec4899',
      theme: 'Em và gia đình',
      words: [
        W('road', 'con đường', '🛣️'), W('street', 'phố, đường phố'), W('live', 'sống'), W('big', 'to, lớn'), W('busy', 'bận rộn, nhộn nhịp'),
        W('noisy', 'ồn ào', '🔊'), W('quiet', 'yên tĩnh', '🤫'), W('in', 'trong, ở'), W('at', 'ở, tại'),
      ],
      structures: [['Where do you live?', 'I live …'], ["What's the … like?", "It's …"]],
      sentences: [
        ['Where do you live?', 'Bạn sống ở đâu?'], ['I live in Nguyen Hue Street.', 'Mình sống ở phố Nguyễn Huệ.'], ['I live at 25 Le Loi Road.', 'Mình sống ở số 25 đường Lê Lợi.'],
        ["What's your street like?", 'Phố của bạn như thế nào?'], ["It's quiet.", 'Nó yên tĩnh.'], ["It's big and busy.", 'Nó rộng và nhộn nhịp.'],
        ["What's your road like?", 'Con đường của bạn như thế nào?'], ["It's noisy.", 'Nó ồn ào.'], ['I live in a quiet street.', 'Mình sống ở một con phố yên tĩnh.'],
      ],
      phonics: ['big', 'street'],
    },
    {
      id: 'u12', unit: 'Unit 12', book: 2, en: 'Jobs', vi: 'Nghề nghiệp', icon: '👩‍⚕️', color: '#f43f5e',
      theme: 'Em và gia đình',
      words: [
        W('actor', 'diễn viên', '🎭'), W('farmer', 'nông dân', '👨‍🌾'), W('nurse', 'y tá', '👩‍⚕️'), W('office worker', 'nhân viên văn phòng', '👨‍💼'),
        W('policeman', 'cảnh sát', '👮'), W('factory', 'nhà máy', '🏭'), W('farm', 'trang trại', '🚜'), W('hospital', 'bệnh viện', '🏥'),
        W('nursing home', 'viện dưỡng lão'),
      ],
      structures: [['What does he / she do?', "He's / She's …"], ['Where does he / she work?', 'He / She works …']],
      sentences: [
        ['What does he do?', 'Ông ấy làm nghề gì?'], ["He's a farmer.", 'Ông ấy là nông dân.'], ["He's an actor.", 'Ông ấy là diễn viên.'], ["He's a policeman.", 'Ông ấy là cảnh sát.'],
        ['What does she do?', 'Bà ấy làm nghề gì?'], ["She's a nurse.", 'Bà ấy là y tá.'], ["She's an office worker.", 'Bà ấy là nhân viên văn phòng.'],
        ['Where does she work?', 'Bà ấy làm việc ở đâu?'], ['She works in a hospital.', 'Bà ấy làm việc ở bệnh viện.'], ['He works on a farm.', 'Ông ấy làm việc ở trang trại.'], ['He works in a factory.', 'Ông ấy làm việc ở nhà máy.'],
      ],
      phonics: ['farmer', 'nurse'],
    },
    {
      id: 'u13', unit: 'Unit 13', book: 2, en: 'Appearance', vi: 'Ngoại hình', icon: '🧑', color: '#a855f7',
      theme: 'Em và gia đình',
      words: [
        W('tall', 'cao'), W('short', 'thấp, ngắn'), W('slim', 'mảnh mai'), W('big', 'to, lớn'), W('eyes', 'đôi mắt', '👀'), W('face', 'khuôn mặt', '🙂'),
        W('hair', 'tóc'), W('long', 'dài'), W('round', 'tròn'),
      ],
      structures: [['What does he / she look like?', "He's / She's …"], ['…', 'He / She has …']],
      sentences: [
        ['What does he look like?', 'Bạn ấy trông như thế nào?'], ["He's tall and slim.", 'Bạn ấy cao và mảnh mai.'], ["He's short.", 'Bạn ấy thấp.'],
        ['What does she look like?', 'Bạn nữ ấy trông như thế nào?'], ["She's tall.", 'Bạn ấy cao.'], ['She has long hair.', 'Bạn ấy có mái tóc dài.'],
        ['He has a round face.', 'Bạn ấy có khuôn mặt tròn.'], ['He has big eyes.', 'Bạn ấy có đôi mắt to.'], ['She has short hair.', 'Bạn ấy có mái tóc ngắn.'],
      ],
      phonics: ['long', 'round'],
    },
    {
      id: 'u14', unit: 'Unit 14', book: 2, en: 'Daily activities', vi: 'Hoạt động hằng ngày', icon: '🧹', color: '#0ea5e9',
      theme: 'Em và gia đình',
      words: [
        W('in the morning', 'vào buổi sáng', '🌅'), W('at noon', 'vào buổi trưa', '🌞'), W('in the afternoon', 'vào buổi chiều', '🌤️'),
        W('in the evening', 'vào buổi tối', '🌆'), W('watch TV', 'xem ti vi', '📺'), W('clean the floor', 'lau sàn nhà', '🧹'),
        W('help with the cooking', 'giúp nấu ăn', '🍳'), W('wash the clothes', 'giặt quần áo'), W('wash the dishes', 'rửa bát đĩa'),
        W('morning', 'buổi sáng'), W('noon', 'buổi trưa'), W('afternoon', 'buổi chiều'), W('evening', 'buổi tối'),
      ],
      structures: [['When do you watch TV?', 'I watch TV …'], ['What do you do in the morning?', 'I …']],
      sentences: [
        ['When do you watch TV?', 'Bạn xem ti vi khi nào?'], ['I watch TV in the evening.', 'Mình xem ti vi vào buổi tối.'],
        ['What do you do in the morning?', 'Buổi sáng bạn làm gì?'], ['I help with the cooking.', 'Mình giúp nấu ăn.'],
        ['What do you do in the afternoon?', 'Buổi chiều bạn làm gì?'], ['I wash the clothes.', 'Mình giặt quần áo.'],
        ['I wash the dishes in the evening.', 'Buổi tối mình rửa bát đĩa.'], ['I clean the floor at noon.', 'Buổi trưa mình lau sàn nhà.'],
        ['What do you do at noon?', 'Buổi trưa bạn làm gì?'],
      ],
      phonics: ['watch', 'wash'],
    },
    {
      id: 'u15', unit: 'Unit 15', book: 2, en: "My family's weekends", vi: 'Cuối tuần của gia đình em', icon: '🎬', color: '#f59e0b',
      theme: 'Em và gia đình',
      words: [
        W('cinema', 'rạp chiếu phim', '🎬'), W('shopping centre', 'trung tâm mua sắm', '🛍️'), W('sports centre', 'trung tâm thể thao', '🏟️'),
        W('swimming pool', 'bể bơi'), W('cook meals', 'nấu các bữa ăn', '🍲'), W('do yoga', 'tập yoga', '🧘'), W('play tennis', 'chơi quần vợt', '🎾'),
        W('watch films', 'xem phim', '🍿'), W('film', 'bộ phim', '🎞️'), W('television', 'ti vi, truyền hình'),
      ],
      structures: [['Where does he / she go on Saturdays?', "He / She goes to the …"], ['What does he / she do on Sundays?', 'He / She …']],
      sentences: [
        ['Where does she go on Saturdays?', 'Vào các ngày thứ Bảy bạn ấy đi đâu?'], ['She goes to the cinema.', 'Bạn ấy đi đến rạp chiếu phim.'],
        ['Where does he go on Sundays?', 'Vào các ngày Chủ nhật bạn ấy đi đâu?'], ['He goes to the sports centre.', 'Bạn ấy đi đến trung tâm thể thao.'],
        ['What does she do on Sundays?', 'Vào các ngày Chủ nhật bạn ấy làm gì?'], ['She does yoga.', 'Bạn ấy tập yoga.'],
        ['He plays tennis.', 'Bạn ấy chơi quần vợt.'], ['She cooks meals.', 'Bạn ấy nấu các bữa ăn.'], ['He watches films.', 'Bạn ấy xem phim.'],
        ['She goes to the swimming pool.', 'Bạn ấy đi đến bể bơi.'], ['He goes to the shopping centre.', 'Bạn ấy đi đến trung tâm mua sắm.'],
      ],
      phonics: ['go', 'television'],
    },
    {
      id: 'u16', unit: 'Unit 16', book: 2, en: 'Weather', vi: 'Thời tiết', icon: '⛅', color: '#22c55e',
      theme: 'Em và thế giới xung quanh', phonicsTitle: 'Trọng âm',
      words: [
        W('weather', 'thời tiết', '⛅'), W('sunny', 'có nắng', '☀️'), W('rainy', 'có mưa', '🌧️'), W('cloudy', 'có mây', '☁️'), W('windy', 'có gió', '💨'),
        W('bakery', 'hiệu bánh mì', '🥖'), W('bookshop', 'hiệu sách', '📚'), W('food stall', 'quầy hàng thực phẩm', '🍜'), W('water park', 'công viên nước'),
      ],
      structures: [['What was the weather like last weekend?', 'It was …'], ['Do you want to go to the …?', "Great! Let's go. / Sorry, I can't."]],
      sentences: [
        ['What was the weather like last weekend?', 'Cuối tuần trước thời tiết như thế nào?'], ['It was sunny.', 'Trời có nắng.'], ['It was rainy.', 'Trời có mưa.'], ['It was windy and cloudy.', 'Trời có gió và có mây.'],
        ['Do you want to go to the bakery?', 'Bạn có muốn đến hiệu bánh mì không?'], ["Great! Let's go.", 'Tuyệt! Đi thôi.'], ["Sorry, I can't.", 'Xin lỗi, mình không đi được.'],
        ['Do you want to go to the water park?', 'Bạn có muốn đến công viên nước không?'], ['Do you want to go to the bookshop?', 'Bạn có muốn đến hiệu sách không?'],
      ],
      phonics: ['sunny', 'rainy'],
    },
    {
      id: 'u17', unit: 'Unit 17', book: 2, en: 'In the city', vi: 'Trong thành phố', icon: '🚦', color: '#06b6d4',
      theme: 'Em và thế giới xung quanh', phonicsTitle: 'Trọng âm',
      words: [
        W('road sign', 'biển chỉ đường', '🚸'), W('stop', 'dừng lại', '🛑'), W('go straight', 'đi thẳng', '⬆️'), W('turn left', 'rẽ trái', '⬅️'),
        W('turn right', 'rẽ phải', '➡️'), W('turn round', 'quay lại', '🔄'), W('left', 'bên trái'), W('right', 'bên phải'),
        W('turn', 'rẽ, quay'), W('get (to)', 'đến (địa điểm)'),
      ],
      structures: [['What does it say?', "It says '…'."], ['How can I get to the …?', 'Go straight / Turn left / Turn right …']],
      sentences: [
        ['What does it say?', 'Biển báo này viết gì?'], ["It says 'Stop'.", "Nó viết 'Dừng lại'."], ["It says 'Turn left'.", "Nó viết 'Rẽ trái'."],
        ['How can I get to the cinema?', 'Làm thế nào để tôi đến rạp chiếu phim?'], ['Go straight.', 'Hãy đi thẳng.'], ['Turn left.', 'Hãy rẽ trái.'], ['Turn right.', 'Hãy rẽ phải.'],
        ['Turn round.', 'Hãy quay lại.'], ['Go straight and turn right.', 'Hãy đi thẳng rồi rẽ phải.'],
      ],
      phonics: ['bookshop', 'campsite'],
    },
    {
      id: 'u18', unit: 'Unit 18', book: 2, en: 'At the shopping centre', vi: 'Ở trung tâm mua sắm', icon: '🛍️', color: '#d946ef',
      theme: 'Em và thế giới xung quanh', phonicsTitle: 'Trọng âm',
      words: [
        W('behind', 'đằng sau'), W('between', 'ở giữa'), W('near', 'ở gần'), W('opposite', 'đối diện'), W('gift shop', 'cửa hàng quà tặng', '🎁'),
        W('skirt', 'váy', '👗'), W('T-shirt', 'áo thun', '👕'), W('dong', 'đồng (tiền Việt Nam)'), W('thousand', 'nghìn'), W('supermarket', 'siêu thị', '🛒'),
      ],
      structures: [["Where's the bookshop?", "It's …"], ['How much is the …?', "It's …"]],
      sentences: [
        ["Where's the bookshop?", 'Hiệu sách ở đâu?'], ["It's near the gift shop.", 'Nó ở gần cửa hàng quà tặng.'], ["It's behind the supermarket.", 'Nó ở đằng sau siêu thị.'],
        ["It's between the bakery and the bookshop.", 'Nó ở giữa hiệu bánh mì và hiệu sách.'], ["It's opposite the cinema.", 'Nó ở đối diện rạp chiếu phim.'],
        ['How much is the skirt?', 'Cái váy giá bao nhiêu?'], ["It's eighty thousand dong.", 'Nó giá tám mươi nghìn đồng.'],
        ['How much is the T-shirt?', 'Cái áo thun giá bao nhiêu?'], ["It's fifty thousand dong.", 'Nó giá năm mươi nghìn đồng.'],
      ],
      phonics: ['behind', 'between'],
    },
    {
      id: 'u19', unit: 'Unit 19', book: 2, en: 'The animal world', vi: 'Thế giới động vật', icon: '🦒', color: '#84cc16',
      theme: 'Em và thế giới xung quanh', phonicsTitle: 'Trọng âm',
      words: [
        W('crocodile', 'cá sấu', '🐊'), W('giraffe', 'hươu cao cổ', '🦒'), W('hippo', 'hà mã', '🦛'), W('lion', 'sư tử', '🦁'), W('dance beautifully', 'nhảy múa đẹp đẽ', '💃'),
        W('roar loudly', 'gầm to'), W('run quickly', 'chạy nhanh', '🏃'), W('sing merrily', 'hát vui vẻ', '🎤'), W('burrow', 'hang (cầy, thỏ)', '🕳️'), W('den', 'hang, ổ (sư tử)'),
      ],
      structures: [['What are these animals?', "They're …"], ['Why do you like …?', 'Because they …']],
      sentences: [
        ['What are these animals?', 'Những con vật này là gì?'], ["They're lions.", 'Chúng là những con sư tử.'], ["They're giraffes.", 'Chúng là những con hươu cao cổ.'],
        ["They're crocodiles.", 'Chúng là những con cá sấu.'], ["They're hippos.", 'Chúng là những con hà mã.'],
        ['Why do you like lions?', 'Tại sao bạn thích sư tử?'], ['Because they roar loudly.', 'Vì chúng gầm rất to.'], ['Because they run quickly.', 'Vì chúng chạy rất nhanh.'],
        ['Because they sing merrily.', 'Vì chúng hát rất vui vẻ.'], ['Because they dance beautifully.', 'Vì chúng nhảy múa rất đẹp.'],
      ],
      phonics: ['loudly', 'quickly'],
    },
    {
      id: 'u20', unit: 'Unit 20', book: 2, en: 'At summer camp', vi: 'Ở trại hè', icon: '🏕️', color: '#f97316',
      theme: 'Em và thế giới xung quanh', phonicsTitle: 'Trọng âm',
      words: [
        W('campfire', 'lửa trại', '🔥'), W('tent', 'lều, trại', '⛺'), W('photo', 'bức ảnh', '📷'), W('story', 'câu chuyện'), W('build a campfire', 'đốt lửa trại'),
        W('dance around the campfire', 'nhảy múa quanh lửa trại'), W('play card games', 'chơi bài', '🃏'), W('play tug of war', 'chơi kéo co'),
        W('put up a tent', 'dựng lều', '🏕️'), W('sing songs', 'hát các bài hát', '🎶'), W('take a photo', 'chụp ảnh', '📸'), W('tell a story', 'kể chuyện'),
      ],
      structures: [["What's he / she doing?", "He's / She's …"], ['What are they doing?', "They're …"]],
      sentences: [
        ["What's he doing?", 'Bạn ấy đang làm gì?'], ["He's building a campfire.", 'Bạn ấy đang đốt lửa trại.'], ["He's telling a story.", 'Bạn ấy đang kể chuyện.'],
        ["What's she doing?", 'Bạn nữ ấy đang làm gì?'], ["She's taking a photo.", 'Bạn ấy đang chụp ảnh.'],
        ['What are they doing?', 'Họ đang làm gì?'], ["They're singing songs.", 'Họ đang hát.'], ["They're playing tug of war.", 'Họ đang chơi kéo co.'],
        ["They're putting up a tent.", 'Họ đang dựng lều.'], ["They're dancing around the campfire.", 'Họ đang nhảy múa quanh lửa trại.'], ["They're playing card games.", 'Họ đang chơi bài.'],
      ],
      phonics: ['visit', 'email'],
    },
  ];

  /* ----- Chuẩn hoá: mỗi câu là { en, vi } ----- */
  U.forEach((t) => {
    t.group = t.book === 1 ? 'book1' : 'book2';
    t.sentences = t.sentences.map(([en, vi]) => ({ en, vi }));
  });

  /* ----- Bài ôn tập (Review 1-4) và thử thách tổng hợp ----- */
  const uniq = (list, key) => {
    const seen = new Set();
    return list.filter((x) => (seen.has(x[key]) ? false : seen.add(x[key])));
  };
  const merge = (units) => ({
    words: uniq(units.flatMap((u) => u.words), 'en'),
    sentences: uniq(units.flatMap((u) => u.sentences), 'en'),
  });
  const byId = (ids) => U.filter((u) => ids.includes(u.id));

  const REVIEWS = [
    { id: 'r1', unit: 'Review 1', book: 1, ids: ['start', 'u1', 'u2', 'u3', 'u4', 'u5'], vi: 'Ôn tập Unit 1–5', en: 'Review 1', icon: '🔁', color: '#2563eb' },
    { id: 'r2', unit: 'Review 2', book: 1, ids: ['u6', 'u7', 'u8', 'u9', 'u10'], vi: 'Ôn tập Unit 6–10', en: 'Review 2', icon: '🔁', color: '#7c3aed' },
    { id: 'r3', unit: 'Review 3', book: 2, ids: ['u11', 'u12', 'u13', 'u14', 'u15'], vi: 'Ôn tập Unit 11–15', en: 'Review 3', icon: '🔁', color: '#db2777' },
    { id: 'r4', unit: 'Review 4', book: 2, ids: ['u16', 'u17', 'u18', 'u19', 'u20'], vi: 'Ôn tập Unit 16–20', en: 'Review 4', icon: '🔁', color: '#059669' },
  ].map((r) => ({ ...r, ...merge(byId(r.ids)), theme: byId(r.ids)[0].theme, group: r.book === 1 ? 'book1' : 'book2', review: true, structures: [], phonics: [] }));

  K.UNITS = U;
  K.REVIEWS = REVIEWS;
  K.MIX = {
    id: 'mix', unit: 'Tất cả', en: 'All units', vi: 'Thử thách tổng hợp lớp 4', icon: '🎲', color: '#7c5cff', group: 'mix', structures: [], phonics: [],
    ...merge(U),
  };

  // Danh sách chủ đề: chương trình lớp 4 trước, từ vựng mở rộng sau
  K.TOPICS = [...U, ...REVIEWS, ...K.EXTRA_TOPICS];
  K.getTopic = (id) => (id === 'mix' ? K.MIX : K.TOPICS.find((t) => t.id === id));

  // Tra cứu từ theo tiếng Anh (chương trình lớp 4 ưu tiên trước)
  const index = new Map();
  [...U.flatMap((u) => u.words), ...K.EXTRA_TOPICS.flatMap((t) => t.words)].forEach((w) => { if (!index.has(w.en)) index.set(w.en, w); });
  K.findWord = (en) => index.get(en);
})();
