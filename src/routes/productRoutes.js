const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Importa el controlador
const multer = require('multer');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Definir la ruta para crear un producto
router.post('/', upload.single('imagen'), productController.createProduct);

// Exportar el enrutador para usarlo en `app.js` o el archivo principal
module.exports = router;
