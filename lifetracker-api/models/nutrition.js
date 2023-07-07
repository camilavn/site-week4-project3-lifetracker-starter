const pool = require('../db');
const { BadRequestError, NotFoundError } = require('../utils/errors');

class Nutrition {
  static async createNutrition(user_id, name, category, calories, image_url) {
    try {
      console.log("nut model image ",image_url)
      const values = [user_id, name, category, calories, image_url];

      const result = await pool.query('INSERT INTO nutrition (user_id, name, category, calories, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', values);
      return result.rows[0];
    } catch (error) {
      throw new BadRequestError('Invalid nutrition data');
    }
  }

  static async fetchNutritionById(id) {
    console.log("fetchNutritionById", id)
    const result = await pool.query('SELECT * FROM nutrition WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Nutrition not found');
    }

    return result.rows[0];
  }

  static async listNutritionForUser(user_id) {

    const result = await pool.query('SELECT * FROM nutrition WHERE user_id = $1', [user_id]);
    return result.rows;
  }
}

module.exports = Nutrition;
