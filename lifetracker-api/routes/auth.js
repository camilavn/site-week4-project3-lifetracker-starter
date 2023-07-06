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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { token, user } = await login(email, password);
    res.json({ token, user });
  } catch (error) {
    // Handle any errors that occurred during login
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});


// POST /auth/register
router.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  
  try {
    const user = await register(username, password, email, firstName, lastName);
    console.log("from routes:", user);
    res.status(201).json({ user });
  } catch (error) {
    // Handle any errors that occurred during registration
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
