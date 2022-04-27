const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB connection successfull");
    }).catch((err) => {
        console.log("There is something wrong while db connection", err.message);
    })
