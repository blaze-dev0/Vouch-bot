const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const ee = require("../../settings/embed.json") 

module.exports = {
    name: 'rhelp',
    aliases: [],
    description: 'Shows help message',
    reportStaffOnly: true,
    run: async(client, message, args) => {


    // kya use puch rahe ap?

    const embed = new MessageEmbed()
    .setTitle("Command List")
    .setColor(ee.embed_color)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Welcome to Frisk!\n**Report Staff Commands**\nAll report staff commands are displayed here\n**+addbl** Add the user to blacklist\n**+removebl** - Remove the user from blacklist\n**+addscammer** - Mark a user as scammer\n**+removescammer** - Remove a user as scammer.\n**+adddwc** - Adds a user as dwc\n**+removedwc** Removes a user as dwc`)
    .setFooter({text: "Frisk", iconURL: ee.embed_footericon})

    return message.channel.send({embeds: [embed]})


    }
}