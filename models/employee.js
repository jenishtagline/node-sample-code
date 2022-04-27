const mongoose = require("mongoose");

const Userdata = new mongoose.Schema({

    fname: {
        type: String,

    },
    lname: {
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

});

module.exports = mongoose.model('userdatas', Userdata);