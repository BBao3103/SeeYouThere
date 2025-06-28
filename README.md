# Thiệp Mời Lễ Tốt Nghiệp 3D

Một trang web tĩnh bằng React + Vite để mô phỏng thiệp mời lễ tốt nghiệp dạng nhiều trang có thể lật với hiệu ứng 3D đẹp mắt.

## ✨ Tính năng

- **Phong bì 3D**: Giao diện khởi đầu với phong bì thư 3D có thể click để mở
- **Hiệu ứng mở phong bì**: Animation xoay 180° và mở nắp thư
- **Thiệp mời dạng sách**: Nhiều trang có thể lật với hiệu ứng flip 3D
- **Responsive design**: Hoạt động tốt trên desktop và mobile
- **Hiệu ứng particle**: Các hạt bay lơ lửng khi mở thiệp
- **Tải thiệp mời**: Nút tải file thiệp mời hoàn chỉnh

## 🎨 Thiết kế

Sử dụng bảng màu nữ tính, mềm mại:
- `#FAF9F9` - Seasalt
- `#FAFAFB` - Seasalt 2  
- `#D1CACF` - French Gray
- `#F9D6DA` - Mimi Pink
- `#7B6670` - Wenge

## 🛠️ Công nghệ sử dụng

- **React 19** - Framework chính
- **Vite** - Build tool
- **GSAP** - Animation library
- **Framer Motion** - Motion library
- **Styled Components** - CSS-in-JS

## 📱 Nội dung thiệp mời

1. **Trang 1**: Lời mời - "Thân mời bạn: Bảo Bùi đến tham dự LỄ TỐT NGHIỆP"
2. **Trang 2**: Hình ảnh nhân vật + tên - "Hà Vụng Liên"
3. **Trang 3**: Địa điểm - "Trường Đại học Sư phạm TP. Hồ Chí Minh"
4. **Trang 4**: Thời gian - "9h sáng, Thứ ba, 15/07/2025"
5. **Trang 5**: Thông tin liên hệ + icon
6. **Trang 6**: Ảnh thiệp hoàn chỉnh + nút tải

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── Envelope.jsx      # Component phong bì 3D
│   └── InvitationBook.jsx # Component thiệp mời dạng sách
├── styles/
│   └── theme.js          # Theme và bảng màu
├── App.jsx               # Component chính
└── main.jsx             # Entry point
```

## 🎯 Cách sử dụng

1. Mở trang web
2. Click vào phong bì để bắt đầu
3. Xem animation mở phong bì
4. Lật các trang thiệp mời bằng nút điều hướng
5. Tải thiệp mời hoàn chỉnh ở trang cuối

## 📱 Responsive

Dự án được thiết kế responsive và hoạt động tốt trên:
- Desktop (1024px+)
- Tablet (768px - 1023px)  
- Mobile (< 768px)

## 🎨 Customization

Để thay đổi nội dung thiệp mời, chỉnh sửa mảng `pages` trong file `InvitationBook.jsx`.

Để thay đổi màu sắc, cập nhật file `src/styles/theme.js`.
