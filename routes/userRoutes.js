const express = require('express');
const {sendOtp, signUp, signIn, forgotPassword, getAllUser} = require("../controllers/userControllers")

const router = express.Router();

router.post('/sendotp', sendOtp);
router.post('/signup', signUp)
router.post('/login', signIn)
router.post('/forgotpassword', forgotPassword)
router.get('/users', getAllUser)

module.exports = router;