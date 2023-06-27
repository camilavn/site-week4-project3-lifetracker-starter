process.env.NODE_ENV = 'test';
process.env.IS_TESTING = 'true';
process.env.SERVER_PORT = 5000; 
process.env.SECRET_KEY = 'fvaeraeaebdbeberbawbw'; 
process.env.BCRYPT_WORK_FACTOR = 13; 

const assert = require('chai').assert;
const config = require('./config.js');

describe('Env Variables', function() {
  describe('process.env.NODE_ENV', function() {
    it('should be set to "test" when the test suite is run', function() {
      assert.strictEqual(process.env.NODE_ENV, 'test');
    });
  });

  describe('IS_TESTING variable', function() {
    it('should be exported and only true if process.env.NODE_ENV is "test"', function() {
      assert.strictEqual(config.IS_TESTING, process.env.NODE_ENV === 'test');
    });
  });

  describe('Env variables in config.js', function() {
    it('should export PORT', function() {
      assert.exists(config.SERVER_PORT);
    });

    it('should export SECRET_KEY', function() {
      assert.exists(config.SECRET_KEY);
    });

    it('should export BCRYPT_WORK_FACTOR', function() {
      assert.exists(config.BCRYPT_WORK_FACTOR);
    });

    it('should export IS_TESTING', function() {
      assert.exists(config.IS_TESTING);
    });
  });

  describe('getDatabaseUri function', function() {
    it('should be exported from the config.js file', function() {
      assert.isFunction(config.getDatabaseUri);
    });

    it('should return process.env.DATABASE_URL if it exists', function() {
      process.env.DATABASE_URL = 'test-database-url';
      assert.strictEqual(config.getDatabaseUri(), 'test-database-url');
      delete process.env.DATABASE_URL; 
    });

    it('should use the test database when IS_TESTING is true', function() {
      process.env.IS_TESTING = 'true';
      assert.strictEqual(config.getDatabaseUri(), 'test-database-uri');
    });

    it('should combine the proper database environment variables if DATABASE_URL does not exist', function() {
      delete process.env.DATABASE_URL; // Ensure DATABASE_URL is not set
      delete process.env.IS_TESTING; // Ensure IS_TESTING is not set

      process.env.DB_HOST = 'localhost';
      process.env.DB_PORT = 5432;
      process.env.DB_NAME = 'test-db';
      process.env.DB_USER = 'test-user';
      process.env.DB_PASSWORD = 'test-password';

      assert.strictEqual(
        config.getDatabaseUri(),
        'postgresql://test-user:test-password@localhost:5432/test-db'
      );
      
      // Clean up the environment variables after the test
      delete process.env.DB_HOST; 
      delete process.env.DB_PORT;
      delete process.env.DB_NAME;
      delete process.env.DB_USER;
      delete process.env.DB_PASSWORD;
    });
  });
});
