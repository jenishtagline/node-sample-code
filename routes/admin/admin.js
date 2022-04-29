const express = require("express");
const { adminSignUp, adminLogin, addUser, removeUser, updateUser } = require('../../services/admin.service.js')
const adminRoute = express.Router();
const validator = require("express-joi-validation");
const validatorQuery = validator.createValidator({});
const authMiddleware = require('../../middlewares/verify')
const { userSignUpValidator, userLoginValidator, addUserValidator, removeUserValidator, updateUserValidator } = require('../../validators/admin/admin.validator')


//Invite user
adminRoute.put(
    "/add-user",
    authMiddleware,
    validatorQuery.body(addUserValidator),
    addUser
);

//Admin sign-up
adminRoute.post(
    "/sign-up",
    validatorQuery.body(userSignUpValidator),
    adminSignUp
);

//Admin sign-in
adminRoute.post(
    "/login",
    validatorQuery.body(userLoginValidator),
    adminLogin
);

//Remove user
adminRoute.delete(
    "/remove-user",
    authMiddleware,
    validatorQuery.body(removeUserValidator),
    removeUser
);

//Update user
adminRoute.put(
    "/update-user",
    authMiddleware,
    validatorQuery.body(updateUserValidator),
    updateUser
);


module.exports = adminRoute;
