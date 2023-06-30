"use strict";
const { Pool } = require('pg');
const { getDatabaseUri } = require('./config');

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,  
    port: process.env.DATABASE_PORT
});

module.exports = pool;

