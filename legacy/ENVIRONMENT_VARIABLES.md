# Environment Variables Configuration

This document describes all the environment variables used in the Moonspace project. All configuration values have been moved to environment variables to make the application more flexible and secure.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your specific configuration.

## Environment Variables

### Google Sheets API Configuration

These variables configure the Google Sheets integration for form submissions:

- **`VITE_GOOGLE_SHEETS_SPREADSHEET_ID`**: The ID of your Google Sheets spreadsheet
- **`VITE_GOOGLE_SHEETS_NAME`**: The name of the sheet tab (e.g., "Sheet1", "Early Access Applications")
- **`VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL`**: Service account email from Google Cloud Console
- **`VITE_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`**: Private key for the service account (include the full PEM format with quotes)
- **`VITE_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID`**: Private key ID from the service account
- **`VITE_GOOGLE_SERVICE_ACCOUNT_CLIENT_ID`**: Client ID from the service account
- **`VITE_GOOGLE_SERVICE_ACCOUNT_PROJECT_ID`**: Google Cloud project ID

### Business Configuration

These variables control the branding and business information displayed on the website:

- **`VITE_COMPANY_NAME`**: Your company name (default: "Moonspace")
- **`VITE_COMPANY_TAGLINE`**: Your company tagline (default: "Financial Intelligence Platform")
- **`VITE_FUNDING_TARGET`**: Target funding amount (default: "$100,000")
- **`VITE_CURRENT_FUNDING`**: Current funding amount (default: "$33,000")
- **`VITE_SUPPORT_EMAIL`**: Support email address (default: "hello@moonspace.io")
- **`VITE_COMPANY_LOCATION`**: Company location (default: "Vietnam")

### Crypto Wallet Configuration

These variables configure cryptocurrency donation functionality:

- **`VITE_SOLANA_WALLET_ADDRESS`**: Solana wallet address for USDC/USDT donations

### Server Configuration

- **`PORT`**: Port number for the development server (default: 3000)

### Image Processing Configuration

These variables control image compression and processing settings:

- **`VITE_IMAGE_MAX_SIZE`**: Maximum image dimension in pixels (default: 800)
- **`VITE_IMAGE_QUALITY`**: JPEG compression quality (0.0-1.0, default: 0.7)
- **`VITE_COPY_FEEDBACK_TIMEOUT`**: Duration in milliseconds for copy button feedback animation (default: 2000)

## Security Notes

1. **Never commit `.env` to version control** - it contains sensitive information like private keys
2. **Keep `.env.example` updated** with new variables (but without sensitive values)
3. **Use VITE_ prefix** for client-side environment variables in Vite
4. **Server-only variables** (like `PORT`) don't need the VITE_ prefix

## Usage in Code

### Client-side components (Vite environment variables):
```typescript
const companyName = import.meta.env.VITE_COMPANY_NAME;
```

### Server-side code (Node.js environment variables):
```typescript
const port = process.env.PORT || 3000;
```

## Default Values

All environment variables have sensible defaults defined in the code, so the application will work even if some variables are not set. However, for production use, you should set all relevant variables.

## Google Sheets Setup

For Google Sheets integration to work, you need to:

1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create a service account
4. Download the service account key JSON
5. Extract the required values and add them to your `.env` file
6. Share your Google Sheet with the service account email

See `GOOGLE_SHEETS_SETUP.md` for detailed instructions.