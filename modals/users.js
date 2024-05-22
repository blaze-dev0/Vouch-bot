const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

 token: String,
 userID: String,
 badges: Array,
 shop: String,

 }
)

const tokenModel = module.exports = mongoose.model("token", Schema)