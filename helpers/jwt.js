const jwt = require('jsonwebtoken');

const generateJWTToken = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.log("Failed to sign JWT token", error.message)
        throw error
    }
}


const decodeJWTToken = (data) => {
    try {

    } catch (error) {
        console.log("Failed to decode JWT token", error.message)
        throw error
    }
}

module.exports = { generateJWTToken, decodeJWTToken }