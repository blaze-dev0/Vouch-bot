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
    name: "importvouches",
    aliases: ["import"],
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

   const amount = args[1];

      const from = args[2];

db.set(`importedvouches_${member}`, `${amount}`);
      await message.react(ee.right);

     let msgg = `${member} imported ${amount} vouches from ${from}.`
      
      await client.channels.cache.get("1054343812836761640").send({content: msgg})


    }
    
    }


