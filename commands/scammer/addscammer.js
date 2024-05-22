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
  const scamModel = require("../../modals/scammer");
  
  module.exports = {
    name: "markscam",
    aliases: ["mark"],
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

    let data = await scamModel.findOne({userID: user.id})

    if(data) {
        return message.reply({content: 'The user is already marked as scammer.'})
    }

    if(!data) {
        new scamModel({
            userID: user.id,
            scammer: true,
            reason: reason,
            markedBy: `${message.author.tag} (${message.author.id})`
        }).save();
    }

    message.reply({content: 'I have successfully Marked the user as scammer.'})


    let msgg = `<a:blueTick:1054370815489093692> **User: ${member.tag} | ${member.id} 
<a:Blue_Dot:1054370894019047445>Reason: ${reason}**`

    await client.channels.cache.get("and paste here").send({content: msgg})

    }
}
//create new channel rename it to scammer 

//copy channel id