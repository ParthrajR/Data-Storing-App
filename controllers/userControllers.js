
const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async(req, res)=> {
  // Check for existing user
  // Hash password generate
  // User creation
  // Token Generate

  const {username, email, password} = req.body;
  try {
    const existingUser = await User.findOne({email: email})
    if(!username || !email || !password){
      return res.status(400).json({message:"All fields are mendatory"})
    }
    if(existingUser){
      return res.status(400).json({message:"User already exists"})
    }
    

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email: email,
      password: hashPassword,
      username: username
    })

    const token = jwt.sign({email: result.email, id: result._id}, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).json({message: "User registered successfully", user: result, token:token})

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong"})
  }

}

const signin = async(req, res)=> {
  const {email, password} = req.body;

  try {
    
    const existingUser = await User.findOne({email: email})

    if(!email || !password){
      return res.status(400).json({message:"All fields are mendatory"})
    }
    if(!existingUser){
      return res.status(400).json({message:"User not found"})
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if(!matchPassword){
      return res.status(400).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({message: "User login successfully", token:token})



  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong"})
  }
}

module.exports = {signup, signin}