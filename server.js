const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const COMPRESSIBLE_EXTS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg']);

// In-memory cache for ultra-fast zero-disk-latency responses
const memoryCache = new Map();

function getCachedFile(filePath, ext) {
  if (!fs.existsSync(filePath)) return null;
  const mtimeMs = fs.statSync(filePath).mtimeMs;
  if (memoryCache.has(filePath)) {
    const cached = memoryCache.get(filePath);
    if (cached.mtimeMs === mtimeMs) return cached;
  }
  const rawBuffer = fs.readFileSync(filePath);
  let gzippedBuffer = null;
  if (COMPRESSIBLE_EXTS.has(ext)) {
    try {
      gzippedBuffer = zlib.gzipSync(rawBuffer, { level: 6 });
    } catch (e) {
      gzippedBuffer = null;
    }
  }
  const entry = { raw: rawBuffer, gzip: gzippedBuffer, mtimeMs };
  memoryCache.set(filePath, entry);
  return entry;
}

function readJsonFile(filename) {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return null;
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canGzip = acceptEncoding.includes('gzip');

  // CORS and base headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Routes
  if (pathname.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // GET /api/categories
    if (pathname === '/api/categories' && req.method === 'GET') {
      const categories = readJsonFile('categories.json');
      const body = JSON.stringify(categories);
      sendJson(res, body, canGzip);
      return;
    }

    // GET /api/products
    if (pathname === '/api/products' && req.method === 'GET') {
      const products = readJsonFile('products.json');
      let data = products ? products.data : [];
      if (parsedUrl.query.visible === 'true') {
        data = data.filter(p => p.visible === true);
      }
      const body = JSON.stringify({ success: true, data });
      sendJson(res, body, canGzip);
      return;
    }

    // GET /api/products/slug/:slug
    if (pathname.startsWith('/api/products/slug/') && req.method === 'GET') {
      const slug = pathname.replace('/api/products/slug/', '');
      const productsData = readJsonFile('products.json');
      const product = productsData?.data?.find(p => p.slug === slug);
      if (product) {
        sendJson(res, JSON.stringify({ success: true, data: product }), canGzip);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Produto não encontrado' }));
      }
      return;
    }

    // Tracking / Presence mocks
    if (pathname.startsWith('/api/tracking/') || pathname.startsWith('/api/presence/')) {
      sendJson(res, JSON.stringify({ success: true }), canGzip);
      return;
    }

    sendJson(res, JSON.stringify({ success: true, message: 'API mock ok' }), canGzip);
    return;
  }

  // Static file handling
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Clean URLs support (.html extension fallback)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  let ext = path.extname(filePath).toLowerCase();
  let fileEntry = getCachedFile(filePath, ext);

  // SPA fallback: return index.html for frontend routes
  if (!fileEntry) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
    ext = '.html';
    fileEntry = getCachedFile(filePath, ext);
  }

  if (fileEntry) {
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isAsset = pathname.startsWith('/assets/') || pathname.startsWith('/images/') || pathname.startsWith('/fonts/');

    // Always revalidate HTML, CSS, and JS so updates apply immediately
    if (ext === '.woff2' || ext === '.woff') {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }

    if (canGzip && fileEntry.gzip) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
        'Vary': 'Accept-Encoding'
      });
      res.end(fileEntry.gzip);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fileEntry.raw.length
      });
      res.end(fileEntry.raw);
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

function sendJson(res, jsonStr, canGzip) {
  const buf = Buffer.from(jsonStr, 'utf8');
  if (canGzip && buf.length > 512) {
    zlib.gzip(buf, (err, gzipped) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': buf.length });
        res.end(buf);
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding'
        });
        res.end(gzipped);
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': buf.length });
    res.end(buf);
  }
}

function startListening(port) {
  server.listen(port, () => {
    console.log(`🚀 Inova Estúdio de Alta Performance rodando em http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Porta ${port} ocupada, tentando ${port + 1}...`);
      startListening(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startListening(DEFAULT_PORT);
