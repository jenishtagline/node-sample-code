const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  hobby: {
    type: String,
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("admin2", adminSchema);
