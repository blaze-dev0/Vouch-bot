const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userID: String,
  userVouched: String,
  vouchNum: Number,
  Status: String,
  UserTAG: String,
  Reason: String,
 }
)

const checkModel = module.exports = mongoose.model("check", Schema)