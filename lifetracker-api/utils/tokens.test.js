'use strict';

const chai = require('chai');
const { expect } = chai;
const chaiSpies = require('chai-spies');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

chai.use(chaiSpies);

const { createToken, verifyToken } = require('./token');

chai.should();

describe('Tokens Utility', function () {
  const user = {
    id: 123,
    username: 'testuser',
    firstName: 'test',
    lastName: 'user',
    email: 'test@gmail.com'
  };

  describe('createToken function', function () {
    it('should create a valid JWT token for user payloads', function () {
      const token = createToken(user);
      expect(token).to.be.a('string');
      expect(token).to.not.be.empty;
    });
  });

  describe('verifyToken function', function () {
    it('should extract a payload from a valid JWT with the correct secret', function () {
      const token = createToken(user);
      const decoded = verifyToken(token);
      expect(decoded).to.deep.include({
        id: user.id,
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        emailaddress: user.email
      });
    });

    it('should return null when invalid tokens are parsed', function () {
      const invalidToken = 'invalid-token';
      const decoded = verifyToken(invalidToken);
      expect(decoded).to.be.null;
    });

    it('should call jwt.verify with the correct arguments', function () {
      const token = createToken(user);
      const verifySpy = chai.spy.on(jwt, 'verify');
      verifyToken(token);
      expect(verifySpy).to.have.been.called.with(token, SECRET_KEY);
      chai.spy.restore(jwt, 'verify');
    });
    
  });
});

