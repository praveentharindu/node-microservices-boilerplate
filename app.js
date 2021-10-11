const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const parseError = require('parse-error');
const cors = require('cors');
const { log } = require('./services/log.service');

const CONFIG = require('./config/config');
const routes = require('./routes/api/routes');

// DATABASE
require('./models');

// Create global app object
var app = express();

const corsOptions = {};

// CORS
app.use(cors(corsOptions));

// Normal express config defaults
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan.token('id', function getId(req) {
//   return req.id;
// });

// Log Env
log.info(`ENVIRONMENT: ${CONFIG.app}`);

app.use('/student-service/v1', routes);

app.use('/student-service/health', function(req, res) {
  res.statusCode = 200; // send the appropriate status code
  res.json({
    status: 'success',
    message: 'Student Stat Service is Healthy 2',
    data: {}
  });
});

app.use('/', function(req, res) {
  // send the appropriate status code
  res.statusCode = 200;
  res.json({
    status: 'success',
    message: 'Welcome to Student Stat Service API 3',
    data: {}
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

process.on('unhandledRejection', error => {
  log.error('Uncaught Error', parseError(error));
});
