"use strict"
const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const config = require('./config');
const user = require('./models/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', async (req, res) => {
    res.json({ping: 'pong'})
})

/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     return next(new NotFoundError())
//   })
  
  /** Generic error handler; anything unhandled goes here. */
  // app.use(function (err, req, res, next) {
  //   if (!config.IS_TESTING) console.error(err.stack)
  //   const status = err.status || 500
  //   const message = err.message
  
  //   return res.status(status).json({
  //     error: { message, status },
  //   })
  // })

  // app.get('register', (req, res) => {
  //   res.json('hello')
  // })
  

module.exports = app;