const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

 userID: String,
 dwc: String,
 reason: String,
 markedBy: String,
 }
)

const dwcModel = module.exports = mongoose.model("dwc", Schema)