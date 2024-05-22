const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

 userID: String,
 blacklisted: String,
 reason: String,
 markedBy: String,
 }
)

const blackModel = module.exports = mongoose.model("blacklisted", Schema)