const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB (ajusta la URL según tu configuración)
const mongoURI = 'mongodb://69.62.96.224:3000/chatcoco'; // Para conexión local
// O si usas MongoDB Atlas:
// const mongoURI = 'tu_string_de_conexion_atlas';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectarse a MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Ejemplo de ruta
app.get('/cocos-chat-integrado-main', (req, res) => {
    res.send('¡Hola Mundo!');
});

// Iniciar el servidor
app.listen(3000, () => {
