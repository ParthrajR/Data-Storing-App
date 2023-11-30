// db.js
const mongoose = require('mongoose');
require('dotenv').config();


const { MONGO_URL, DATABASE_NAME } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DATABASE_NAME,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports = mongoose;
