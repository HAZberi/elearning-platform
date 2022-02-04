process.on('uncaughtException', (err) => {
  //This callback is to handle any synchronous errors that are not handled on the server.
  //It importatnt to run this function at the start of the application since its meant to handle synchronous stuff.
  console.log('Uncaught Exception Occurred. Shutting down the server.');
  console.log(err.name, err.message);
  process.exit(1);
});

// This file contains all the configuration about running the nodeJS
// server and import appropriate environmental variables

//configure donenv before requiring app module otherwise
//process.env custom config will not be available in app module.
const dotenv = require('dotenv');

dotenv.config();

// const connectDB = require('./db');

// connectDB();

const app = require('./app');

//console.log(process.env);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening requests on port ${process.env.PORT}.... `);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection Promise. Shutting down the server.');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
