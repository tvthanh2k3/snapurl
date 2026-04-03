# SnapURL - Ứng dụng Rút gọn Link & Thống kê cơ bản

## Tổng quan dự án (Project overview)
SnapURL là một ứng dụng web full-stack hỗ trợ người dùng rút gọn các đường dẫn URL dài và theo dõi các chỉ số thống kê cơ bản như lượt click, hệ điều hành/trình duyệt (User-Agent), và vị trí địa lý (thông qua IP). API được thiết kế tối ưu với tốc độ phản hồi nhanh chóng và UI thân thiện.

## Các tính năng (Features implemented)
- **Rút gọn URL**: Chuyển đổi mã URL dài thành một đường dẫn ngắn gọn.
- **Chuyển hướng (Redirect)**: Điều hướng cực nhanh từ link rút gọn về trang web gốc.
- **Thống kê lượt truy cập (Analytics)**: Ghi nhận tự động lượt click, thời gian, IP và thông tin trình duyệt.
- **Bảo vệ hệ thống**: Ứng dụng giới hạn số lượng request (Rate Limiting) để chống lạm dụng API.
- **Bộ nhớ đệm (Caching)**: Tối ưu hiệu năng đọc dữ liệu khi có nhiều lượt chuyển hướng với Memory Cache.

## Công nghệ sử dụng (Tech stack)
- **Frontend**: React 19, Vite, React Router DOM, Vanilla CSS.
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: PostgreSQL kết hợp với Prisma ORM.
- **Thư viện khác**: `zod` (Xác thực dữ liệu chặt chẽ), `nanoid` (Tạo short code độc nhất), `node-cache` (Caching truy vấn), và `express-rate-limit`.

## Kiến trúc hệ thống (Architecture overview)
Dự án được triển khai với mô hình 3 lớp (3-tier) linh hoạt:
1. **Frontend (Client Layer)**: Xây dựng dưới dạng Single Page Application (SPA), giao tiếp với máy chủ thông qua REST API.
2. **Backend (Application Layer)**: Cấu trúc theo mẫu Controller-Service-Repository chuẩn. API xử lý endpoint, kiểm tra dữ liệu với `zod`, và sử dụng Cache để giảm tải cho DB. Quá trình lưu thống kê lượt Click được chạy bất đồng bộ nhằm giúp người dùng chuyển hướng nhanh nhất.
3. **Database (Data Layer)**: Lưu trữ dữ liệu với PostgreSQL và thao tác qua Prisma ORM.

## Thiết kế API (API design)
- `POST /api/links`
  - **Body**: `{ "originalUrl": "https://example.com" }`
  - **Mô tả**: Tạo một link rút gọn mới.
- `GET /api/links/:shortCode/analytics`
  - **Mô tả**: Lấy lịch sử click và thống kê tương ứng với `shortCode` cung cấp.
- `GET /:shortCode`
  - **Mô tả**: Truy cập bằng shortCode sẽ tự động chuyển hướng HTTP 302 về URL gốc, đồng thời ngầm lưu log truy cập.

## Mô hình dữ liệu (Data model)
Gồm 2 bảng chính quản lý bằng Prisma (PostgreSQL):
- **Link**:
  - `id` (UUID, Khóa chính)
  - `originalUrl` (String) - URL gốc
  - `shortCode` (String, Unique) - Mã link rút gọn
  - `createdAt` (DateTime) - Ngày tạo
  - `clicks` (Int) - Tổng số lượt click
- **Click**:
  - `id` (UUID, Khóa chính)
  - `linkId` (String, Khóa ngoại chiếu tới bảng Link)
  - `ipAddress` (String?)
  - `userAgent` (String?)
  - `country` (String?)
  - `clickedAt` (DateTime) - Thời gian click

## Hướng dẫn chạy dự án (How to run)

**Yêu cầu**: Cài sẵn Node.js (v18+) và PostgreSQL.

**1. Khởi chạy Backend**
```bash
cd backend
npm install

# Tạo file .env và cấu hình DATABASE_URL
# Ví dụ: DATABASE_URL="postgresql://postgres:password@localhost:5432/snapurl"
# Chú thích: postgres: Username / password: [PASSWORD] / localhost: host / 5432: Port / snapurl: Database name

npx prisma db push --accept-data-loss
npx prisma generate
npm run dev
# Server backend chạy tại http://localhost:3000
```

**2. Khởi chạy Frontend**
```bash
cd frontend
npm install

npm run dev
# Mở trình duyệt truy cập: http://localhost:5173
```
