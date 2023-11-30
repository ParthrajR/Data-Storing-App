const express = require('express');
const {signup, signin} = require("../controllers/userControllers")

const router = express.Router();

router.post('/register', signup);
router.post('/login', signin)
// router.get("/current", validateToken)
// router.post('/forgotpassword', forgotPassword)

// router.get('/', userControllers.getAll)

module.exports = router;