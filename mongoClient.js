const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/leaderboard');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
