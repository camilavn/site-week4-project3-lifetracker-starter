'use strict';
const User = require('./user');
const assert = require('chai').assert;
const config = require('../config.js');
const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

describe('User Model', function () {
  let testUser;

  before(async function () {
    testUser = await User.register('testuser77', 'password77', 'test77@example.com');
  });

  describe('login method', function () {
    it('should allow user to login successfully with proper credentials', async function () {
      const loggedInUser = await User.login('test77@example.com', 'password77');

      assert.strictEqual(loggedInUser.password, 'password77');
      assert.strictEqual(loggedInUser.email, 'test77@example.com');
    });

    it('should throw UnauthorizedError for an unknown email', async function () {
      await chai.spy.on(User, 'login', () => Promise.reject(new Error('Invalid email')));

      try {
        await User.login('test77@example.com');
        assert.fail('Expected UnauthorizedError was not thrown');
      } catch (error) {
        expect(error.message).to.equal('Invalid email');
      }

      chai.spy.restore(User, 'login');
    });

    it('should throw UnauthorizedError for invalid credentials', async function () {
      await chai.spy.on(User, 'login', () => Promise.reject(new Error('Invalid password')));

      try {
        await User.login('test77@example.com', 'password77');
        assert.fail('Expected UnauthorizedError was not thrown');
      } catch (error) {
        expect(error.message).to.equal('Invalid password');
      }

      chai.spy.restore(User, 'login');
    });
  });

  describe('register method', function () {
    it('should allow user to register successfully with proper credentials', async function () {
      const registeredUser = await User.register('testuser77', 'password77', 'test77@example.com');

      assert.strictEqual(registeredUser.username, 'testuser77');
      assert.strictEqual(registeredUser.email, 'test77@example.com');
      assert.strictEqual(registeredUser.password, 'password77');
    });

    it('should throw BadRequestError for registering with duplicate email', async function () {
      await chai.spy.on(User, 'register', () => Promise.reject(new Error('Email or username already taken')));

      try {
        await User.register('testuser77', 'password77', 'test77@example.com');
        assert.fail('Expected BadRequestError was not thrown');
      } catch (error) {
        expect(error.message).to.equal('Email or username already taken');
      }

      chai.spy.restore(User, 'register');
    });

    it('should throw BadRequestError for registering with duplicate username', async function () {
      await chai.spy.on(User, 'register', () => Promise.reject(new Error('Email or username already taken')));

      try {
        await User.register('testuser77', 'password77', 'test77@example.com');
        assert.fail('Expected BadRequestError was not thrown');
      } catch (error) {
        expect(error.message).to.equal('Email or username already taken');
      }

      it('should throw BadRequestError for registering with invalid email', async function () {
        await chai.spy.on(User, 'register', () => Promise.reject(new Error('Invalid email')));
      
        try {
          await User.register('testuser77', 'password77', 'invalidemail');
          assert.fail('Expected BadRequestError was not thrown');
        } catch (error) {
          expect(error.message).to.equal('Invalid email');
        }
      
        chai.spy.restore(User, 'register');
      });
    });
  });

  describe('fetchUserByEmail method', function () {
    it('should return a user from the database for a valid email', async function () {
      const fetchedUser = await User.fetchUserByEmail('test77@example.com');

      assert.strictEqual(fetchedUser.username, 'testuser77');
      assert.strictEqual(fetchedUser.email, 'test77@example.com');
      assert.strictEqual(fetchedUser.password, 'password77');
    });

    it('should handle invalid emails correctly', async function () {
      await chai.spy.on(User, 'fetchUserByEmail', () => Promise.reject(new Error('Invalid email')));

      try {
        await User.fetchUserByEmail('invalidemail');
        assert.fail('Expected error was not thrown');
      } catch (error) {
        expect(error.message).to.equal('Invalid email');
      }

      chai.spy.restore(User, 'fetchUserByEmail');
    });

    after(async function () {
      await User.deleteUser('test77@example.com');
    });    

  });

  });

