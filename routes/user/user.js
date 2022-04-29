const express = require("express");
const { setupAccount, userLogin, updateProfile } = require('../../services/user.service')
const userRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const { setupAccountValidator, userLoginValidator, updateProfileValidator } = require('../../validators/user/user.validator')
const { verifyUser } = require('../../middlewares/verify')
const { upload } = require('../../helpers/multer')

userRoute.post(
    "/setup-account",
    validatorQuery.body(setupAccountValidator),
    setupAccount
);

userRoute.post(
    "/login",
    validatorQuery.body(userLoginValidator),
    userLogin
);

userRoute.put(
    "/update-profile",
    upload,
    verifyUser,
    validatorQuery.body(updateProfileValidator),
    updateProfile
);




module.exports = userRoute;
