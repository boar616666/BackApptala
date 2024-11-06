const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
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

// Rutas para productos
router.post('/', upload.single('image'), productController.createProduct); // Crear producto con imagen
router.get('/', productController.getAllProducts); // Obtener todos los productos
router.put('/:id', upload.single('image'), productController.updateProduct); // Actualizar producto con imagen
router.delete('/:id', productController.deleteProduct); // Eliminar producto

// Exportar el enrutador para usarlo en `app.js` o el archivo principal
module.exports = router;
