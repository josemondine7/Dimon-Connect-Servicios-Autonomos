const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Servir archivos desde la carpeta "público"
app.use(express.static(path.join(__dirname, 'público')));

// Ruta principal → abre índice.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'público', 'índice.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Dimon Connect corriendo en el puerto ${PORT}`);
});
