'use strict';

const pool = require('../db');
const bcrypt = require('bcrypt');
const config = require('../config');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

class User {

  static async login(email, password) {
    console.log(email, password);
    try {
      const results = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (results.rows.length === 0) {
        throw new UnauthorizedError('Invalid email');
      }
  
      const user = results.rows[0];
      const hashedPassword = user.password;
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  
      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid password');
      }
  
      const token = jwt.sign(user, SECRET_KEY);
      return { token, user };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedError('Invalid credentials');
    }
  }  

  static async register(username, password, email, firstName, lastName) {
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
      if (existingUser.rows.length > 0) {
        throw new BadRequestError('Email or username already taken');
      }
      const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_WORK_FACTOR));
      
      const newUser = await pool.query(
        'INSERT INTO users (username, password, email, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, hashedPassword, email, firstName, lastName]
      );
      
      return newUser.rows[0];
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Registration failed');
    }
  }

  static async fetchUserByEmail(email) {
    try {
      const fetched = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (fetched.rows.length === 0) {
        throw new BadRequestError('User not found');
      }

      return fetched.rows[0];
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Failed to fetch user');
    }
  }

  static async deleteUser(email) {
    try {
      const toDelete = await pool.query('DELETE FROM users WHERE email = $1', [email]);

      if (toDelete.rowCount === 0) {
        throw new BadRequestError('User not found');
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Failed to delete user');
    }
  }

}

module.exports = User;
