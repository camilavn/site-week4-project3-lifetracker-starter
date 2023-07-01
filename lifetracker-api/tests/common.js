// const { Pool } = require('pg');
// const { getDatabaseUri } = require('../config');

// const pool = new Pool({
//   connectionString: getDatabaseUri(),
// });

// pool.connect();

// const commonBeforeAll = async function () {
//   await pool.query('DELETE FROM users');
//   await pool.query('DELETE FROM goals');
//   await pool.query('DELETE FROM tasks');
//   await pool.query('DELETE FROM user_goals');
// };

// const commonBeforeEach = async function () {
//   await pool.query('BEGIN');
// };

// const commonAfterEach = async function () {
//   await pool.query('ROLLBACK');
// };

// const commonAfterAll = async function () {
//   await pool.end();
// };

// module.exports = {
//   pool,
//   commonBeforeAll,
//   commonBeforeEach,
//   commonAfterEach,
//   commonAfterAll,
// };
