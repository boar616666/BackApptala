const Product = require('../models/product');

// Crear un nuevo producto
const createProduct = (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : null; // Obtén el path de la imagen si se proporciona

    const newProduct = new Product({
        title,
        description,
        price,
        image,
    });

    newProduct.save()
        .then(() => {
            res.status(201).json({ message: 'Producto creado con éxito' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al crear el producto: ' + err.message });
        });
};

// Obtener todos los productos
const getAllProducts = (req, res) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: 'Error al obtener productos: ' + err.message }));
};

// Actualizar un producto
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : undefined; // Verifica si se envió una imagen nueva

    const updateData = { title, description, price };
    if (image) updateData.image = image; // Solo actualiza la imagen si se proporciona una nueva

    Product.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedProduct => res.status(200).json(updatedProduct))
        .catch(err => res.status(500).json({ error: 'Error al actualizar el producto: ' + err.message }));
};

// Eliminar un producto
const deleteProduct = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID del producto no proporcionado' });
    }

    Product.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'Producto eliminado con éxito' }))
        .catch(err => res.status(500).json({ error: 'Error al eliminar el producto: ' + err.message }));
};

// Exportar las funciones
module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};
