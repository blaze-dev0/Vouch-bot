const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const userModel = require("../../modals/vouches");
const vouchModel = require("../../modals/vouch");
const ee = require("../../settings/embed.json")
const checkModel = require("../../modals/checking");
const vouch = require("../../modals/vouch");

module.exports = {
    name: "approve",
    aliases: [],
    permissions : ["SEND_MESSAGES"],
    description: 'Approve the vouch.',
    vouchStaffOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let code = args[0];
        let regex = "[a-zA-Z]+"
        if(code.match(regex)) {
            return;
        }

        if(!code) {
            return message.reply({content: "Give a valid vouch id to search for vouch."})
        }
        let data = await vouchModel.findOne({vouchNum: code})
        if(!data) return message.reply({content: "Could not find vouch in database."})

        let reason = args.slice(1).join(" ") || "Not specified!";

       


            let userid = data.userID;
        
        	let deee = await vouchModel.findOne({vouchNum: code})
            
            if(deee.Status === "Declined") {
                return message.reply({content: 'This vouch is declined, it cannot be accepted.'})
            }

            let dete = await userModel.findOne({userID: userid})

            let pen_vouches = dete.pen_vouches - 1;
            let app_vouches = dete.app_vouches + 1;

            await userModel.findOneAndUpdate({userID: userid}, {pen_vouches: pen_vouches})
            await userModel.findOneAndUpdate({userID: userid}, {app_vouches: app_vouches})
            await vouchModel.findOneAndUpdate({vouchNum: code}, {Status: "Accepted"})




            let embed = new MessageEmbed()
                    //.setAuthor({name: 'Shibaaa', iconURL: 'https://cdn.discordapp.com/emojis/982377244439760986.webp?size=128&quality=lossless'})
                    .setTitle("Vouch Notification System")
                    .setDescription(`Your vouch with ID \`${code}\` was approved.`)
                    .setColor("2F3136")
                    .setFooter("Created By Him")

                    try {
                    let userr = client.users.cache.get(userid)
                    userr.send({embeds: [embed]})
                    } catch (error) {
                        console.log(error)
                    }

                    await checkModel.findOneAndUpdate({vouchNum: code}, {Status: "Accepted"})
                    await checkModel.findOneAndUpdate({vouchNum: code}, {Reason: reason})

                    await message.channel.send({content: 'Accepted <:positive:1054331956906692608>'})


                    let embedd = new MessageEmbed()
                    .setTitle("Vouch Approved")
                    .setDescription(`Vouch id: \`${code}\`\nApprover Tag: \`${message.author.tag}\` (${message.author.id})\`\nReason: \`${reason}\`  `)
                    .setColor("2F3136")
                    .setFooter({text: ee.embed_footertext, iconURL: ee.embed_footericon})

                    let ch = "1054393021745078353";//and paste here
                    let cha = client.channels.cache.get(ch)

                    cha.send({embeds: [embedd]})
       }
      }