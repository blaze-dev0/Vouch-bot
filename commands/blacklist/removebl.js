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
    name: "removebl",
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

    if(!data) {
        return message.reply({content: 'The user is not blacklisted'})
    }

    let deek = await blackModel.findOneAndRemove({userID: user.id})

    await message.reply({content: 'Removed from blacklisted'})

    }
}