// Importar el modelo Product
const Product = require('../models/product'); // Asegúrate de que la ruta sea correcta

const createProduct = (req, res) => {
    // Lógica para manejar la creación del producto
    const { title, description, price } = req.body; // Obtener datos del formulario

    // Manejar la imagen cargada
    const image = req.file ? req.file.path : null; // Obtener la ruta de la imagen cargada

    // Crear una nueva instancia del producto en la base de datos
    const newProduct = new Product({
        title,
        description,
        price,
        image,
    });

    // Guardar el producto en la base de datos
    newProduct.save()
        .then(() => {
            res.status(201).json({ message: 'Producto creado con éxito' }); // Cambia a JSON
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al crear el producto: ' + err.message }); // Cambia a JSON
        });
};

// Exportar la función
module.exports = { createProduct };
