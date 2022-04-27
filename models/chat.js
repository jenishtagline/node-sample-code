const mongoose = require("mongoose");

const chat = new mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    message:{
        type:String,
    },
    room:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now(),
    }
  
})

module.exports = new mongoose.model("chat",chat)