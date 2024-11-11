// routes/paymentRoute.js
const express = require('express');
const router = express.Router();
const { savePayment } = require('../controllers/pagosController');  // Asegúrate de importar el controlador correcto

// Ruta para guardar el pago
router.post('/', savePayment);  // Este es el endpoint que se usará para guardar el pago

module.exports = router;
