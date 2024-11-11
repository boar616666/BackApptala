const Product = require('../models/product');

// Crear producto
const createProduct = (req, res) => {
    let { title, description, price, proveedor } = req.body;
    const image = req.file ? req.file.path : null;

    const newProduct = new Product({
        title,
        description,
        price,
        image,
        proveedor
    });

    newProduct.save()
        .then(() => {
            res.status(201).json({ message: 'Producto creado con éxito' });
        })
        .catch(err => {
            console.error('Error al guardar el producto:', err);
            res.status(500).json({ error: 'Error al crear el producto: ' + err.message });
        });
};

// Obtener todos los productos
const getAllProducts = (req, res) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: 'Error al obtener productos: ' + err.message }));
};

// Actualizar producto (sin verificar ownerId)
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { title, description, price, proveedor } = req.body;
    const image = req.file ? req.file.path : undefined;

    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const updateData = { title, description, price, proveedor };
            if (image) updateData.image = image;

            return Product.findByIdAndUpdate(id, updateData, { new: true });
        })
        .then(updatedProduct => res.status(200).json(updatedProduct))
        .catch(err => res.status(500).json({ error: 'Error al actualizar el producto: ' + err.message }));
};

// Eliminar producto (sin verificar ownerId)
const deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            return Product.findByIdAndDelete(id);
        })
        .then(() => res.status(200).json({ message: 'Producto eliminado con éxito' }))
        .catch(err => res.status(500).json({ error: 'Error al eliminar el producto: ' + err.message }));
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};
