'use strict';

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


const user = require('../models/user');
const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.email
}

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
