const express = require('express');
const authcation = require('../middleware/token')
const router = express.Router()
const validation = require("../middleware/joiValidation")
const adminData=require('../controller/admincontroller')

router.post('/admindata',validation.adminValidation,adminData.adminData)
router.post('/verify',adminData.verifyData)
router.post('/login',adminData.loginData)

router.get('/admin',authcation,adminData.getData)
router.patch('/admin/:id',authcation,validation.adminValidation,adminData.updateData)
router.delete('/admin/:id',authcation,adminData.deleteData)


module.exports = router