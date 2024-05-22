const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const ee = require("../../settings/embed.json") 

module.exports = {
    name: 'help',
    aliases: ["commands"],
    description: 'Shows help message',
    run: async(client, message, args) => {


    // kya use puch rahe ap?

    const embed = new MessageEmbed()
    .setTitle("Command List")
    .setColor("00A1EF")
    .setThumbnail(client.user.displayAvatarURL())
.setDescription(`Welc to Frisky™ help menu!\n**User Commands**\nAll general commands are displayed here\n**+p** Displays your or mentioned user's profile\n**+rep** Adds a positive vouch to the mentioned user.\n**+token** Sends your token in dm\n**+badges** Shows all of the bot badges\n**+shop** Sets the link under your profile\n**+forum** Sets the forum under your profile\n**+invite** Shows the bot invite link and server link\n**+vouches** - Shows the vouches with comments of the user\n**+ping** Shows the bots ping.\n**+stats** Shows the stats of the bot.`)
    .setFooter({text: "Frisky™", iconURL: ee.embed_footericon})

    return message.channel.send({embeds: [embed]})


    }
}