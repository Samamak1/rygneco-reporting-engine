/**
 * Serves the sanitized demonstration artifact on port 3000.
 * The page contains fictional sample data and no operating claims.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  const requestedPath = req.url === '/' || req.url === '/demo' ? 'demo.html' : req.url.replace(/^\//, '');
  const filePath = path.resolve('.', requestedPath);
  const root = path.resolve('.');

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500);
      res.end(error.code === 'ENOENT' ? 'File not found' : 'Server error');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Sanitized demonstration available at http://localhost:${PORT}`);
});
