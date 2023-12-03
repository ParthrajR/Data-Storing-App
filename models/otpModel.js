const mongoose = require('mongoose');

const sendOtpSchema = new mongoose.Schema({
  email: String,
  code: String,
}, {
  timestamps: true, // Add timestamps (createdAt, updatedAt)
});

module.exports = mongoose.model('SendOtp', sendOtpSchema);
