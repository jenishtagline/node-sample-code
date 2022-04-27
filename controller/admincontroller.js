const exprees = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
 const validation = require("../middleware/joiValidation");
const Schema = require("../models/index");
const Schema1 = require("../models/employee")
const helpers = require("../helper/mail");
require("dotenv").config();
const cron = require('node-cron');

 let count = 1;
// let nameRegex = new RegExp(/^[a-zA-Z ]{3,30}$/);
let emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
// let hobbyRegex = new RegExp((/^[A-Za-z]{3,30}$/) );
// let password = new RegExp(
//   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
// );

exports.adminData = async (req, res) => {
  try {

    // const arrCreate = [];
    // if (!nameRegex.test(req.body.fname)) {
    //   arrCreate.push("fname must be text and minimum 3 characters");
    // }
    // if (!nameRegex.test(req.body.lname)) {
    //   arrCreate.push("lname must be text and minimum 3 characters");
    // }
    // if (
    //   req.body.contact.length !== 10 ||
    //   req.body.contact === null ||
    //   req.body.contact == ""
    // ) {
    //   arrCreate.push("contact must be 10 digit");
    // }
    // if (!emailRegex.test(req.body.email)) {
    //   arrCreate.push("please enter a valid email address");
    // }
    // if (req.body.address == null || req.body.address == "") {
    //   arrCreate.push("please enter your address");
    // }
    // if (!hobbyRegex.test(req.body.gender)) {
    //   arrCreate.push("you must select  male or female");
    // }
    // if (!hobbyRegex.test(req.body.hobby)) {
    //   arrCreate.push("please enter a valid hobby name");
    // }
    // if (!password.test(req.body.password)) {
    //   arrCreate.push("please enter a valid password");
    // }

    // const result = validation.joiSchema.validate(req.body);

    // if (result.error) {
    //   return res.send(arrCreate);
    // }else{
     const data = req.body;
      const bcryptpassword = await bcrypt.hash(data.password, 12);
    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    const CreatData = new Schema({
      fname: data.fname,
      lname: data.lname,
      contact: data.contact,
       email: data.email,
      address: data.address,
      gender: data.gender,
      hobby: data.hobby,
      otp: otp,
      password:bcryptpassword,
    });

    const saveData = await CreatData.save();
    res.send(saveData);

    const mail = helpers.mail(req.body.email, otp);
  // }// console.log("mail :>> ", mail);
    // }
  } catch (error) {
    res.send(error.message);
  }
}

exports.verifyData = async (req, res) => {
  let finddata = await Schema.findOne({ email: req.body.email });
  if (finddata.otp === req.body.otp) {
    res.send({ message: "adminRegister successfully" });
    const updateStatus = { $set: { status: "verified" } };
    await Schema.findOneAndUpdate({ email: req.body.email }, updateStatus);
  } else {
    if (count === 3) {
      res.send({ message: "You are blocked" });
      const updateStatus = { $set: { status: "blocked" } };
      await Schema.findOneAndUpdate({ email: req.body.email }, updateStatus);
    } else {
      res.send({ message: "invalid otp" });
    }

    count++;
  }
};

exports.loginData = async (req, res) => {
  const { email } = req.body;
  let data = "";
  if (emailRegex.test(email)) {
    data = await Schema.findOne({ email: req.body.email });
  } else {
    res.send("invalid email");
  }

  if (data) {
    const validpassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (validpassword) {
      res.status(200).json({ message: "login successfully" });
      const token = jwt.sign(
        {
          AdminId: data._id,
        },
        process.env.Token_secret,
        { expiresIn: "3600s" }
      );
      console.log(token);

  const task = cron.schedule('2 * * * *',()=>{

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.user,
          pass: process.env.pass,
        },
      });

      let mailOptions = {
        to: data.email,
        subject: "Admin Login",
        html:"<h1>You have a successfully login</h1>"
      };


      transporter.sendMail(mailOptions,(err, result) => {
        if(err) {
            return err;
        }else{
          console.log("Email successfully send");
          res.send(result.response);
        }
        
      })
    
     task.stop();
    })

 } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
};

exports.getData = async (req, res) => {
  try {
   

    if (req.query._id) {
      const displayData = await Schema.find({ _id: req.query._id });
      res.send(displayData);
    } else {
      const displayData = await Schema.find({});
      res.send(displayData);
    }
  

  } catch (error) {
    res.send(error);
  }
};

exports.updateData = async (req, res) => {
  try {
    // const arrUpdate = [];
    // if (!nameRegex.test(req.body.fname)) {
    //   arrUpdate.push("fname must be text and minimum 3 characters");
    // }
    // if (!nameRegex.test(req.body.lname)) {
    //   arrUpdate.push("lname must be text and minimum 3 characters");
    // }
    // if (
    //   req.body.contact.length !== 10 ||
    //   req.body.contact === null ||
    //   req.body.contact == ""
    // ) {
    //   arrUpdate.push("contact must be 10 digit");
    // }
    // if (!emailRegex.test(req.body.email)) {
    //   arrUpdate.push("please enter a valid email address");
    // }
    // if (req.body.address == null || req.body.address == "") {
    //   arrUpdate.push("please enter your address");
    // }
    // if (!hobbyRegex.test(req.body.gender)) {
    //   arrUpdate.push("you must select  male or female");
    // }
    // if (!hobbyRegex.test(req.body.hobby)) {
    //   arrUpdate.push("please enter a valid hobby name");
    // }

    // const updatevalidation = validation.joiSchema.validate(req.body);
    // if (updatevalidation.error) {
    //   res.send(arrUpdate);
    // } else {
      const userBcryptpassword = await bcrypt.hash(req.body.password,12)
      const userUpdateData = await Schema.findByIdAndUpdate(
        req.params.id,
        // req.body
        {$set:{contact: req.body.contact,address: req.body.address,hobby:req.body.hobby,password:userBcryptpassword}}
      );
      res.send(userUpdateData);
    // }
  } catch (error) {
    res.send(error);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const deleteData = await Schema.findByIdAndRemove(req.params.id);
    res.send(deleteData);
  } catch (error) {
    res.send;
  }
};

async function abc(){

  const getUseDeatils = await Schema1.find({},{email:1,department:1,role:1,AdminId:1,_id:0});
  // console.log(abc);
  
  const adminEmail =await Schema.find({},{email:1,_id:0})
    // console.log(adminEmail);
    // console.log(adminEmail[0]);
    
    const sentAllemail = cron.schedule('0 12 12-18 2 0',()=>{
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.user,
          pass: process.env.pass,
        },
      });

      let mailOptions = {
        to: adminEmail,
        subject: "User information",
        html:"<h1>Dear Admin,</h1>" + "<br />" + "<h2>Welcome to company </h2>" + "<p>This use information </p>" + '<br/>' +'<p>' + getUseDeatils  +'</p>'
      };
      
    transporter.sendMail(mailOptions,(err, result) => {
        if(err) {
            return err;
        }else{
          console.log("Email successfully send");
          res.send(result.response);
        }
        
      })
       sentAllemail.start()
       
    })

}
abc()