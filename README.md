# 🦉 Bé Vui Học Tiếng Anh

Web app học tiếng Anh cơ bản cho trẻ em qua các trò chơi vui nhộn. Giao diện tiếng Việt, từ vựng tiếng Anh có phát âm.

## Tính năng

**Bám sát sách *Tiếng Anh 4 – Global Success* (Kết nối tri thức với cuộc sống)**
- Tập 1 và Tập 2: **Starter + 20 unit** + 4 bài **Ôn tập** (Review 1–4) + **Thử thách tổng hợp** (~200 từ, ~210 câu mẫu).
- Mỗi unit gồm: từ vựng theo Wordlist của sách (có nghĩa tiếng Việt), **mẫu câu cần nhớ** theo Book map, **câu mẫu** có bản dịch, và phần **âm cần nhớ / trọng âm**.
- Từ có hình minh hoạ dễ hiểu thì hiện emoji; từ trừu tượng (because, behind, tháng, quốc gia...) hiện **nghĩa tiếng Việt** thay cho hình.
- Chủ đề **Mở rộng** (động vật, màu sắc, trái cây, bảng chữ cái ABC có bài hát...) để chơi thêm.

**10 trò chơi + học từ**
- 📖 Học từ mới (thẻ lật) · 🖼️ Đoán hình · 👂 Nghe & chọn · 🔡 Chữ cái đầu
- 💬 **Hiểu câu** (nghe câu, chọn nghĩa) · 🧩 **Sắp xếp câu** (xếp các từ thành câu đúng)
- 🎤 Nói tiếng Anh (nhận diện giọng nói) · 🎈 Bắn bóng bay · 🔤 Xếp chữ · 🃏 Lật hình · ⚡ Đúng hay sai?

**Hồ sơ gia đình**
- 4 người chơi cố định: **Bon, Bi, Bố, Mẹ**. Mỗi lần mở app chọn "Ai đang chơi nào?", chạm vào tên là vào chơi. Mỗi người có sao, xu, sticker, nhiệm vụ riêng; chỉ được đổi hình đại diện.
- **Sao lưu & khôi phục** bằng file, cần mật khẩu người lớn (xem bên dưới).

**Động lực quay lại mỗi ngày**
- 🎯 3 nhiệm vụ mỗi ngày, hộp quà và **bộ sưu tập 48 sticker**, sao (tối đa 3 sao mỗi trò), xu 🪙, cấp độ, 11 huy hiệu, chuỗi ngày học, sổ từ vựng.
- Phát âm bằng giọng đọc của trình duyệt (Web Speech API), có chế độ đọc chậm. Âm thanh hiệu ứng tạo bằng Web Audio.
- Lưu tiến trình trên máy (localStorage), dùng offline được (PWA), hỗ trợ điện thoại và máy tính bảng.

**Về nội dung:** app chỉ dùng danh sách từ vựng và mẫu câu trong Book map / Wordlist của sách. Câu ví dụ, bản dịch và hình minh hoạ do app tự soạn; app không chép nội dung bài học, hình ảnh hay âm thanh của sách. Phụ huynh nên đối chiếu với bài học trên lớp của bé.

## Chạy thử

Không cần cài đặt hay build. Mở trực tiếp `index.html`, hoặc chạy server tĩnh:

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Đưa lên GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → chọn nhánh và thư mục `/ (root)`.
Link sẽ có dạng `https://<tên-người-dùng>.github.io/tieng-anh-tre-em/`.

## Thêm hoặc sửa nội dung

- **Chương trình lớp 4:** sửa `js/curriculum.js`. Mỗi từ có dạng `W('hello', 'xin chào', '👋')` (để trống emoji nếu muốn hiện nghĩa tiếng Việt thay hình); mỗi unit có `structures` (mẫu câu), `sentences` (câu mẫu `[tiếng Anh, tiếng Việt]`) và `phonics`.
- **Chủ đề mở rộng:** sửa `js/data.js`.
- **Danh sách người chơi:** `K.FAMILY` trong `js/data.js`.
- **Mật khẩu sao lưu:** app chỉ lưu mã băm trong `js/data.js` (`K.checkPassword`). Vì là web tĩnh nên mật khẩu chỉ để ngăn trẻ nhỏ bấm nhầm, không phải bảo mật thật sự.

## Cấu trúc

```
index.html          Trang chính
css/style.css       Giao diện
js/curriculum.js    Chương trình Tiếng Anh 4 (từ vựng, mẫu câu, câu mẫu từng unit)
js/data.js          Chủ đề mở rộng, sticker, hình đại diện, hồ sơ gia đình
js/store.js         Hồ sơ người chơi, lưu tiến trình, sao lưu, huy hiệu
js/audio.js         Phát âm và âm thanh hiệu ứng
js/fx.js            Pháo giấy, hiệu ứng
js/games/*.js       Các trò chơi (học từ, chọn đáp án, câu, nói, bóng bay, xếp chữ, lật hình, đúng/sai)
js/app.js           Định tuyến, màn hình, kết quả
sw.js               Service worker (offline)
```

Lưu ý: giọng đọc phụ thuộc trình duyệt và thiết bị. Chrome, Edge và Safari có giọng tiếng Anh tốt.

Lưu ý: trò **Nói tiếng Anh** cần trình duyệt hỗ trợ nhận diện giọng nói (Chrome, Edge, Safari), cần internet và quyền dùng micro. Khi mở bằng đường dẫn `https://` (GitHub Pages), trình duyệt chỉ hỏi quyền micro một lần.
