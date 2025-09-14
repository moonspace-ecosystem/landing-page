import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync, existsSync, createReadStream } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface QwikCityApp {
  router: (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
  notFound: (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
}

// Load environment variables
try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf8');
  const lines = envContent.split('\n');

  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  console.error('Error loading .env file:', error);
}

// Import the Qwik City app
const { router, notFound }: QwikCityApp = await import('./server/entry.preview.js');

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  console.log(`${req.method} ${req.url}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle static files first
  if (req.url?.startsWith('/build/') ||
      req.url?.startsWith('/assets/') ||
      req.url === '/manifest.json' ||
      req.url === '/favicon.ico' ||
      req.url === '/service-worker.js') {
    try {
      const filePath = join(__dirname, 'dist', req.url);

      if (existsSync(filePath)) {
        const ext = req.url.split('.').pop();
        const contentTypeMap: Record<string, string> = {
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'gif': 'image/gif',
          'svg': 'image/svg+xml',
          'ico': 'image/x-icon',
          'woff': 'font/woff',
          'woff2': 'font/woff2',
          'ttf': 'font/ttf',
          'eot': 'application/vnd.ms-fontobject'
        };
        const contentType = contentTypeMap[ext || ''] || 'text/plain';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for assets

        const stream = createReadStream(filePath);
        stream.pipe(res);
        return;
      }
    } catch (error) {
      console.error('Error serving static file:', error);
    }

    // File not found
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  // Use Qwik City router for all other requests
  router(req, res, () => {
    notFound(req, res, () => {
      res.writeHead(404);
      res.end('Not Found');
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Form submissions will be sent to Google Sheets`);
  console.log(`🔗 Open http://localhost:${PORT} in your browser`);
});