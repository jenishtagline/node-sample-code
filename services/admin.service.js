const adminModel = require('../models/employee');
const bcryptService = require('../helpers/bcrypt')
const responseService = require('../helpers/response')
const userExists = require('../common/checkUser')
const { emailExists, registerSuccess, registerFailed, userNotExists, invalidPassword } = require('../helpers/responseMessage')
const adminServiceObj = {};


//Service to register Admin user
adminServiceObj.adminSignUp = async (req, res) => {
    try {
        const { password, email, firstName, lastName, roleId } = req.body;

        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresent(email);
        if (isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', emailExists)
        }

        //Generate an encrypted password
        const encryptedPassword = await bcryptService.generatEncryptedPassword(password)
        const newAdmin = await adminModel.create({ email, password: encryptedPassword, firstName, lastName, roleId, userName: req.body?.userName });
        return responseService.returnToResponse(res, newAdmin, 200, '', registerSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, registerFailed)
    }
}

//Service to Admin login
adminServiceObj.adminLogin = async (req, res) => {
    try {
        const { password, email } = req.body;

        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresent(email);
        if (!isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', userNotExists)
        }
        const userDetails = await adminModel.findOne({ email }, { password: 1 }).lean().exec();
        //Compare password with encrypted password
        const isValidPassword = await bcryptService.validatePassword(password, userDetails.password)
        if (!isValidPassword) {
            return responseService.returnToResponse(res, {}, 400, '', invalidPassword)
        }

        //Generate JWT token 

        const newAdmin = await adminModel.create({ email, password: encryptedPassword, firstName, lastName, roleId, userName: req.body?.userName });
        return responseService.returnToResponse(res, newAdmin, 200, '', registerSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, registerFailed)
    }
}

module.exports = adminServiceObj