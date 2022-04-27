const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const generator = require("generate-password");
const Schema1 = require("../models/employee");
const upload = require("../helper/multer");
const validation = require("../middleware/joiValidation");
const helpers = require("../helper/mail");
require("dotenv").config();

let userRegex = new RegExp(/^[a-zA-Z ]{3,30}$/);
let emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
let genderRegex = new RegExp(/^[a-zA-Z ]/);

exports.createData = async (req, res) => {
  try {
    // const arr = [];
    // if (!userRegex.test(req.body.fname)) {
    //   arr.push("fname must be text and minimum 3 characters");
    // }
    // if (!userRegex.test(req.body.lname)) {
    //   arr.push("lname must be text and minimum 3 characters");
    // }
    // if (!emailRegex.test(req.body.email)) {
    //   arr.push("please enter a valid email address");
    // }
    // if (!genderRegex.test(req.body.department)) {
    //   arr.push("please enter your department name");
    // }
    // if (!genderRegex.test(req.body.role)) {
    //   arr.push("please enter your role name");
    // }

    // const result = validation.joiSchema1.validate(req.body);
    // console.log(result);

    // if (result.error) {
    //   res.send(arr);
    // } else {
      const uploadimage = await upload.uplodaImage(req.file.path);

      const password = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: false,
      });

      const bcryptPassword = await bcrypt.hash(password, 12);

      const userCreateData = new Schema1({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role,
        profile: uploadimage.url,
        password: bcryptPassword,
        username: req.body.fname + "_" + req.body.lname,
        AdminId: req.user.AdminId,
      });

      const userData = await userCreateData.save();
      res.send(userData);

      const userEmail = helpers.userEmail(
        req.body.email,
        password,
        req.body.fname + "_" + req.body.lname
      );
      // console.log("userEmail :>> ", userEmail);
    // }
  } catch (error) {
    res.send(error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { input } = req.body;
    
    let data = "";

    if (emailRegex.test(input)) {
      data = await Schema1.findOne({ email: req.body.input });
    } else {
      data = await Schema1.findOne({ username: req.body.input });
    }

    if (data) {
      const validationEmail = await bcrypt.compare(
        req.body.password,
        data.password
      );

      if (validationEmail) {
        res.status(200).json({ message: "user login successfully" });
      } else {
        res.status(400).json({ message: "password invalid" });
      }
    } else {
      res.status(401).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    const deleteData = await Schema1.findByIdAndRemove(req.params.id);
    res.send(deleteData);
  } catch (error) {
    console.log(error);
  }
};

exports.userGet = async (req, res) => {
  try {
    const userDataDisplay = await Schema1.findById(req.params.id);
    res.send(userDataDisplay);
  } catch (error) {
    res.send(error);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    // const arrUpdate = [];
    // let usernameRegex = new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/);
    // let passwordRegex = new RegExp(
    //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    // );

    // if (!genderRegex.test(req.body.department)) {
    //   arrUpdate.push("please enter your department name");
    // }
    // if (!genderRegex.test(req.body.role)) {
    //   arrUpdate.push("please enter your role name");
    // }
    // if (!usernameRegex.test(req.body.username)) {
    //   arrUpdate.push("please enter a valid username");
    // }
    // if (!passwordRegex.test(req.body.password)) {
    //   arrUpdate.push("please enter a  valid password");
    // }

    const bcryptpassword1 = await bcrypt.hash(req.body.password, 12);
    const uploadimage1 = await upload.uplodaImage(req.file.path);

    // const result1 = validation.joiSchema1.validate(req.body);
    // if (result1.error) {
    //   res.send(arrUpdate);
    // } else {
      const updateUser = await Schema1.findOneAndUpdate(
        { email: req.body.email },
        {$set:{department:req.body.department,role:req.body.role,profile:uploadimage1.url,password:bcryptpassword1,username:req.body.username}}
      );
      res.send(updateUser);
    // }
  } catch (error) {
    res.send(error);
  }
};
