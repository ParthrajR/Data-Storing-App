// middleware/sendEmailMiddleware.js
const randomstring = require('randomstring');
const { sendVerificationEmail } = require('../utils/sendMail');

const generateVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const verificationCode = randomstring.generate({
      length: 6,
      charset: 'numeric',
    });

    // Send OTP to the user's email
    await sendVerificationEmail(email, verificationCode);

    // Store verification code in the request object for later use
    req.userOtp = verificationCode;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

module.exports = { generateVerificationCode };
