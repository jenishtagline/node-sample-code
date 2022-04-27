const express = require("express");
const { adminSignUp, adminLogin } = require('../../services/admin.service.js')
const adminRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const { userSignUpValidator, userLoginValidator } = require('../../validators/admin/admin.validator')

adminRoute.post(
    "/sign-up",
    validatorQuery.body(userSignUpValidator),
    adminSignUp
);

adminRoute.post(
    "/login",
    validatorQuery.body(userLoginValidator),
    adminLogin
);



module.exports = adminRoute;
