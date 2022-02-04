const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//A naive example of middleware.
app.use((req, _, next) => {
  console.log('Hello from the middleware');
  //console.log(req.headers);
  next();
});

//router middlewares
app.use('/api/v1/users', userRouter);

//if user hits an undefined route
app.all('*', (req, res, next) => {
  next(new AppError(`CANNOT find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
