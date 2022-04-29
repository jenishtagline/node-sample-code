const adminModel = require('../models/employee');
const roleModel = require('../models/role')
const bcryptService = require('../helpers/bcrypt')
const responseService = require('../helpers/response')
const userExists = require('../common/checkUser')
const tokenService = require('../helpers/jwt');
const mailService = require('../helpers/mail')
const { emailExists, registerSuccess, registerFailed, userNotExists, invalidPassword, loginSuccess, userLoginFailed, userInviteSuccess, userInviteFailed, invalidUserId, userRemoveFailed, userRemoveSuccess, restrictedToDeleteUser, restrictedToUpdateUser, userUpdateSuccess, userUpdateFailed } = require('../helpers/responseMessage')
const { validIObjectId } = require('../common/validObjectId')
const adminServiceObj = {};


//Service to register Admin user
adminServiceObj.adminSignUp = async (req, res) => {
    try {
        const { password, email, firstName, lastName, roleId } = req.body;

        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresentByEmail(email);
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
        const isUserPresentWithEmail = await userExists.checkIfUserPresentByEmail(email);
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
        const { email, roleId, firstName, lastName } = req.body;

        //Check if role is valid role
        const roleDetails = await roleModel.findById(roleId, { _id: 1 }).lean().exec()
        if (!roleDetails) {
            return responseService.returnToResponse(res, {}, 400, '', emailExists)
        }


        //Check if user exists with email
        const isUserPresentWithEmail = await userExists.checkIfUserPresentByEmail(email);
        if (isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', emailExists)
        }

        //Create verification code
        const verificationCode = Math.floor(Math.random() * 900000);

        //Invite user through email
        await mailService.sendInvitationEmail(email, { name: `${firstName} ${lastName}`, verificationCode, adminName: `${req.user?.firstName} ${req.user?.lastName}` })

        //Add user data to the Employee
        await adminModel.create({ email, roleId, verificationCode, addedBy: _id })
        return responseService.returnToResponse(res, {}, 200, '', userInviteSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userInviteFailed);
    }
}

//Service to remove user account
adminServiceObj.removeUser = async (req, res) => {
    try {
        const { id } = req.body;
        const { _id } = req.user;

        //Check if valid user id
        const isValid = validIObjectId(id);
        if (!isValid) {
            return responseService.returnToResponse(res, {}, 400, '', invalidUserId)
        }

        //Check if user exists
        const isUserPresentWithEmail = await userExists.checkIfUserPresent(id);
        if (!isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', userNotExists)
        }

        //Check if Admin has permission to remove user
        const isAdminAccess = await adminModel.findOne({ _id: id, addedBy: _id }, { _id: 1 }).lean().exec();
        if (!isAdminAccess) {
            return responseService.returnToResponse(res, {}, 400, '', restrictedToDeleteUser)
        }

        //Remove user 
        await adminModel.deleteOne({ _id: id });
        return responseService.returnToResponse(res, {}, 200, '', userRemoveSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userRemoveFailed);
    }
}

//Service to update user account
adminServiceObj.updateUser = async (req, res) => {
    try {
        const { id } = req.body;
        const { _id } = req.user;

        //Check if valid user id
        const isValid = validIObjectId(id);
        if (!isValid) {
            return responseService.returnToResponse(res, {}, 400, '', invalidUserId)
        }

        //Check if user exists
        const isUserPresentWithEmail = await userExists.checkIfUserPresent(id);
        if (!isUserPresentWithEmail) {
            return responseService.returnToResponse(res, {}, 400, '', userNotExists)
        }

        //Check if Admin has permission to update user
        const isAdminAccess = await adminModel.findOne({ _id: id, addedBy: _id }, { _id: 1 }).lean().exec();
        if (!isAdminAccess) {
            return responseService.returnToResponse(res, {}, 400, '', restrictedToUpdateUser)
        }

        const updateUserObj = {}
        Object.keys(req.body).map(function (key) {
            if (key !== 'id') {
                updateUserObj[key] = req.body[key]
            }
        });

        await adminModel.findByIdAndUpdate(id, { $set: updateUserObj }, { new: true })
        return responseService.returnToResponse(res, {}, 200, '', userUpdateSuccess)
    } catch (error) {
        return responseService.returnToResponse(res, {}, 500, error.message, userUpdateFailed);
    }
}

module.exports = adminServiceObj