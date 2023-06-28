"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
      }
        
    static async login(credentials) {
    }
        

    static async register({ email, password }) {
    }

    static async fetchUserByEmail(email) {

    }



}