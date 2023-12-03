const express = require('express');
const {sendOtp, signUp, signIn} = require("../controllers/userControllers")

const router = express.Router();

router.post('/sendotp', sendOtp);
router.post('/signup', signUp)
router.post('/login', signIn)


module.exports = router;