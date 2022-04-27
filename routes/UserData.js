// const express = require("express");
// const router = express.Router();
// const Joi = require("joi");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const generator = require("generate-password");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// //const upload1 = multer();
// require("../db/db.js");
// // const Schema1 = require('../controller/index.js')
// const Schema2 = require("../models/userData.js");
// const authicationUser = require("../middleware/user.js");
// const cloudinary = require("cloudinary").v2;
// const cloudinary1 = require("../config/cloudconfig.js");
// const { default: mongoose } = require("mongoose");
// const assert = require("assert");
// const { read } = require("fs");
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// const password = generator.generate({
//   length: 10,
//   numbers: true,
//   lowercase: true,
//   uppercase: false,
// });
// //console.log(password);
                


// router.post( "/userdata",authicationUser, upload.single("profile"), async (req, res) => {
//     //console.log(req.file);

//     const result1 = await cloudinary.uploader.upload(
//       req.file.originalname,
//       (error, result) => {
//        // console.log("result :>> ", result);
//         return result;
//       }
//     );

//     const bcryptPassword =  await bcrypt.hash(password, 12);
//     // const data = await Schema1.findOne(process.env._id);
//     const userData = new Schema2({
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       password: bcryptPassword,
//       department: req.body.department,
//       role: req.body.role,
//       profile: result1.url,
//       username:req.body.fname + '_' + req.body.lname,
//       AdminEmail:req.user.email
//     });
 
//      const JoiSchema = Joi.object().keys({
//       fname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//       lname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//       email:Joi.string().email().pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
//       department:Joi.string().required(),
//       role:Joi.string().required(),
      
//      })



//     try {

//       const result = JoiSchema.validate(req.body);

//       if(result.error){
//         res.send(result.error)
//       }else{

//         const userCreate = await userData.save();
//         res.send(userCreate);
//       }

//       const UserEmail = nodemailer.createTransport({
//           service:'gmail',
//           auth:{
//               user:process.env.user,
//               pass:process.env.pass
//           }
//       })
//       let userEmail={
//           from: process.env.user,
//           to:req.body.email,
//           subject:"Your this department and this role",
//           html: "<h1>Your Email is : </h1>" + req.body.email +"<h1>And your username is : </h1>" + req.body.fname + '_' + req.body.lname + "<h1>And your Password is : </h1>" + password 

//       }
//       UserEmail.sendMail(userEmail,(err,info)=>{
//           if(err){
//               return console.log(err)
//           }else{
//               res.send('email send:' + info.response)
//           }
//       })
//     } catch (error) {
//       res.send(error);
//     }
//   }
// );



// router.post("/userLogin",authicationUser, async (req, res,next) => {

//    const {input, password} = req.body;
//   let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   let data = ''

//   if (emailRegex.test(input)) {
//     data = await Schema2.findOne({ email: req.body.input });
//   } else{
//     data = await Schema2.findOne({ username: req.body.input });
//   }
  
//    console.log(data);
// //res.send(userEmail)
//   if (data ) {
//    const validationEmail = await bcrypt.compare(
//       req.body.password,
//       data.password
//     );
  
//     if (validationEmail) {
//       res.status(200).json({ message: "user login successfully" });
      
//     } else {
//       res.status(400).json({ message: "password invalid" });
//     }
//   } else {
//     res.status(401).json({ message: "User does not exist" });
//   }
  
// });


// const storage1 = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload1 = multer({ storage1: storage1 });


// // router.patch('/userdata/:id',authicationUser,upload1.single("profile"),async(req,res) => {
// //   const updateImage = await cloudinary.uploader.upload(
// //     req.file.originalname,
// //     (error, result) => {
// //      // console.log("result :>> ", result);
// //       return result;
// //     }
// //   );
   
// //   const regexusername= /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/
// //   const checkregexUsername = regexusername.test(req.body.username);
// //   if(checkregexUsername){
// //   const bcryptpassword1 = await bcrypt.hash(req.body.password,12);
// //   const updatedata = await Schema2.findByIdAndUpdate(req.params.id,{$set:{
// //     fname: req.body.fname,
// //       lname: req.body.lname,
// //       email:req.body.email,
// //       password: bcryptpassword1,
// //       department: req.body.department,
// //       profile: updateImage.url,
// //       role: req.body.role,
// //       username:req.body.username,
// //   }})
// //   res.send(updatedata);
// // }
// // })


// router.patch('/userdata',authicationUser,upload1.single("profile"), async (req, res)=>{
  
//   try {
//     const updateImage = await cloudinary.uploader.upload(req.file.originalname,(err,result)=>{
//       return result;
//     })
//     const bcryptpassword1 = await bcrypt.hash(req.body.password,12);
  
//    const userValidation = Joi.object().keys({
//       fname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//       lname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//       email:Joi.string().email().required(),
//       password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
//       department:Joi.string().required(),
//       role:Joi.string().required(),
//       username:Joi.string().pattern(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/).required()
    
//    })
   
//     const resultData = userValidation.validate(req.body)

//      if(resultData.error){
//        res.send(resultData.error)
//      }else{
//    const updateStatus = {$set:{password:bcryptpassword1,profile:updateImage.url,username:req.body.username,role:req.body.role,department:req.body.department}};
//       const updateUser=await Schema2.findOneAndUpdate({email:req.body.email}, updateStatus);
//       res.send(updateUser)
//      }
  
//   } catch (error) {
//     res.send(error)
//   }
  
// })



// router.get('/userdata/:id',authicationUser,async(req, res) => {
//   const userDataDisplay = await Schema2.findById(req.params.id);
//   res.send(userDataDisplay)
// })

// router.delete('/userdata/:id',authicationUser,async(req,res)=>{
//   try {
//       const deleteData = await Schema2.findByIdAndRemove(req.params.id);
//       res.send(deleteData);
      
//   } catch (error) {
//       console.log(error);
//   }
// })

// module.exports = router
