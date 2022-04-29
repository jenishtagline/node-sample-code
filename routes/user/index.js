const express = require("express")
const userService = require('./user')
const router = express.Router();

router.use("/", userService);
module.exports = router;
