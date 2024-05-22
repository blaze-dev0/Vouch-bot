const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
  const userModel = require("../../modals/vouches");
  const vouchesModel = require("../../modals/vouch");
  const tokenModel = require("../../modals/users");
  const ee = require("../../settings/embed.json");
  const blackModel = require("../../modals/blacklisted");
  
  module.exports = {
    name: "addbl",
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    guildOnly: true,
    reportStaffOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


        let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0])

    const member = client.users.cache.get(user.id);

    let reason = args.slice(1).join(" ")

    if(!reason) return message.reply({content: 'Please provide a reason'})

    let data = await blackModel.findOne({userID: user.id})

    if(data) {
        return message.reply({content: 'The user is already marked as blacklisted.'})
    }

    if(!data) {
        new blackModel({
            userID: user.id,
            blacklisted: true,
            reason: reason,
            markedBy: `${message.author.tag} (${message.author.id})`
        }).save();
    }

    message.reply({content: 'Marked as blacklisted.'})


    let msgg = `${member.tag} | ${member.id} (${reason})\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`

    await client.channels.cache.get("paste here").send({content: msgg})

    }
}

//create new channel rename it to blacklisted

//copy channel id

//now all done 

//you will get emoji error i will provide you emojis in emoji server

//add your bot and emoji problam solve

//