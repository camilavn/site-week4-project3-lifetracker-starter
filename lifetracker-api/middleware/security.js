const { UnauthorizedError } = require('../utils/errors');
const { verifyToken } = require('../utils/token');

function extractUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    try {
      const payload = verifyToken(token);
      res.locals.user = payload;
    } catch (error) {
      // Invalid token
      res.locals.user = null;
    }
  } else {
    // No token provided
    res.locals.user = null;
  }

  next();
}

function requireAuthenticatedUser(req, res, next) {
  const user = res.locals.user;
  if (!user) {
    throw new UnauthorizedError('Authentication required');
  }

  next();
}

module.exports = {
  extractUserFromToken,
  requireAuthenticatedUser,
  verifyToken
};
