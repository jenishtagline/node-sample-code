const express = require("express");
const { setupAccount, userLogin } = require('../../services/user.service')
const userRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const { setupAccountValidator, userLoginValidator } = require('../../validators/user/user.validator')

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



module.exports = userRoute;
