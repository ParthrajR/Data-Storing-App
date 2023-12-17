const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { getfreeSpace } = require("../controllers/freeSpaceController")

router.post("/freeSpace", auth, getfreeSpace);


module.exports = router;