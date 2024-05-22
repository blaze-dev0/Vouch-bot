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
  const dwcModel = require("../../modals/dwc");
  
  module.exports = {
    name: "adddwc",
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

    let data = await dwcModel.findOne({userID: user.id})

    if(data) {
        return message.reply({content: 'The user is already marked'})
    }

    if(!data) {
        new dwcModel({
            userID: user.id,
            dwc: true,
            reason: reason,
            markedBy: `${message.author.tag} (${message.author.id})`
        }).save();
    }

    message.reply({content: 'Marked as DWC.'})


    let msgg = `${member.tag} | ${member.id} (${reason})\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`

    await client.channels.cache.get("paste here").send({content: msgg})

    }
}

//same here create new channel rename it to deal with caution

//copy channel id