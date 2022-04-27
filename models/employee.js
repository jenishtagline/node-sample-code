const mongoose = require("mongoose");

const Userdata = new mongoose.Schema({

    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    },
    profile: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    }

});

module.exports = mongoose.model('employee', Userdata);