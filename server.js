const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let publicaciones = [];
let contadorId = 1;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/publicaciones', (req, res) => {
  res.json(publicaciones);
});

app.post('/api/publicaciones', (req, res) => {
  const nueva = {
    id: contadorId++,
    tipo: req.body.tipo,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    contacto: req.body.contacto,
    fecha: new Date().toISOString()
  };
  publicaciones.unshift(nueva);
  res.json(nueva);
});

app.delete('/api/publicaciones/:id', (req, res) => {
  const id = parseInt(req.params.id);
  publicaciones = publicaciones.filter(p => p.id !== id);
  res.json({ ok: true });
});

app.listen(PUERTO, () => {
  console.log(`Dimon Connect funcionando en el puerto ${PUERTO}`);
});
