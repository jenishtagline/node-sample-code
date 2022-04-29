const Joi = require("joi");
const { requiredEmail, requiredPassword, requiredFirstName, requiredLastName, requiredVerificationCode } = require('../../helpers/responseMessage')
const validatorObj = {};


validatorObj.setupAccountValidator = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': requiredFirstName,
    }),
    lastName: Joi.string().required().messages({
        'string.empty': requiredLastName
    }),
    email: Joi.string().email().required().messages({
        'string.empty': requiredEmail
    }),
    password: Joi.string().required().messages({
        'string.empty': requiredPassword
    }),
    verificationCode: Joi.string().required().messages({
        'string.empty': requiredVerificationCode
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

validatorObj.updateProfileValidator = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional()
});

module.exports = validatorObj