const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const userModel = require("../../modals/vouches");
const vouchModel = require("../../modals/vouch");
const ee = require("../../settings/embed.json")
const checkModel = require("../../modals/checking");

module.exports = {
    name: "get",
    aliases: [],
    permissions : ["SEND_MESSAGES"],
    description: 'Check information about vouch',
    vouchStaffOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


        let code = args.slice(0).join(" ");
        let regex = "[a-zA-Z]+"
        if(code.match(regex)) {
            return;
        }

        if(!code) {
            return message.reply({content: "Give a valid code to search for vouch"})
        }
        let data = await vouchModel.findOne({vouchNum: code})
        if(!data) return message.reply({content: "Could not find code in database"})

        let embed = new MessageEmbed()
        .setAuthor({name: 'Success'})
        .setDescription(`__Information Stored On Vouch Number \`${code}\`__\n\n**Member Vouched**: \`${data.userTAG}\`(\`${data.userID}\`)\n\n**Vouch Comment:**: \`${data.comment}\`\n\n**Vouched By**: \`${data.vouchAuthor}\`\n\n**Current Status**: \`${data.Status}\` `)
        .setFooter({text: 'Rexon', iconURL: ee.embed_footericon})
        .setColor(ee.embed_color)

        await new checkModel({
            userID: message.author.id,
            userVouched: data.userID,
            vouchNum: code,
            Status: 'Pending',
            Reason: 'Pending'
        }).save()

        await message.channel.send({embeds: [embed]})
    },
};