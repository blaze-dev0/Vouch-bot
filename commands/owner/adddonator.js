const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
const db = require("quick.db");
const JSONdb = require("simple-json-db");
const Db = new JSONdb('storage.json', { syncOnWrite: true });
const ee = require("../../settings/embed.json");
     
  
  module.exports = {
    name: "adddonator",
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    guildOnly: true,
    ownerOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


  
    
      
    const member = client.users.cache.get(args[0]);

   

db.add(`donatorbadge_${member}`, 1);
      await message.react(ee.right);
      

    }
    
    }


