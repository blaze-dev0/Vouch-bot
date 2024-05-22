const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");
const ee = require("../../settings/embed.json")

module.exports = {
    name: 'invite',
    aliases: ["inv"],
    description: 'Shows the bot invite link.',
    run: async (client, message) => {
       

        let embed = new MessageEmbed()
            .setTitle("Frisk | Invites")
            .setColor(ee.embed_color)
            .setDescription(`**Discord Invite**\n[Click Here](https://discord.gg/QtD9Wr9K3X)\n**Bot Invite**\n[Click Here](https://discord.com/api/oauth2/authorize?client_id=1054056265841655808&permissions=8&scope=bot)`)
            .setFooter({ text: 'Frisk', iconURL: ee.embed_footericon })

        await message.channel.send({ embeds: [embed] })



    }
}