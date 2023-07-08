"use strict"
const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const config = require('./config');
const user = require('./models/user');
const app = express();
const { extractUserFromToken } = require('./middleware/security');


app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.json())

app.use(extractUserFromToken);
app.use('/auth', require('./routes/auth'));
app.use('/nutrition', require('./routes/nutrition'));

app.get('/', async (req, res) => {
    res.json({ping: 'pong'})
})



module.exports = app;