const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // Puede ser la ruta del archivo o URL
        required: false // Si la imagen no es obligatoria
    },
    proveedor: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Si tienes un modelo User para referencia
        required: false // Haciendo que no sea obligatorio
    }
});

module.exports = mongoose.model('Product', productSchema);
