const mongoose = require("mongoose");

const Userdata = new mongoose.Schema({

    fname: {
        type:String,
    
      },
      lname: { 
          type: String,
           
      },
      email:{
          type: String,
          unique: true,
        
      },
      department:{
          type:String,
      },
      role:{
          type:String,
      },
      profile:{
          type:String,
      },
      password:{
          type:String,
      },
      username:{
          type:String,
      },
      AdminId:{
          type:String,
      }
      
});

module.exports = mongoose.model('userdatas',Userdata);