const { requireAuthenticatedUser, extractUserFromToken } = require('../middleware/security');
const express = require('express');
const { authedUserOwnsNutrition } = require('../middleware/permissions');
const Nutrition = require('../models/nutrition');

const router = express.Router();

// GET /nutrition
router.post('/', async (req, res, next) => {
  try {
    let user = res.locals.user
    const nutritions = await Nutrition.listNutritionForUser(user.id);
    res.json({ nutritions });
  } catch (error) {
    next(error);
  }
});

// POST /nutrition
router.post('/create', async (req, res, next) => {
  try {
    console.log("from routes HUGE:", res.locals.user);
    let user = res.locals.user
    

    const { name, category, calories, imageUrl } = req.body.nutrition;
    console.log("create route",req.body.nutrition)
    const nutrition = await Nutrition.createNutrition(user.id, name, category, calories, imageUrl);
    res.status(201).json({ nutrition });
  } catch (error) {
    next(error);
  }
});

// GET /nutrition/:nutrition_id
router.post('/nutrition_id', (req, res) => {
  console.log(req.body)
  console.log("accessing nutrition id")
  const nutrition = res.locals.nutrition;
  res.json({ nutrition });
});

module.exports = router;
