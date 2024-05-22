const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guildID: String,
    scammer: String,
    dwc: String,
    channel: String,
    action: String,
 }
)

const guildModel = module.exports = mongoose.model("guilds", Schema)