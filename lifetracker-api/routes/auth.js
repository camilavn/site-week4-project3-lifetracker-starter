const express = require('express');
const router = express.Router();
const { login, register, fetchUserByEmail } = require('../models/user');
const token = require('../utils/token');
const { requireAuthenticatedUser, extractUserFromToken } = require('../middleware/security');
const Activity = require('../models/activity');


// GET /auth/me
router.post('/me', (req, res) => {
  const user = fetchUserByEmail((res.locals.user.email));
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
    // console.log("from routes:", user);
    res.status(201).json({ user: {firstName }, message: `Welcome, ${firstName}! Registration successful.` });
  } catch (error) {
    // Handle any errors that occurred during registration
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/activity', extractUserFromToken, async (req, res, next) => {
  let user = res.locals.user
  
  try {
    if (!user.email) {
      // throw new UnauthenticatedError('User not authenticated');
      console.log("THERES NO USER from router /activity in auth.js")
    }

    // Calculate summary statistics
    const dailyCaloriesSummaryStats = await Activity.calculateDailyCaloriesSummaryStats(user.id);
    const perCategoryCaloriesSummaryStats = await Activity.calculatePerCategoryCaloriesSummaryStats(user.id);

    //console.log('calories:', dailyCaloriesSummaryStats)
    const response = {
      nutrition: {
        calories: {
          perDay: dailyCaloriesSummaryStats,
          perCategory: perCategoryCaloriesSummaryStats,
        },
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
