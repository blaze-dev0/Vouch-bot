const {  MessageActionRow, Modal, TextInputComponent, Message, Client, MessageEmbed } = require("discord.js");
const ee = require("../../settings/embed.json")

module.exports = {
    name: "badges",
    aliases: [],
    permissions : ["SEND_MESSAGES"],
    description: "Shows all the badges of bot",
    //guildOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle("Frisk Badges")
        .setDescription(`<a:owner:1054068042407084064> Owner
<a:dev:1054087983474692198> Bot Dev
<:admin:1054088206343229571> Bot Admin
<:staff:1054071833793675295> Staff 
<:premium:1054087416056643635> Donator 
<:user:1054064477433237544> User 
`)
        .setColor(ee.embed_color)
        .setFooter({text: ee.embed_footertext, iconURL: ee.embed_footericon})

        await message.channel.send({embeds: [embed]})

    },
};