const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes'); // Importa las rutas de productos
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', userRoutes);
app.use('/api/productos', productRoutes); // Registra las rutas de productos

module.exports = app;
