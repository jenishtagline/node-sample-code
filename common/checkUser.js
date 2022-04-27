const userModel = require('../models/employee');


//Function to check if user is present with email
const checkIfUserPresent = async (email) => {
    try {
        const isUserExists = await userModel.findOne({ email }, { email: 1 }).lean().exec();
        return isUserExists ? true : false;
    } catch (error) {
        console.log("Failed to check user existance", error.message)
        throw error;
    }
}



module.exports = { checkIfUserPresent };


