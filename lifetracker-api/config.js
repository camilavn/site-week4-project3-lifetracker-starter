require('dotenv').config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  BCRYPT_WORK_FACTOR: process.env.BCRYPT_WORK_FACTOR,
  IS_TESTING: process.env.IS_TEST
};
