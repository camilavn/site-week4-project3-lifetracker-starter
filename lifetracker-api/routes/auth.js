const express = require('express');
const router = express.Router();
const { login, register } = require('../models/user');
const token = require('../utils/token');


// GET /auth/me
router.get('/me', (req, res) => {
  const user = req.user;
  // Send a JSON response with the user data
  res.json({ user: user });
});

// POST /auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { token, user } = login(email, password);

  // Send a JSON response with the JWT token and user information
  res.json({ token: token, user: user });
});

// POST /auth/register
router.post('/register', (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;
  const { token, user } = register(email, username, firstName, lastName, password);

  // Send a JSON response with the JWT token and user information
  res.status(201).json({ token: token, user: user });
});

module.exports = router;
