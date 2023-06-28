require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000
const IS_TESTING = process.env.NODE_ENV === "test" //should be boolean
const SECRET_KEY = process.env.SECRET_KEY || "secret"
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 13

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const DATABASE_USER = process.env.DATABASE_USER || "me"
  const DATABASE_PASS = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
  const DATABASE_HOST = process.env.DATABASE_HOST || "localhost"
  const DATABASE_PORT = process.env.DATABASE_PORT || 5432
  const DATABASE_TEST_NAME = process.env.DATABASE_TEST_NAME || "lifetracker_test"
  const DATABASE_NAME = process.env.DATABASE_NAME || "lifetracker"
  const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 13
  const IS_TESTING = process.env.NODE_ENV === "test"
  return (IS_TESTING)
  ? 'postgresql://me:postgres@localhost:localhost/lifetracker_test'
  : process.env.DATABASE_URL || `postgresql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_HOST}/${DATABASE_NAME}`
}


module.exports = {
  SERVER_PORT,
  IS_TESTING,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY
};
