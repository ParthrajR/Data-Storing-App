const mongoose = require('mongoose');

const sendOtpSchema = new mongoose.Schema({
  email: String,
  code: String,
  type: String
}, {
  timestamps: true, // Add timestamps (createdAt, updatedAt)
});

const Otp= mongoose.model('SendOtp', sendOtpSchema);
module.exports = Otp