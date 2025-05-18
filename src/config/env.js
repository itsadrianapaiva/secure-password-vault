require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});
