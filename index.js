const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const mongoose = require("mongoose")
const fs = require("fs");
const db =require("quick.db");
const Db = require("storage.json")
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
module.exports = client;


const config = require("./settings/config.json");
// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.functions = require("./functions.js");
client.categories = fs.readdirSync("./commands/");

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["command_handler", "event_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

// MongoDB Connection

mongoose.connect(config.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
    console.log("Connected to Database".green)

    let hi = client.functions.successEmbed("Connecting!", "Database Connected")

    client.functions.logger("Paste your pvt channel id", hi)//both
    }).catch((error) => {
    console.log(`Error while connecting to database: ${error}`.red)
//paste your pvt channel id
    let hii = client.functions.failEmbed("Connecting!", "Database Connection Failed")

        client.functions.logger("paste your pvt channel id", hii)
    })



    

client.login(" paste your bot token"); //paste your bot token