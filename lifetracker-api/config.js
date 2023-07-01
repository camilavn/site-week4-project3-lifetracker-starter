const dotenv = require('dotenv');
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'fvaeraeaebdbeberbawbw';
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 13;

function getDatabaseUri() {
  const DATABASE_USER = process.env.DATABASE_USER 
  const DATABASE_PASS = process.env.DATABASE_PASS 
  const DATABASE_HOST = process.env.DATABASE_HOST
  const DATABASE_PORT = process.env.DATABASE_PORT 
  const DATABASE_NAME = process.env.DATABASE_NAME 
  const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR
  const IS_TESTING = process.env.IS_TESTING === 'true';

  if (IS_TESTING) {
    return {
      connectionString: `postgresql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
    };
  }

  if (process.env.DATABASE_URL !== undefined) {
    return {
      connectionString: process.env.DATABASE_URL
    };
  }
  return {
    connectionString: `postgresql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
  };
}

module.exports = {
  SERVER_PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
};

