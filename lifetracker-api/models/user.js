'use strict';

const pool = require('../db');
const bcrypt = require('bcrypt');
const config = require('../config');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {
  static async login(email, password) {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (rows.length === 0) {
        throw new UnauthorizedError('Invalid email');
      }

      const hashedPassword = rows[0].password;
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid password');
      }

      return rows[0];
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
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
        [username, hashedPassword, email, firstName, lastName]
      );
  
      return newUser;
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Registration failed');
    }
  }

  static async fetchUserByEmail(email) {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (rows.length === 0) {
        throw new BadRequestError('User not found');
      }

      return rows[0];
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Failed to fetch user');
    }
  }

  static async deleteUser(email) {
    try {
      const { rowCount } = await pool.query('DELETE FROM users WHERE email = $1', [email]);

      if (rowCount === 0) {
        throw new BadRequestError('User not found');
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Failed to delete user');
    }
  }

}

module.exports = User;
