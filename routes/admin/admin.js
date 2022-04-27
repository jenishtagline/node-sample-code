const express = require("express");
const { adminSignUp, adminLogin, addUser } = require('../../services/admin.service.js')
const adminRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const authMiddleware = require('../../middlewares/verify')
const { userSignUpValidator, userLoginValidator, addUserValidator } = require('../../validators/admin/admin.validator')

adminRoute.put(
    "/add-user",
    authMiddleware,
    validatorQuery.body(addUserValidator),
    addUser
);

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
