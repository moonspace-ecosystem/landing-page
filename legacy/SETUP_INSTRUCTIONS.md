# Setup Instructions

## Trạng thái hiện tại

Form "Get Early Access" hiện tại đang trong **Demo Mode** vì chưa có cấu hình Google Sheets API.

## Để kích hoạt Google Sheets integration (PRIVATE)

1. **Tạo file `.env`** trong thư mục gốc với nội dung:
```bash
VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
VITE_GOOGLE_SHEETS_NAME=Early Access Applications
VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
VITE_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
VITE_GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=your-project-id
```

2. **Làm theo hướng dẫn trong `GOOGLE_SHEETS_SETUP.md`** để:
   - Tạo Google Cloud project và Service Account
   - Tạo private key cho Service Account
   - Tạo Google Sheets PRIVATE và chia sẻ với Service Account
   - Lấy Spreadsheet ID

## Demo Mode

Khi không có cấu hình, form sẽ:
- Hiển thị thông báo "Google Sheets configuration missing"
- Thử fallback về Google Forms
- Nếu Google Forms cũng fail, sẽ show thành công (demo mode)
- Log dữ liệu form vào browser console

## Kiểm tra trạng thái

Mở Developer Tools > Console để xem:
- Trạng thái cấu hình (spreadsheetId, client_email, private_key)
- Dữ liệu form được submit
- Lỗi authentication nếu có

## Bảo mật

- **Cảnh báo:** Service account credentials sẽ được expose ra browser
- Chỉ nên dùng cho development/testing
- Cho production, nên tạo backend API endpoint

## Lưu ý

- Restart development server sau khi thay đổi `.env`
- Google Sheets phải được chia sẻ với service account email
- Private key phải có format đúng với `\n` cho line breaks