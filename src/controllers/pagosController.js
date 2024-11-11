const Payment = require('../models/pagos');  // Asegúrate de importar el modelo correctamente

const savePayment = async (req, res) => {
  try {
    const { payerId, transactionId, amount, items, paymentDate } = req.body;

    // Verifica que los datos están presentes
    if (!payerId || !transactionId || !amount || !items) {
      return res.status(400).json({ message: 'Faltan datos importantes para realizar el pago.' });
    }

    // Crear un nuevo pago con los datos recibidos
    const payment = new Payment({
      payerId,
      transactionId,
      amount,
      items,  // Asegúrate de que los items tienen el formato correcto
      paymentDate
    });

    // Guardar el pago en la base de datos
    await payment.save();

    // Devolver una respuesta exitosa con el pago guardado
    res.status(201).json({ message: 'Pago guardado exitosamente', payment });
  } catch (error) {
    console.error('Error al guardar el pago:', error);
    res.status(500).json({ message: 'Hubo un error al guardar el pago', error: error.message });
  }
};

module.exports = { savePayment };
