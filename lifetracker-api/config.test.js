const { expect } = require('chai');
const chai = require('chai');
const spies = require('chai-spies');
const config = require('./config.js');

chai.use(spies);

describe('Env Variables', function() {
  
  before(function() {
    process.env.NODE_ENV = 'test';
    process.env.SERVER_PORT = 5000;
    process.env.SECRET_KEY = 'fvaeraeaebdbeberbawbw';
    process.env.BCRYPT_WORK_FACTOR = 13;
    config.IS_TESTING = process.env.NODE_ENV === 'test';
  });
  

  describe('process.env.NODE_ENV', function() {
    it('should be set to "test" when the test suite is run', function() {
      expect(process.env.NODE_ENV).to.equal('test');
    });
  });

  describe('IS_TESTING variable', function() {
    it('should be exported and only true if process.env.NODE_ENV is "test"', function() {
      expect(config.IS_TESTING).to.equal(true);
    });
  });

  describe('Env variables in config.js', function() {
    const expectedVariables = ['SERVER_PORT', 'SECRET_KEY', 'BCRYPT_WORK_FACTOR'];

    expectedVariables.forEach(variable => {
      it(`should export ${variable}`, function() {
        expect(config[variable]).to.exist;
      });
    });
  });

  describe('getDatabaseUri function', function() {
    it('should be exported from the config.js file', function() {
      expect(config.getDatabaseUri).to.be.a('function');
    });

    it('should return process.env.DATABASE_URL if it exists', function() {
      const databaseUrl = 'test-database-url';
      process.env.DATABASE_URL = databaseUrl;
      expect(config.getDatabaseUri().connectionString).to.equal(databaseUrl);
      delete process.env.DATABASE_URL;
    });

    it('should use the test database when IS_TESTING is true', function() {
      const expectedConnectionString = 'postgresql://me:postgres@localhost:5432/lifetracker_test';
      process.env.IS_TESTING = true;
      expect(config.getDatabaseUri().connectionString).to.equal(expectedConnectionString);
    });

    it('should combine the proper database environment variables if DATABASE_URL does not exist', function() {
      delete process.env.DATABASE_URL;
      delete process.env.IS_TESTING;
      delete process.env.NODE_ENV;

      const expectedConnectionString = 'postgresql://me:postgres@localhost:5432/lifetracker';
      expect(config.getDatabaseUri().connectionString).to.equal(expectedConnectionString);
    });
  });
});

