const express = require("express");
const { adminSignUp } = require('../../services/admin.service.js')
const adminRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const { userSignUpValidator } = require('../../validators/admin/admin.validator')

adminRoute.post(
    "/sign-up",
    validatorQuery.body(userSignUpValidator),
    adminSignUp
);


module.exports = adminRoute;
