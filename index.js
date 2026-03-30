const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares
app.use(cors()); // Permite que tu React (puerto 4000/5173) se conecte aquí
app.use(express.json());

// 2. Rutas
app.use('/api/products', productRoutes);

// 3. Iniciar Servidor y Base de Datos
sequelize.sync().then(() => {
  console.log('✅ Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Error al conectar la DB:', err);
});