const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes'); // Rutas de productos
const paymentRoutes = require('./src/routes/pagosRoutes'); // Rutas de pagos
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Configura la carpeta `uploads` como pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api', userRoutes);
app.use('/api/productos', productRoutes); // Rutas de productos
app.use('/api/pagos', paymentRoutes); // Ruta para pagos

// Exporta `app` para que pueda ser usado en el servidor principal
module.exports = app;
