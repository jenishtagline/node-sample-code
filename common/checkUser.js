const userModel = require('../models/employee');


//Function to check if user is present with email
const checkIfUserPresentByEmail = async (email) => {
    try {
        const isUserExists = await userModel.findOne({ email }, { email: 1 }).lean().exec();
        return isUserExists ? true : false;
    } catch (error) {
        throw error;
    }
}

//Function to check if user present by id
const checkIfUserPresent = async (id) => {
    try {
        const isUserExists = await userModel.findById(id, { _id: 1 }).lean().exec();
        return isUserExists ? true : false;
    } catch (error) {
        throw error;
    }
}



module.exports = { checkIfUserPresentByEmail, checkIfUserPresent };


