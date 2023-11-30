const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const {uploadFile, getAllFile} = require("../controllers/fileControllers")
const multerMiddleware = require("../middleware/multerMiddleware");


router.post("/upload", auth, multerMiddleware, uploadFile);

router.get('/allFiles', auth, getAllFile);


module.exports = router;