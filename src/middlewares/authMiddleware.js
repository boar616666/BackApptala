const User = require('../models/user'); // Asegúrate de tener el modelo de usuario

// Middleware de autenticación
const autenticacionMiddleware = async (req, res, next) => {
    // Obtiene el token (ID del usuario) del encabezado Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
        // Busca al usuario por el ID (token) en la base de datos
        const user = await User.findById(token);

        // Si no se encuentra el usuario, el token es inválido
        if (!user) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Si el usuario es válido, asigna el ID del usuario al objeto req.user
        req.user = { _id: user._id };
        next(); // Continúa con el siguiente middleware o controlador
    } catch (err) {
        return res.status(500).json({ message: 'Error al verificar el token' });
    }
};

module.exports = autenticacionMiddleware;
