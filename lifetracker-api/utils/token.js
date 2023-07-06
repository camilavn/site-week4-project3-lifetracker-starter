'use strict';

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


const user = require('../models/user');

function createToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    firstname: user.firstName,
    lastname: user.lastName,
    emailaddress: user.email
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
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
  verifyToken
};
