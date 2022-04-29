const express = require("express");
const router = express.Router();
const adminRoute = require('../admin/index')
const userRoute = require('../user/index')
router.use("/admin", adminRoute);
router.use("/user", userRoute);
module.exports = router;
