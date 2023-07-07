const { UnauthorizedError } = require('../utils/errors');
const { verifyToken } = require('../utils/token');

function extractUserFromToken(req, res, next) {
  console.log("extractUserFromToken middleware")
  const { token } = req.body;
  if (token) {
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
  console.log("USER:", user);
  if (!user) {
    //throw new UnauthorizedError('Authentication required');
    console.log("REQAUTHENUSER Failed")
  }

  next();
}

module.exports = {
  extractUserFromToken,
  requireAuthenticatedUser,
  verifyToken
};
