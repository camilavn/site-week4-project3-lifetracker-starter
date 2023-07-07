const pool = require('../db');

class Activity {
  static async calculateDailyCaloriesSummaryStats(userId) {
    const query = `
      SELECT
        DATE(created_at) AS date,
        SUM(calories) AS totalCaloriesPerDay
      FROM
        nutrition
      WHERE
        user_id = $1
      GROUP BY
        date
    `;


    try {
      const result = await pool.query(query, [userId]);
      console.log('query:', result)
      return result.rows[0];
    } catch (error) {
      throw new Error('Failed to calculate daily calories summary stats.');
    }
  }

  static async calculatePerCategoryCaloriesSummaryStats(userId) {
    const query = `
      SELECT
        category,
        ROUND(AVG(calories)::numeric, 1) AS avgCaloriesPerCategory
      FROM
        nutrition
      WHERE
        user_id = $1
      GROUP BY
        category
    `;
    const values = [userId];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Failed to calculate per category calories summary stats.');
    }
  }
}

module.exports = Activity;
