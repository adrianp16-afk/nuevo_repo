
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No access token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Guarda el ID del usuario en la petición
        next(); // ¡Paso libre al controlador!
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};