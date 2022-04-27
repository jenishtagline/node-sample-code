const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.database)
    .then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(err);
    })

module.exports = mongoose;