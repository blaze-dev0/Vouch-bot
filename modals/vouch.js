const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userID: String,
  userTAG: String,
  vouchNum: Number,
  comment: String,
  vouchAuthor: String,
  Status: String,
 }
)

const vouchModel = module.exports = mongoose.model("vouch", Schema)