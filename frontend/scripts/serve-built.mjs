// Local acceptance server for the production files. Public routing is verified on Vercel too.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../build');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (/^\/login\/?$/.test(path)) { res.writeHead(307, { Location: 'https://app.veri-case.com/ui/login.html' }); res.end(); return; }
    const page = path.match(/^\/(cookies|notes|discussion-cost|evidence-cost)\/?$/);
    let file = resolve(root, '.' + (path === '/' ? '/index.html' : page ? `/${page[1]}.html` : path));
    let status = 200;
    if (!file.startsWith(root + sep) || !(await stat(file).catch(() => null))?.isFile()) {
      file = resolve(root, '404.html'); status = 404;
    }
    const data = await readFile(file);
    res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(4183, '127.0.0.1', () => console.log('Built website: http://127.0.0.1:4183'));
