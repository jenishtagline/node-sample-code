const Joi = require("joi");
const { requiredEmail, requiredPassword, requiredFirstName, requiredLastName, requiredUserRole } = require('../../helpers/responseMessage')
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



module.exports = validatorObj