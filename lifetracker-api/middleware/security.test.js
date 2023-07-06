const chai = require('chai');
const spies = require('chai-spies');
const { UnauthorizedError } = require('../utils/errors');
const { extractUserFromToken, requireAuthenticatedUser } = require('./security');
const tokens = require('../utils/token');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

chai.use(spies);
const expect = chai.expect;
const sinon = require('sinon');



const user = {
  id: 123,
  username: 'testuser',
  firstName: 'test',
  lastName: 'user',
  email: 'test@gmail.com'
};
const mocktoken = jwt.sign(user, SECRET_KEY);

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
      req.headers.authorization = `Bearer ${mocktoken}`;
      //const verifyTokenStub = sinon.stub(tokens, 'verifyToken').returns(user);

      const nextSpy = sinon.spy(user.email);
      extractUserFromToken(req, res, nextSpy);

      expect(res.locals.user.email).to.equal(user.email);
      //expect(verifyTokenStub).to.have.been.calledWith(mocktoken);
      expect(nextSpy).to.have.been.called;

      //verifyTokenStub.restore();
    });
         

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

