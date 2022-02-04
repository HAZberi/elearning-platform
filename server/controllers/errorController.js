const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  //This function handles invalid IDs
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateKeyDB = (err) => {
  //This function handles duplicate key when creating new documents.
  const message = `Duplicate field value [${err.keyValue.name}]. Please use something else!`;
  return new AppError(message, 400);
};

const handleValidationErrors = (err) => {
  //This function handles validation errors when creating or updating documents.

  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(message, 400);
};

const handleWebTokenError = () =>
  new AppError('Invalid Token. Please log in again.', 401);

const handleExpiredTokenError = () =>
  new AppError('Your Token has been expired. Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //if the error is operational => Trusted Error, send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //if the error is a programming error then send a generic error to the client
    //1. Log Error to the console
    console.error('ERROR:', err);

    //2. Send a very generic message to the client
    res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong!!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    //FIX for unexpected Error Object behavior
    //1. destructure the name of the Error directly from err object !!very important!!
    const { name } = err;
    //2. create a deep copy of err object
    let error = { ...err };
    //3. add destructured name from step 1 to newly created error object
    if (name) error.name = name;

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateKeyDB(error);

    if (error.name === 'ValidationError') error = handleValidationErrors(error);

    if (error.name === 'JsonWebTokenError') error = handleWebTokenError();

    if (error.name === 'TokenExpiredError') error = handleExpiredTokenError();

    sendErrorProd(error, res);
  }
};
