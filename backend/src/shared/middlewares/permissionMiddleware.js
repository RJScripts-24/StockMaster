// src/shared/middlewares/permissionMiddleware.js
// Simple role-based permission middleware for Express

/**
 * Usage: app.use('/api/route', permit('admin', 'manager'), ...)
 *
 * Checks if req.user.role is in allowed roles. Assumes req.user is set by auth middleware.
 */
export default function permit(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }
    next();
  };
}
