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


module.exports = app;