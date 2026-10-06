# Bật đồng bộ tiến độ lên mạng (Firebase)

Làm một lần, khoảng 10 phút, **miễn phí**. Sau khi bật, mỗi lần bé chơi mà thiết bị có mạng, tiến độ (cấp độ, sao, xu, sticker...) tự lưu lên mạng. Mở app trên máy khác, nhập mã gia đình một lần là có đủ tiến độ của Bon, Bi, Bố, Mẹ.

Bạn cần một tài khoản Google.

## Phần 1. Tạo dự án Firebase

1. Mở https://console.firebase.google.com và đăng nhập Google.
2. Bấm **Create a project** (Tạo dự án). Đặt tên, ví dụ `tieng-anh-cho-bi`. Bấm **Continue**.
3. Ở bước Google Analytics: **tắt** (không cần). Bấm **Create project**, đợi xong rồi bấm **Continue**.

## Phần 2. Tạo cơ sở dữ liệu

1. Ở menu bên trái chọn **Build → Firestore Database**, bấm **Create database**.
2. Chọn vị trí (location): **asia-southeast1 (Singapore)** cho nhanh ở Việt Nam. Bấm **Next**.
3. Chọn **Start in production mode**, bấm **Create**.

## Phần 3. Dán luật bảo vệ dữ liệu

1. Trong Firestore, mở tab **Rules**.
2. Xóa hết nội dung cũ, dán đoạn sau:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /families/{familyId}/profiles/{profileId} {
      allow get: if true;
      allow create, update: if request.resource.data.keys().hasOnly(['json', 'rev'])
                            && request.resource.data.json is string
                            && request.resource.data.json.size() < 20000
                            && request.resource.data.rev is int;
      allow list, delete: if false;
    }
  }
}
```

3. Bấm **Publish**.

Luật này chỉ cho đọc và ghi đúng từng hồ sơ khi biết "mã gia đình". Không ai liệt kê hay xóa được dữ liệu, và mỗi hồ sơ bị giới hạn dung lượng.

## Phần 4. Lấy thông tin để dán vào app

1. Bấm biểu tượng bánh răng cạnh **Project Overview** → **Project settings**.
2. Kéo xuống mục **Your apps**, bấm biểu tượng web **`</>`**.
3. Đặt tên (ví dụ `web`), **không** tick Firebase Hosting, bấm **Register app**.
4. Bạn sẽ thấy đoạn `firebaseConfig`. Chỉ cần 2 giá trị: **`apiKey`** và **`projectId`**.

## Phần 5. Dán vào app

1. Trên GitHub, mở repo → thư mục `js` → file **`cloud-config.js`**.
2. Bấm biểu tượng cây bút (Edit this file).
3. Điền hai giá trị bên trong dấu nháy:

```js
(window.K = window.K || {}).CLOUD_CONFIG = {
  projectId: 'tieng-anh-cho-bi-xxxxx',
  apiKey: 'AIzaSy........',
};
```

4. Bấm **Commit changes**. Đợi 1–2 phút rồi mở lại trang (nhấn Ctrl+F5).

> `apiKey` và `projectId` không phải bí mật: mọi trang web dùng Firebase đều để lộ hai giá trị này. Bảo vệ nằm ở luật ở Phần 3 và ở **mã gia đình**.

## Phần 5b. Nhúng sẵn mã gia đình (đang dùng cho nhà mình)

Sau khi đã tạo mã gia đình ở một máy, bạn có thể dán mã đó vào `js/cloud-config.js` (dòng `familyCode`). Khi đó **mọi thiết bị mở app đều tự đồng bộ ngay**, kể cả máy mới hay trình duyệt mới, không phải nhập mã hay mở link gì cả. Các nút tạo mã, nhập mã, link kết nối sẽ tự ẩn đi.

Đánh đổi: file cấu hình nằm công khai trên GitHub nên ai tìm ra repo cũng đọc được mã. Dữ liệu chỉ là sao, xu, sticker. Nếu lo bị phá, bạn đổi `familyCode` thành một mã mới (20 ký tự chữ thường a-z trừ i, l, o và số 2-9). Dữ liệu cũ vẫn còn trên mạng dưới mã cũ, còn thiết bị sẽ đẩy dữ liệu hiện có lên mã mới ở lần mở đầu tiên. Nhớ tải file sao lưu định kỳ để có bản dự phòng.

## Phần 6. Dùng

**Máy đầu tiên** (máy bé đã chơi nhiều nhất):
1. Mở app, ở màn "Ai đang chơi nào?" bấm **Sao lưu & khôi phục**, nhập mật khẩu.
2. Bấm **✨ Tạo mã gia đình**. App tạo một mã bí mật và bắt đầu đồng bộ.

**Thêm thiết bị khác (cách dễ nhất: gửi link):**
1. Trên máy đầu tiên: **Sao lưu & khôi phục** → **🔗 Sao chép link kết nối**.
2. Gửi link đó **riêng** cho người nhà (Zalo, tin nhắn).
3. Trên máy kia chỉ cần **mở link một lần**: app tự kết nối và tải tiến độ của cả 4 người. Đường link sẽ tự gọn lại, không còn hiện mã trên thanh địa chỉ.

**Cách thủ công (nếu không gửi link được):** trên máy kia vào Sao lưu & khôi phục → nhập mật khẩu → **🔗 Nhập mã gia đình** → gõ mã (app hiện mã ngay dưới nút link).

Từ đó về sau mọi thứ tự động. Góc trên trang chủ có biểu tượng ☁️ cho biết tình trạng (✓ đã lưu, … đang lưu, ✕ chưa có mạng). Mỗi máy chỉ cần kết nối **một lần**.

## Các câu hỏi thường gặp

- **Hai máy cùng chơi một người thì sao?** App gộp lại: giữ số sao, sticker, từ đã thuộc nhiều hơn và số xu cao hơn của hai máy, nên không máy nào làm mất tiến độ của máy kia.
- **Mất mạng thì sao?** Bé vẫn chơi và lưu bình thường trên máy. Khi có mạng lại, app tự đồng bộ.
- **Lộ mã hoặc link kết nối thì sao?** Ai có mã hoặc link mới đọc/ghi được tiến độ. Hãy gửi link riêng, đừng đăng công khai. Dữ liệu chỉ gồm tên Bon/Bi/Bố/Mẹ và điểm số, không có thông tin cá nhân. Nếu lo, bấm **Ngắt kết nối** ở mọi máy rồi tạo mã mới.
- **Có tốn tiền không?** Gói miễn phí của Firebase rộng hơn nhiều so với nhu cầu của một gia đình.
- **Có thể xem hoặc xóa dữ liệu không?** Có: vào Firebase Console → Firestore Database → Data.
