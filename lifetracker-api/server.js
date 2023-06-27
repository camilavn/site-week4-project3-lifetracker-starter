const express = require('express');
require('dotenv').config();
const config = require('./config');
const app = require("./app")
const { SERVER_PORT } = require("./config")
const db = require('pg')


app.get('/', (req, res) => {
  res.json("Hello from Server")
})

app.listen(SERVER_PORT, function () {
  console.log(`🚀 Server running on http://localhost:${SERVER_PORT}`)
})
