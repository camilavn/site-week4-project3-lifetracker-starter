'use strict';

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
};
