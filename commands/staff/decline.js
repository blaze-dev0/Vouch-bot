const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const userModel = require("../../modals/vouches");
const vouchModel = require("../../modals/vouch");
const ee = require("../../settings/embed.json")
const checkModel = require("../../modals/checking");
const vouch = require("../../modals/vouch");

module.exports = {
    name: "decline",
    aliases: ["deny"],
    permissions : ["SEND_MESSAGES"],
    description: 'Decline the vouch.',
    vouchStaffOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

     

        let code = args[0]
        let regex = "[a-zA-Z]+"
        if(code.match(regex)) {
            return;
        }

        if(!code) {
            return message.reply({content: "Give a valid vouch to search for vouch"})
        }
        let data = await vouchModel.findOne({vouchNum: code})
        if(!data) return message.reply({content: "Could not find vouch in database"})
        if(data.Status === "Accepted"){
            return message.reply({content: "This is already Approved"})
        }
        let reason = args.slice(1).join(" ") || "Not specified!";

       


            let userid = data.userID;

            let dete = await userModel.findOne({userID: userid})

            let pen_vouches = dete.pen_vouches - 1;
            let dec_vouches = dete.dec_vouches + 1;

            await userModel.findOneAndUpdate({userID: userid}, {pen_vouches: pen_vouches})
            await userModel.findOneAndUpdate({userID: userid}, {dec_vouches: dec_vouches})
            await vouchModel.findOneAndUpdate({vouchNum: code}, {Status: "Declined"})




            let embed = new MessageEmbed()
                     .setAuthor({name: 'Grift Alert', iconURL: 'https://cdn.discordapp.com/emojis/982377277801234452.webp?size=128&quality=lossless'})
                    .setTitle("Vouch Notification System")
                    .setDescription(`Your vouch with the ID \`${code}\` was denied because \`${reason}\``)
                    .setColor(ee.embed_color)
                    .setFooter({text: 'GRIFT ALERT', iconURL: ee.embed_footericon});


                    try {
                    let userr = client.users.cache.get(userid)
                    userr.send({embeds: [embed],})
                    } catch (error) {
                        console.log(error)
                    }

                    await checkModel.findOneAndUpdate({vouchNum: code}, {Status: "Rejected"})
                    await checkModel.findOneAndUpdate({vouchNum: code}, {Reason: reason})

                    await message.channel.send({content: 'Rejected'})

            let embedd = new MessageEmbed()
                    .setTitle("Vouch Denied")
                    .setDescription(`**Vouch ID:** \`${code}\`\n**Decliner**: \`${message.author.tag} (${message.author.id})\`\n**Reason**: \`${reason}\`  `)
                    .setColor(ee.embed_color)
                    .setFooter({text: ee.embed_footertext, iconURL: ee.embed_footericon})

                    let ch = "1054393021745078353";//paste here all done now move to next step
                    let cha = client.channels.cache.get(ch)

                    cha.send({embeds: [embedd]})
       }
      } 