const http = require('http');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const cantidadNucleos = Math.max(2, require('os').cpus().length);

const PUERTO = 3000;
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

if (cluster.isPrimary) {
  console.log('═════════════════════════════════════');
  console.log('👑 DIMON CONNECT - LÍDER DEL EQUIPO');
  console.log(`✅ Integrantes activos: ${cantidadNucleos}`);
  console.log('═════════════════════════════════════');
  for (let i = 0; i < cantidadNucleos; i++) cluster.fork();
  cluster.on('exit', () => cluster.fork());
} else {
  const servidor = http.createServer((req, res) => {
    let ruta = '.' + (req.url === '/' ? '/public/index.html' : '/public' + req.url);
    const ext = path.extname(ruta).toLowerCase();
    fs.readFile(ruta, (err, dato) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1 style="color:#4a9eff;text-align:center;padding-top:30px;">🔒 Todo seguro y ordenado</h1>');
      }
      res.writeHead(200, {
        'Content-Type': TIPOS[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(dato);
    });
  });
  servidor.listen(PUERTO, '127.0.0.1', () => console.log(`✅ Servidor listo en http://127.0.0.1:${PUERTO}`));
}

