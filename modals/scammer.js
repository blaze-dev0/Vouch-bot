const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

 userID: String,
 scammer: String,
 reason: String,
 markedBy: String,
 }
)

const scamModel = module.exports = mongoose.model("scammers", Schema)