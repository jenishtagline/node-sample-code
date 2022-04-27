const express = require("express")
const adminService = require('./admin')
const router = express.Router();

router.use("/", adminService);
module.exports = router;
