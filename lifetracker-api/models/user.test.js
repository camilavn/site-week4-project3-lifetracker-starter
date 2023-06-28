"use strict";
const User = require("./user");

const assert = require('chai').assert;
const config = require('./config.js');

describe('User', function () {
    describe('User.login', function () {
        it('should return a user object when given a valid email and password', async function () {
            const user = await User.login({
                email: "",
                password: "",
            });
            assert.exists(user);
        });
    });

    describe('User.register', function () {
        it('should return a user object when given a valid email and password', async function () {
            const user = await User.register({
                email: "",
                password: "",
            });
            assert.exists(user);
        });
    });

    describe('User.fetchUserByEmail', function () {
        it('should return a user object when given a valid email', async function () {
            const user = await User.fetchUserByEmail({
                email: "",
            });
            assert.exists(user);
        });
    });
});
