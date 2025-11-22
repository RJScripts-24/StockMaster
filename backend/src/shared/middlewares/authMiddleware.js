// shared/middlewares/authMiddleware.js
// JWT authentication middleware
// Verifies token, attaches req.user, continues to next middleware

const jwt = require('jsonwebtoken');
const { prisma } = require('../../config/db');

// Load secret from env
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

/**
 * Express middleware to authenticate requests using a Bearer JWT.
 *
 * Attaches `req.user = { id, email, role }` when valid.
 */
module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // decoded should contain at least userId
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    // Fetch minimal user info
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach to request
    req.user = user;
    next();
  } catch (err) {
    console.error('authMiddleware error:', err);
    return res.status(500).json({ success: false, message: 'Authentication error' });
  }
};