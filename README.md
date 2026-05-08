# Infinite Agent Labs — Landing Page

The official website for **Infinite Agent Labs** — a Web3 + AI startup building centralized compute infrastructure and decentralized storage for the AI era.

🌐 **Live at**: [infiniteagentlabs.com](https://infiniteagentlabs.com)

## Tech Stack

- **Pure HTML/CSS/JS** — zero dependencies, zero build step
- **Inter** font (Google Fonts)
- **Canvas API** for particle background
- **Intersection Observer** for scroll animations

## Deployment

This is a static site deployed on **Cloudflare Pages**.

### Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. Create a project → Connect to Git or Direct Upload
3. Configuration:
   - **Build command**: _(leave empty — no build needed)_
   - **Build output directory**: `/` (root)
4. Set custom domain: `infiniteagentlabs.com`

### Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve .
```

## Project Structure

```
├── index.html          # Single-page landing
├── css/
│   └── style.css       # Design system
├── js/
│   └── main.js         # Animations & interactions
├── assets/
│   └── logo.png        # Company logo
├── _headers            # Cloudflare Pages headers
├── _redirects           # Cloudflare Pages redirects
└── legacy/             # Archived old Qwik codebase
```

## Contact

📧 **office@infiniteagentlabs.com**

© 2025 Infinite Agent Labs. Built with 🚀 in Vietnam.
