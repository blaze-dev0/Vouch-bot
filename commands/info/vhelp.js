const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const ee = require("../../settings/embed.json") 

module.exports = {
    name: 'vhelp',
    aliases: [],
    description: 'Shows help message',
    vouchStaffOnly: true,
    run: async(client, message, args) => {


    // kya use puch rahe ap?

    const embed = new MessageEmbed()
    .setTitle("Command List")
    .setColor(ee.embed_color)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Welcome to Frisk!\n**Vouch Staff Commands**\nAll vouch staff commands are displayed here\n**+status** Check the vouch with unique number\n**+approve** Approve the vouch\n**+decline** Decline the vouch\n**+verify** Send the vouch for verification`)
    .setFooter({text: "Frisk Support", iconURL: ee.embed_footericon})

    return message.channel.send({embeds: [embed]})


    }
}