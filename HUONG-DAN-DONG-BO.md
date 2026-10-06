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

## Phần 6. Dùng

**Máy đầu tiên** (máy bé đã chơi nhiều nhất):
1. Mở app, chọn bất kỳ người chơi, ở màn "Ai đang chơi nào?" bấm **Sao lưu & khôi phục**, nhập mật khẩu.
2. Bấm **✨ Tạo mã gia đình**. App hiện mã dạng `ABCD-EFGH-JKMN-PQRS-TUVW`. Chép mã này lại và giữ riêng tư.

**Các máy khác:**
1. Mở app → **Sao lưu & khôi phục** → nhập mật khẩu → **🔗 Nhập mã gia đình** → gõ mã → **Kết nối**.
2. Tiến độ của cả 4 người sẽ được tải về và gộp với dữ liệu sẵn có trên máy.

Từ đó về sau mọi thứ tự động. Góc trên trang chủ có biểu tượng ☁️ cho biết tình trạng (✓ đã lưu, … đang lưu, ✕ chưa có mạng).

## Các câu hỏi thường gặp

- **Hai máy cùng chơi một người thì sao?** App gộp lại: giữ số sao, sticker, từ đã thuộc nhiều hơn và số xu cao hơn của hai máy, nên không máy nào làm mất tiến độ của máy kia.
- **Mất mạng thì sao?** Bé vẫn chơi và lưu bình thường trên máy. Khi có mạng lại, app tự đồng bộ.
- **Lộ mã gia đình thì sao?** Ai có mã mới đọc/ghi được tiến độ. Dữ liệu chỉ gồm tên Bon/Bi/Bố/Mẹ và điểm số, không có thông tin cá nhân. Nếu lo, bấm **Ngắt kết nối** ở mọi máy rồi tạo mã mới.
- **Có tốn tiền không?** Gói miễn phí của Firebase rộng hơn nhiều so với nhu cầu của một gia đình.
- **Có thể xem hoặc xóa dữ liệu không?** Có: vào Firebase Console → Firestore Database → Data.
