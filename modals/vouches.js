const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userID: String,
  pen_vouches: Number,
  app_vouches: Number,
  dec_vouches: Number,
  veri_vouches: Number,
  unreps: Number,
  overall_vouches: Number,
 }
)

const userModel = module.exports = mongoose.model("user", Schema)