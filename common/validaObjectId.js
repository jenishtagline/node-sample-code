const mongoose = require('mongoose');

const validIObjectId = (id) => {
    return mongoose.isValidObjectId(id)
}

module.exports = { validIObjectId }