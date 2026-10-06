/* Cấu hình đồng bộ đám mây (Firebase). Để trống projectId = tắt đồng bộ.
   Cách lấy thông tin: xem file HUONG-DAN-DONG-BO.md.
   projectId và apiKey không phải bí mật (đều hiện công khai trong mọi web dùng Firebase).

   familyCode: mã gia đình cố định. Có mã này thì MỌI thiết bị mở app đều tự đồng bộ, không cần nhập gì.
   Lưu ý: file này nằm công khai trên GitHub, nên ai tìm ra repo cũng đọc được mã. Dữ liệu chỉ là sao, xu,
   sticker của cả nhà. Muốn đổi mã (nếu bị lộ): thay bằng một mã mới gồm 20 ký tự a-z (trừ i, l, o) và 2-9. */
(window.K = window.K || {}).CLOUD_CONFIG = {
  projectId: 'tienganhchobi',
  apiKey: 'AIzaSyCEGGSftk57_QorvRwMHBXZjB2GqvknGw0',
  familyCode: 'qk2hyh4rxfxhy7q499fr',
};
