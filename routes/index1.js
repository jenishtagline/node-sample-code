const express = require('express')
const router = express.Router()


router.use("/admin", require('./adminRouter'));
router.use("/user",require('./userRouter'));

module.exports = router;