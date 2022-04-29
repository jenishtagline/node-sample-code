const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const mailServiceObj = {}

exports.mail = (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    to: email,
    subject: "otp for registration",
    html:
      "<h3>OTP for account verification is</h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>",
  };

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      return err;
    } else {
      console.log(result.response);
    }

  })
  return mailOptions;

}


exports.userEmail = (email, password, username) => {


  const UserEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });


  let userEmailandusername = {
    from: process.env.user,
    to: email,
    subject: "Your this department and this role",
    html:
      "<h1>Your Email is : </h1>" +
      email +
      "<h1>And your username is : </h1>" +
      username +
      "<h1>And your Password is : </h1>" +
      password,
  };

  UserEmail.sendMail(userEmailandusername, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email send:" + info.response);
    }
  });


  return userEmailandusername;

}


const mailerTransporter = (subject, email, data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  return transporter;
}

//Function to send verficiation mail to user
mailServiceObj.sendInvitationEmail = async (email, emailPayload) => {
  try {
    const { verificationCode, name, adminName } = emailPayload
    const ejsFileDetails = await ejs.renderFile(process.cwd() + "/templates/invitation.ejs", { name, verificationCode, adminName });

    const transporter = await mailerTransporter();
    const mainOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You have been invited!',
      html: ejsFileDetails
    };

    await transporter.sendMail(mainOptions);
    return true;
  } catch (error) {
    console.log("Failed to send invitation email");
    throw error;
  }
}

module.exports = mailServiceObj