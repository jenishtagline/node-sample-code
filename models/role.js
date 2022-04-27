const mongoose = require("mongoose");

const role = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
});

module.exports = mongoose.model('role', role);