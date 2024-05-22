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
    name: "removeowner",
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

   

db.set(`ownerbadge_${member}`, 0);
      await message.react(ee.right);
      

    }
    
    }


