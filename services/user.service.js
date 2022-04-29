const userModel = require('../models/employee');
const bcryptService = require('../helpers/bcrypt')
const responseService = require('../helpers/response')
const userExists = require('../common/checkUser')
const tokenService = require('../helpers/jwt')
const { userNotExists, invalidPassword, setupAccountFailed, accountSetupSuccess, invalidVerificationCode, loginSuccess, userLoginFailed, imageShouldNotBeEmpty, userProfileUpdateSuccess, userProfileUpdateFailed } = require('../helpers/responseMessage')
const userServiceObj = {};

//Service to user login
userServiceObj.userLogin = async (req, res) => {
    try {
        const { password, email } = req.body;

        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresentByEmail(email);
        if (!isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', userNotExists)
        }
        const userDetails = await userModel.findOne({ email }, { password: 1, roleId: 1, email: 1, _id: 1 }).lean().exec();

        //Validate password
        const isValidPassword = await bcryptService.validatePassword(password, userDetails.password)
        if (!isValidPassword) {
            return responseService.returnToResponse(res, {}, 400, '', invalidPassword)
        }

        //Generate JWT token 
        const token = tokenService.generateJWTToken({ id: userDetails._id, email: userDetails.email, role: userDetails.roleId })

        //Update user details
        await userModel.findByIdAndUpdate(userDetails._id, { token }, { new: true });
        return responseService.returnToResponse(res, token, 200, '', loginSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userLoginFailed)
    }
}

//Service to setup account
userServiceObj.setupAccount = async (req, res) => {
    try {
        const { password, email, verificationCode, firstName, lastName } = req.body;

        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresentByEmail(email);
        if (!isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', userNotExists)
        }

        const userDetails = await userModel.findOne({ email, verificationCode }, { _id: 1 }).lean().exec();
        if (!userDetails) {
            return responseService.returnToResponse(res, {}, 400, '', invalidVerificationCode)
        }

        const encryptedPassword = await bcryptService.generatEncryptedPassword(password);

        //Update user details
        await userModel.findByIdAndUpdate(userDetails._id, {
            $set: {
                firstName,
                lastName,
                password: encryptedPassword
            }
        }, { new: true });
        return responseService.returnToResponse(res, {}, 200, '', accountSetupSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, setupAccountFailed)
    }
}

//Update user profile
userServiceObj.updateProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        if (!req.file) {
            return responseService.returnToResponse(res, {}, 400, '', imageShouldNotBeEmpty)
        }
        //Update user details
        await userModel.findByIdAndUpdate(_id, {
            $set: {
                profile: `/${req.file.path}`
            }
        }, { new: true });
        return responseService.returnToResponse(res, {}, 200, '', userProfileUpdateSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userProfileUpdateFailed)
    }
}
module.exports = userServiceObj