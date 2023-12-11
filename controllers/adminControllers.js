const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are mandatory.' });
      }
  
      const existingUser = await Admin.findOne({ email: email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save user data to MongoDB
      const adminRecord = new Admin({
        username: username,
        email: email,
        password: hashedPassword,
      });
  
      await adminRecord.save();
  
      res.status(201).json({ message: 'Admin signed up successfully', Admin: adminRecord });
    } catch (error) {
      console.error('Error during manual sign-up:', error);
      res.status(500).json({ message: 'Something went wrong with manual sign-up' });
    }
  };
  

  module.exports = { signUp };
