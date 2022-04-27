const express = require("express");
const router = express.Router();
const adminRoute = require('../admin/index')
router.use("/admin", adminRoute);
module.exports = router;
