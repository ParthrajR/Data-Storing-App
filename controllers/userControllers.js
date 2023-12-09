const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const admin = require("../config/firebase");
const bcrypt = require("bcryptjs");
const randomstring = require('randomstring');
const { sendVerificationEmail } = require('../utils/sendMail');
const Otp = require('../models/otpModel');



const sendOtp = async (req, res) => {
  const { email, type } = req.body;

  if (type === "signup") {
    console.log("signnnnnupppp")
    try {
      const existingUser = await User.findOne({ email: email });

      if (!email) {
        return res.status(400).json({ message: "All fields are mandatory" });
      }
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Generate OTP
      const verificationCode = randomstring.generate({
        length: 6,
        charset: 'numeric',
      });

      // Send OTP to the user's email
      await sendVerificationEmail(email, verificationCode);

      // Save email and verification code in the database
      const verificationRecord = new Otp({
        email: email,
        code: verificationCode,
        type: type, // Fix the typo here
      });

      await verificationRecord.save();

      res.status(200).json({ status: "success", message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  } else if (type === "forgot") {

    console.log("forgot")

    try {
      const existingUser = await User.findOne({ email: email });

      if (!email) {
        return res.status(400).json({ message: "All fields are mandatory" });
      } else {
        if (!existingUser) {
          return res.status(400).json({ message: "User not found" });
        } else {
          // Generate OTP
          const verificationCode = randomstring.generate({
            length: 6,
            charset: 'numeric',
          });

          // Send OTP to the user's email
          await sendVerificationEmail(email, verificationCode);

          // Save email and verification code in the database
          const verificationRecord = new Otp({
            email: email,
            code: verificationCode,
            type: type, // Fix the typo here
          });

          await verificationRecord.save();

          res.status(200).json({ status: "success", message: "Email sent successfully" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};


const signUp = async (req, res) => {
  try {
    const { name, email, verificationCode, password, confirm } = req.body;
    const existingOtp = await Otp.findOne({ email: email });

    if (!name || !email || !verificationCode || !password || !confirm) {
      return res.status(400).json({ message: 'All fields are mandatory.' });
    } else {
      if (!existingOtp) {
        return res.status(400).json({ message: 'First get verification code' });
      } else {
        if (verificationCode !== existingOtp.code) {
          return res.status(400).json({ message: 'Invalid verification code' });
        } else {
          if (password !== confirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
          } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user data to MongoDB
            const userRecord = new User({
              username: name,
              email: email,
              password: hashedPassword,
            });

            await userRecord.save();
            await Otp.findOneAndDelete({ email: email, type: 'signup' });
            res.status(201).json({ message: 'User signed up successfully' });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error during manual sign-up:', error);
    res.status(500).json({ message: 'Something went wrong with manual sign-up' });
  }
};


const signIn = async (req, res) => {
  try {
    const {username, email, password, type } = req.body;

    const user = await User.findOne({email})

    if(type == "google"){
      const userRecord = new User({
        username: username,
        email: email,
        type:type
      });

      await userRecord.save();

      const token = jwt.sign({
        user:{
          email: user.email,
        },
      }, process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h"}
      )
      res.status(200).json({status: "success", token: token})
    }
    else{
      if(!email){
        return res.status(400).json({ message: 'All fields are mandatory.' });
      }
      else{
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))){

          const token = jwt.sign({
            user:{
              username: user.username,
              email: user.email,
              id: user._id 
            },
          }, process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h"}
          )
          res.status(200).json({status: "success", token: token})
        }
        else{
          res.status(400).json({message: "User not found"})
        }
      }
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email, verificationCode, password, confirm } = req.body;
    const existingOtp = await Otp.findOne({ email: email, type: 'forgot' });

    if (!email || !verificationCode || !password || !confirm) {
      return res.status(400).json({ message: 'All fields are mandatory.' });
    }
    else{
      if(!existingOtp){
        return res.status(400).json({ message: 'First get verification code' });
      }
      else{
        if (verificationCode !== existingOtp.code) {
          return res.status(400).json({ message: 'Invalid verification code' });
        }
        else{
          if (password !== confirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
          }
          else{
             // Hash the password
             const hashedPassword = await bcrypt.hash(password, 10);
             // Save user data to MongoDB
             await User.updateOne({ email: email }, { $set: { password: hashedPassword } });
             await Otp.findOneAndDelete({ email: email, type: 'forgot' });

             // You can send a success response if needed
             res.status(200).json({ message: 'Password reset successfully' });
          }
        }
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}


module.exports = { sendOtp, signUp, signIn, forgotPassword };
