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
    name: "forum",
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    guildOnly: true,
   
   
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


  const member = message.author;
    let discord = args[0];
      
    
  
   if (discord === undefined) discord = "Not Set!";
 
     
      

db.set(`forum_${member}`, `${discord}`);
      await message.react(ee.right);
      let embed1 = new MessageEmbed()
      .setDescription(`I have Successfully changed your forum to ${discord}`)
      .setColor("BLUE")
      message.channel.send({ embeds: [embed1]});

    }
    }
    


