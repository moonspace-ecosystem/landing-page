# Google Sheets API Setup Guide

## Hướng dẫn cấu hình Google Sheets API để form ghi dữ liệu trực tiếp vào Google Sheets PRIVATE

### 1. Tạo Google Cloud Project và Service Account

1. Đi tới [Google Cloud Console](https://console.cloud.google.com)
2. Tạo project mới hoặc chọn project đã có
3. Bật Google Sheets API:
   - Đi tới "APIs & Services" > "Library"
   - Tìm "Google Sheets API" và enable nó

### 2. Tạo Service Account

1. Đi tới "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Nhập tên service account (ví dụ: `moonspace-sheets-api`)
4. Không cần grant roles, nhấn "Done"

### 3. Tạo Private Key cho Service Account

1. Click vào service account vừa tạo
2. Đi tới tab "Keys"
3. Click "Add Key" > "Create New Key"
4. Chọn "JSON" và download file
5. Lưu file này an toàn (không commit vào git)

### 4. Tạo Google Sheets và chia sẻ với Service Account

1. Tạo một Google Sheets mới (PRIVATE)
2. Đặt tên sheet là "Early Access Applications"
3. Chia sẻ sheet với service account email:
   - Click "Share" ở góc trên bên phải
   - Paste email của service account (có dạng: `name@project-id.iam.gserviceaccount.com`)
   - Chọn "Editor" permission
   - Nhấn "Share"

### 5. Lấy Spreadsheet ID

Từ URL của Google Sheets:
`https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

Copy phần `[SPREADSHEET_ID]`

### 6. Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc của project:

```bash
# Google Sheets API Configuration (Vite Environment Variables)
VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
VITE_GOOGLE_SHEETS_NAME=Early Access Applications
VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
VITE_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
VITE_GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=your-project-id
```

**Lưu ý:** 
- Với Vite, environment variables phải có prefix `VITE_` để được expose ra browser
- Private key phải được format với `\n` cho line breaks
- **Cảnh báo bảo mật:** Vì các biến này sẽ được expose ra browser, không nên sử dụng cho production. Nên tạo một backend API endpoint để xử lý việc ghi dữ liệu thay vì expose service account credentials.

### 7. Cấu trúc Spreadsheet

Sheet sẽ có các cột sau:
- Timestamp
- Email
- Company
- Role
- Primary Interest
- Investment Interest
- Transaction Hash
- Donation Amount
- Screenshot File

### 8. Fallback Mechanism

Nếu Google Sheets API không hoạt động, hệ thống sẽ tự động fallback về Google Forms.

### 9. Testing

1. Điền form trên website
2. Kiểm tra xem dữ liệu có xuất hiện trong Google Sheets không
3. Kiểm tra console logs nếu có lỗi

### Security Notes

- Không bao giờ commit file `.env` vào git
- Private key phải được giữ bí mật
- Service account chỉ nên có quyền truy cập vào sheet cần thiết