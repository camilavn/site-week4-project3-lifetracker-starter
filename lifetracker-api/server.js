const express = require('express');
require('dotenv').config();
const config = require('./config/config');
const app = require("./app")
const { PORT } = require("./config")
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  database_test_name: process.env.DATABASE_TEST_NAME,
  bcrypt_work_factor: process.env.BCRYPT_WORK_FACTOR,
})


app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

module.exports = {app, pool};