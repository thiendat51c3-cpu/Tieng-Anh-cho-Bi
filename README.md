# 🦉 Bé Vui Học Tiếng Anh

Web app học tiếng Anh cơ bản cho trẻ em qua các trò chơi vui nhộn. Giao diện tiếng Việt, từ vựng tiếng Anh có phát âm.

## Tính năng

- **15 chủ đề** (~160 từ): Bảng chữ cái ABC, Động vật, Màu sắc, Con số, Trái cây, Gia đình & Nghề nghiệp, Cơ thể, Đồ ăn, Trường học, Phương tiện, Thiên nhiên, Quần áo, Đồ chơi, Cảm xúc, Chào hỏi, cùng chế độ **Thử thách tổng hợp**.
- **9 chế độ học/chơi**:
  - 📖 Học từ mới: thẻ lật, nghe phát âm, xem nghĩa tiếng Việt (chủ đề ABC hiện chữ cái và đọc tên chữ)
  - 🖼️ Đoán hình: nhìn hình, chọn từ đúng
  - 👂 Nghe & chọn: nghe từ, chọn hình đúng
  - 🔡 Chữ cái đầu: từ này bắt đầu bằng chữ gì (làm quen phonics)
  - 🎤 Nói tiếng Anh: nghe mẫu rồi nói theo, app nhận diện giọng nói (tự chuyển sang chế độ luyện tập nếu micro không dùng được)
  - 🎈 Bắn bóng bay: chạm vào bóng bay có hình đúng
  - 🔤 Xếp chữ: ghép chữ cái thành từ (chạm hoặc gõ bàn phím, có gợi ý)
  - 🃏 Lật hình: tìm cặp hình – từ giống nhau
  - ⚡ Đúng hay sai?: 30 giây, càng nhanh càng tốt
- 🎵 **Bài hát ABC**: nghe và nhìn từng chữ cái sáng lên theo giọng hát.
- **Động lực quay lại mỗi ngày**:
  - 🎯 3 nhiệm vụ mỗi ngày, hoàn thành cả 3 nhận hộp quà bí mật
  - 🎁 Hộp quà & **bộ sưu tập 48 sticker** (thường, hiếm, siêu hiếm); mở bằng xu hoặc quà miễn phí khi lên cấp
  - Sao (tối đa 3 sao mỗi trò), xu 🪙, cấp độ, 11 huy hiệu, chuỗi ngày học, sổ từ vựng
- Phát âm bằng giọng đọc của trình duyệt (Web Speech API), có chế độ đọc chậm. Âm thanh hiệu ứng tạo bằng Web Audio, không cần file.
- Lưu tiến trình trên máy (localStorage), dùng offline được (PWA), hỗ trợ điện thoại và máy tính bảng.

## Chạy thử

Không cần cài đặt hay build. Mở trực tiếp `index.html`, hoặc chạy server tĩnh:

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Đưa lên GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → chọn nhánh và thư mục `/ (root)`.
Link sẽ có dạng `https://<tên-người-dùng>.github.io/tieng-anh-tre-em/`.

## Thêm từ vựng

Sửa `js/data.js`. Mỗi từ có dạng `w('cat', 'con mèo', '🐱')` (tiếng Anh, tiếng Việt, emoji). Tên tiếng Anh của mỗi từ phải là duy nhất trong toàn bộ dữ liệu.

## Cấu trúc

```
index.html          Trang chính
css/style.css       Giao diện
js/data.js          Từ vựng, chủ đề
js/store.js         Lưu tiến trình, huy hiệu
js/audio.js         Phát âm và âm thanh hiệu ứng
js/fx.js            Pháo giấy, hiệu ứng
js/games/*.js       Các trò chơi (học từ, chọn đáp án, nói, bóng bay, xếp chữ, lật hình, đúng/sai)
js/app.js           Định tuyến, màn hình, kết quả
sw.js               Service worker (offline)
```

Lưu ý: giọng đọc phụ thuộc trình duyệt và thiết bị. Chrome, Edge và Safari có giọng tiếng Anh tốt.

Lưu ý: trò **Nói tiếng Anh** cần trình duyệt hỗ trợ nhận diện giọng nói (Chrome, Edge, Safari), cần internet và quyền dùng micro. Khi mở bằng đường dẫn `https://` (GitHub Pages), trình duyệt chỉ hỏi quyền micro một lần.
