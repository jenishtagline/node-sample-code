// const express = require('express');
// const app = express();
// const router = express.Router()
// const Joi = require('joi');
// const validator = require('express-joi-validation').createValidator({})
// const nodemailer = require('nodemailer');
// const bodyparser = require('body-parser');
// const bcrypt = require('bcrypt');
// require('../db/db.js');
// const jwt = require("jsonwebtoken")
// const Schema1 = require('../models/index.js')
// app.use(express.json())
// require('dotenv').config();
// app.use(bodyparser.urlencoded({extended: false}))
// const authicationUser= require('../middleware/user.js')


// router.get('/admin',authicationUser,async(req, res) =>{
//     try {
//         const displayData = await Schema1.find({});
//         res.send(displayData)
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.get('/admin/:id',authicationUser, async(req, res) =>{
//     try {
//         const displayData1 = await Schema1.findById(req.params.id);
//         res.send(displayData1)
//     } catch (error) {
//         res.send(error)
//     }
// })

// let otp = Math.random()
// otp = otp * 1000000;
// otp = parseInt(otp);

// router.post('/admin',async(req,res)=>{
//      const bcryptpassword = await bcrypt.hash(req.body.password,12)
//     const token = jwt.sign({contact:req.body.contact,email:req.body.email,password:req.body.password},process.env.Token_secret)
    

//     let formData = new Schema1({
//         fname:req.body.fname,
//         lname:req.body.lname,
//         contact:req.body.contact,
//         email:req.body.email,
//         address:req.body.address,
//         gender:req.body.gender,
//         hobby:req.body.hobby,
//         otp:otp,
//         password:bcryptpassword,
//          status:req.body.status,
//           token:token
//     })

//     const joiSchema = Joi.object().keys({
//         fname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//         lname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//         contact:Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
//         email:Joi.string().email().pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
//         address:Joi.string().required(),
//         gender:Joi.string().required(),
//         hobby:Joi.string().required(),
//         password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
      
//     })
    
//      try {
       
//         const result = joiSchema.validate(req.body);

//         if(result.error){
//             res.send(result.error);
//         }else{
//             const saveData =await formData.save()
//              res.send(saveData);
//         }

//    let transporter =nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:process.env.user,
//                 pass:process.env.pass
//             }
//         })
//         let mailOptions={
//             to:req.body.email,
//             subject:"otp for registration",
//             html:"<h3>OTP for account verification is</h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" 
//         }
//        transporter.sendMail(mailOptions,(err,info)=>{
//             if(err){
//                return console.log(err);
//              }
//             else{
//                 res.send('email send:' + info.response)
//             }
//         });
        
//     } catch (error) {
//         res.send(error)
//     }
// })


// router.post('/verify',authicationUser,async(req,res)=>{
    
//    let finddata = await Schema1.findOne({email:req.body.email})
//     if(finddata.otp==req.body.otp){
        
//         res.send("Register successfully");
//         const updateStatus = {$set:{status:"verified"}};
//         await Schema1.findOneAndUpdate({email:req.body.email}, updateStatus);
//         let transporter =nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:process.env.user,
//                 pass:process.env.pass
//             }
//         })
//         let mailOptions={
//             to:req.body.email,
//             subject:"Email and password ",
//             html:"<h3>your Email and password </h3>" + "<h1 style='font-weight:bold;'>" + req.body.email + "</h1>" + "<br>" + "<h1 style='font-weight:bold;'>" + finddata.password+ "</h1>"
//         }
//        transporter.sendMail(mailOptions,(err,info)=>{
//             if(err){
//                return console.log(err);
//              }
//             else{
//                 res.send('email sent:' + info.response)
//             }
//         });

//     }else{
//         res.send("invalid otp");
//         const updateStatus = {$set:{status:"blocked"}};
//         await Schema1.findOneAndUpdate({email:req.body.email}, updateStatus);
//     }
      
    
// })

// // app.post('/resend',(req,res) => {
// //     let mailOptions={
// //         to:req.body.email,
// //         subject:"otp for registration",
// //         html:"<h3>OTP for account verification is</h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" 
// //     }
// //    transporter.sendMail(mailOptions,(err,info)=>{
// //         if(err){
// //            return console.log(err);
// //          }
// //         else{
// //             res.send('email sent:' + info.response)
// //         }
// //     });
// // })

// router.post('/login',authicationUser,async(req,res) => {
  
//     const {email} = req.body;
//     let data ='';
//     let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if(emailRegex.test(email)){
//         data = await Schema1.findOne({email:req.body.email})
//     }else{
//         res.send('invalid email')
//     }
      
//     if(data){
//             const validpassword = await bcrypt.compare(req.body.password,data.password);
//             if(validpassword){
//                 res.status(200).json({message:"login successfully"})
//             }else{
//                 res.status(400).json({message:"Invalid password"})
//             }
//         }else{
//             res.status(401).json({message:"User does not exist"})
//         }
// })





// router.patch('/admin/:id',authicationUser,async(req,res)=>{
//     try {

//         const joiSchema1 = Joi.object().keys({
//             fname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//             lname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required(),
//             contact:Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
//             email:Joi.string().email().required(),
//             address:Joi.string().required(),
//             gender:Joi.string().required(),
//             hobby:Joi.string().required(),
//             password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
         
//         })

//         const result1 = joiSchema1.validate(req.body);

//         if(result1.error){
//             res.send(result1.error)
//         }else{
//              const updateData = await Schema1.findByIdAndUpdate(req.params.id,{$set:{fname:req.body.fname,
//             lname:req.body.lname,
//             contact:req.body.contact,
//             email:req.body.email,
//             address:req.body.address,
//             gender:req.body.gender,
//             hobby:req.body.hobby}})
//             res.send(updateData)
//     } }catch (error) {
//         res.send(error)
//     }
// })

// router.delete('/admin/:id',authicationUser,async(req,res)=>{
//     try {
//         const deleteData = await Schema1.findByIdAndRemove(req.params.id);
//         res.send(deleteData);
        
//     } catch (error) {
//         console.log(error);
//     }
// })




// module.exports = router