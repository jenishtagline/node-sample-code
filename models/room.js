const mongoose = require("mongoose");

const room = new mongoose.Schema({
    roomname:{
        type:String,
    },
    clientid:{
        type:String,
    },
    username:{
        type:String,
    }
  
})

module.exports = new mongoose.model("room",room)