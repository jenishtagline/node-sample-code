const adminModel = require('../models/employee');
const bcryptService = require('../helpers/bcrypt')
const responseService = require('../helpers/response')
const userExists = require('../common/checkUser')
const tokenService = require('../helpers/jwt');
const mailService = require('../helpers/mail')
const { emailExists, registerSuccess, registerFailed, userNotExists, invalidPassword, loginSuccess, userLoginFailed, userInviteSuccess, userInviteFailed } = require('../helpers/responseMessage')
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
        const userDetails = await adminModel.findOne({ email }, { password: 1, roleId: 1, email: 1, _id: 1 }).lean().exec();

        //Validate password
        const isValidPassword = await bcryptService.validatePassword(password, userDetails.password)
        if (!isValidPassword) {
            return responseService.returnToResponse(res, {}, 400, '', invalidPassword)
        }

        //Generate JWT token 
        const token = tokenService.generateJWTToken({ id: userDetails._id, email: userDetails.email, role: userDetails.roleId })

        //Update user details
        await adminModel.findByIdAndUpdate(userDetails._id, { token }, { new: true });
        return responseService.returnToResponse(res, token, 200, '', loginSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userLoginFailed)
    }
}

//Service to add user
adminServiceObj.addUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const { email, role, firstName, lastName } = req.body;

        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresent(email);
        if (isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', emailExists)
        }

        //Add user data to the Employee
        await adminModel.create({ email, roleId: role })


        //Create verification code
        const verificationCode = Math.floor(Math.random() * 900000);

        //Invite user through email
        await mailService.sendInvitationEmail(email, { name: `${firstName} ${lastName}`, verificationCode, adminName })


        await adminModel.findByIdAndUpdate(userDetails._id, { token }, { new: true });
        return responseService.returnToResponse(res, token, 200, '', userInviteSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userInviteFailed);
    }
}

module.exports = adminServiceObj