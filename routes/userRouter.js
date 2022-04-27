const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const validation = require('../middleware/joiValidation')
const authcation = require('../middleware/token')
const usercontroller = require('../controller/usercontroller');


router.post('/userdata',authcation, upload.upload.single('profile'), validation.userValidation,usercontroller.createData)
router.post('/userlogin',authcation, usercontroller.userLogin)

router.delete('/userdata/:id',authcation,usercontroller.userDelete)
router.get('/userdata/:id',authcation,usercontroller.userGet)

router.patch('/userdata',authcation,upload.upload.single('profile'),validation.userValidation,usercontroller.userUpdate)

module.exports = router;