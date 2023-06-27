const express = require('express');
require('dotenv').config();
const app = express();
const config = require('./config');
const db = require('./db')

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ ping: 'pong' })
});


afterAll(async () => {
    await db.end();
});


module.exports = app, db;
