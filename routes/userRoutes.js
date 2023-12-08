const express = require('express');
const {sendOtp, signUp, signIn, forgotPassword} = require("../controllers/userControllers")

const router = express.Router();

router.post('/sendotp', sendOtp);
router.post('/signup', signUp)
router.post('/login', signIn)
router.post('/forgotpassword', forgotPassword)

module.exports = router;