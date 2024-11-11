const mongoose = require('mongoose');

// Esquema de pago
const paymentSchema = new mongoose.Schema({
  payerId: { type: String, required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Referencia al modelo de Producto
      required: true
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
