const express = require("express");
const { adminSignUp, adminLogin, addUser, removeUser } = require('../../services/admin.service.js')
const adminRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const authMiddleware = require('../../middlewares/verify')
const { userSignUpValidator, userLoginValidator, addUserValidator, removeUserValidator } = require('../../validators/admin/admin.validator')

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

adminRoute.delete(
    "/remove-user",
    authMiddleware,
    validatorQuery.body(removeUserValidator),
    removeUser
);



module.exports = adminRoute;
