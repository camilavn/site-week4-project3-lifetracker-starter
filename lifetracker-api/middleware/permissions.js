const { ForbiddenError, NotFoundError, UnauthorizedError } = require('../utils/errors');
const Nutrition = require('../models/nutrition');
const { requireAuthenticatedUser } = require('./security'); // Import the requireAuthenticatedUser middleware

async function authedUserOwnsNutrition(req, res, next) {
  console.log("authedUserOwnsNutrition middleware")
  try {
    await requireAuthenticatedUser(req, res, next); // Call the requireAuthenticatedUser middleware

    const nutritionId = req.params.id; // Assuming the ID parameter is in the URL path
    console.log("nutritionId:", nutritionId, req.params)
    const nutrition = await Nutrition.fetchNutritionById(nutritionId);

    if (nutrition.user_id !== req.user.id) {
      throw new ForbiddenError('You are not authorized to access this nutrition');
    }

    res.locals.nutrition = nutrition;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authedUserOwnsNutrition };

