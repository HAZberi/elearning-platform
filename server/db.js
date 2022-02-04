const mongoose = require('mongoose');

const mongoURI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB Connected to <${conn.connection.name}> @ PORT: ${conn.connection.port}`
    );
  } catch (err) {
    console.log(`MongoDB Connection Unsuccessful \nERROR: ${err}`);
  }
};

module.exports = connectDB;
