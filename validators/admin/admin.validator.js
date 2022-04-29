const Joi = require("joi");
const { requiredEmail, requiredPassword, requiredFirstName, requiredLastName, requiredUserRole, requiredUserId } = require('../../helpers/responseMessage')
const validatorObj = {};

validatorObj.userSignUpValidator = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': requiredFirstName,
    }),
    lastName: Joi.string().required().messages({
        'string.empty': requiredLastName
    }),
    userName: Joi.string().optional(),
    roleId: Joi.string().required().messages({
        'string.empty': requiredUserRole
    }),
    email: Joi.string().email().required().messages({
        'string.empty': requiredEmail
    }),
    password: Joi.string().required().messages({
        'string.empty': requiredPassword
    })
});

validatorObj.userLoginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': requiredEmail
    }),
    password: Joi.string().required().messages({
        'string.empty': requiredPassword
    })
});

validatorObj.addUserValidator = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': requiredFirstName,
    }),
    lastName: Joi.string().required().messages({
        'string.empty': requiredLastName
    }),
    roleId: Joi.string().required().messages({
        'string.empty': requiredUserRole
    }),
    email: Joi.string().email().required().messages({
        'string.empty': requiredEmail
    })
});

validatorObj.removeUserValidator = Joi.object({
    id: Joi.string().required().messages({
        'string.empty': requiredUserId
    })
});

validatorObj.updateUserValidator = Joi.object({
    id: Joi.string().required().messages({
        'string.empty': requiredUserId
    }),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    roleId: Joi.string().optional(),
});


module.exports = validatorObj