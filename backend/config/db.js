'use strict';

const mongoose = require('mongoose');

const uri = process.env.MONGO_CLOUD;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_DATABASE,
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
