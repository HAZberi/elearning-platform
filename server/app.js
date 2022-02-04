const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

//use morgan middleware to get descriptive information on every API request
//in the console.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//A naive example of middleware.
app.use((req, _, next) => {
  console.log('Hello from the middleware');
  //console.log(req.headers);
  next();
});

//One way to add timestamp on every API request.
app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//router middlewares

//if user hits an undefined route
app.all('*', (req, res, next) => {
  next(new AppError(`CANNOT find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
