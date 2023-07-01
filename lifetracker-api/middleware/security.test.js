const chai = require('chai');
const spies = require('chai-spies');
const { UnauthorizedError } = require('../utils/errors');
const { extractUserFromToken, requireAuthenticatedUser } = require('./security');
const tokens = require('../utils/token');

chai.use(spies);
const expect = chai.expect;

describe('Security Middleware', function () {
  describe('extractUserFromToken', function () {
    let req, res, next;

    beforeEach(function () {
      req = {
        headers: {},
      };
      res = {
        locals: {},
      };
      next = chai.spy();
    });

    it('should extract user from valid JWT in Authentication header', function () {
        const token = 'validToken';
        req.headers.authorization = `Bearer ${token}`;
        const verifyTokenStub = chai.spy.on(token, 'verifyToken').returns({ id: 123, username: 'testuser' });
      
        extractUserFromToken(req, res, next);
      
        expect(res.locals.user).to.deep.equal({ id: 123, username: 'testuser' });
        expect(verifyTokenStub).to.have.been.called.with(token);
        expect(next).to.have.been.called();
      
        chai.spy.restore(token, 'verifyToken');
      });
      
      
    // it('should extract user from valid JWT in Authentication header', function () {
    // const token = 'validToken';
    // req.headers.authorization = `Bearer ${token}`;

    // // Spy on the verifyToken function from the tokens module
    // const verifyTokenStub = chai.spy.on(token, 'verifyToken').returns({ id: 123, username: 'testuser' });

    // extractUserFromToken(req, res, next);

    // expect(res.locals.user).to.deep.equal({ id: 123, username: 'testuser' });
    // expect(verifyTokenStub).to.have.been.called.with(token);
    // expect(next).to.have.been.called();

    // chai.spy.restore(token, 'verifyToken');
    // });

    it('should not store user when no valid JWT exists in the Authentication header', function () {
      extractUserFromToken(req, res, next);

      expect(res.locals.user).to.be.null;
      expect(next).to.have.been.called();
    });

    it('should not store user when an invalid JWT is in the Authentication header', function () {
      const token = 'invalidToken';
      req.headers.authorization = `Bearer ${token}`;

      extractUserFromToken(req, res, next);

      expect(res.locals.user).to.be.null;
      expect(next).to.have.been.called();
    });
  });

  describe('requireAuthenticatedUser', function () {
    let req, res, next;

    beforeEach(function () {
      req = {};
      res = {
        locals: {},
      };
      next = chai.spy();
    });

    it('should not throw an error when a valid user is present', function () {
      res.locals.user = { id: 123, username: 'testuser' };

      requireAuthenticatedUser(req, res, next);

      expect(next).to.have.been.called();
    });

    it('should throw an UnauthorizedError when no valid user is present', function () {
      res.locals.user = null;

      expect(() => requireAuthenticatedUser(req, res, next)).to.throw(
        UnauthorizedError,
        'Authentication required'
      );
      expect(next).to.not.have.been.called();
    });
  });
});

