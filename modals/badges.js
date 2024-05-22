const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

 userID: String,
 badge: Array,


 }
)

const tokenModel = module.exports = mongoose.model("badges", Schema)