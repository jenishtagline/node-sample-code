const mongoose = require("mongoose");

const username = new mongoose.Schema({
    username:{
        type:String,
    }
  
})

module.exports = new mongoose.model("user",username)