'use strict';

const chai = require('chai');
const { expect } = chai;
const chaiSpies = require('chai-spies');
chai.use(chaiSpies);

const { createToken, verifyToken } = require('./token');

chai.should();

describe('Tokens Utility', function () {
  const payload = {
    id: 123,
    username: 'testuser',
  };

  describe('createToken function', function () {
    it('should create a valid JWT token for user payloads', function () {
      const token = createToken(payload);
      expect(token).to.be.a('string');
      expect(token).to.not.be.empty;
    });
  });

  describe('verifyToken function', function () {
    it('should extract a payload from a valid JWT with the correct secret', function () {
        const token = createToken(payload);
        const decoded = verifyToken(token);
        expect(decoded).to.deep.include({ id: payload.id, username: payload.username });
      });
      
    it('should return null when invalid tokens are parsed', function () {
      const invalidToken = 'invalid-token';
      const decoded = verifyToken(invalidToken);
      expect(decoded).to.be.null;
    });

    it('should call jwt.verify with the correct arguments', function () {
      const token = createToken(payload);
      const verifySpy = chai.spy.on(require('jsonwebtoken'), 'verify');
      verifyToken(token);
      expect(verifySpy).to.have.been.called.with(token, process.env.SECRET_KEY);
      chai.spy.restore(require('jsonwebtoken'), 'verify');
    });
  });
});
