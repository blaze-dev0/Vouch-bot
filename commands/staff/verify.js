const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const userModel = require("../../modals/vouches");
const vouchModel = require("../../modals/vouch");
const ee = require("../../settings/embed.json")
const checkModel = require("../../modals/checking");
const vouch = require("../../modals/vouch");

module.exports = {
    name: "verify",
    aliases: [],
    permissions : ["SEND_MESSAGES"],
    description: 'Send vouch for manual verification',
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
            return message.reply({content: "Give a valid code to search for vouch"})
        }
        let data = await vouchModel.findOne({vouchNum: code})
        if(!data) return message.reply({content: "Could not find code in database"})
        
        let deee = await vouchModel.findOne({vouchNum: code})
            
            if(deee.Status === "Declined") {
                return message.reply({content: 'This vouch is declined, it cannot be accepted.'})
            }

        let reason = args.slice(1).join(" ") || "Not specified!";

       


            let userid = data.userID;

            let dete = await userModel.findOne({userID: userid})

            let pen_vouches = dete.pen_vouches - 1;
            let veri_vouches = dete.veri_vouches + 1;

            await userModel.findOneAndUpdate({userID: userid}, {pen_vouches: pen_vouches})
            await userModel.findOneAndUpdate({userID: userid}, {veri_vouches: veri_vouches})
            await vouchModel.findOneAndUpdate({vouchNum: code}, {Status: "Manual Verification"})

            let embed = new MessageEmbed()
                    // .setAuthor({name: 'Shibaaa', iconURL: 'https://cdn.discordapp.com/emojis/982377277801234452.webp?size=128&quality=lossless'})
                    .setTitle("Vouch Notification System")
                    .setDescription(`You have recieved the Positive vouch \`#${code}\`. This vouch requires manual verification by a staff member. Please join the [Frisk Support Server](https://discord.gg/QtD9Wr9K3X) and open a support ticket to provide proof for the vouch. If a ticket is not opened within 2 days, this vouch will be denied.
Should this happen more regularly, you may be blacklisted from our vouch-system.`)
                    .setColor(ee.embed_color)
                    .setFooter({text: 'Created By Him', iconURL: ee.embed_footericon});


                    try {
                    let userr = client.users.cache.get(userid)
                    userr.send({embeds: [embed], })
                    } catch (error) {
                        console.log(error)
                    }

                    await checkModel.findOneAndUpdate({vouchNum: code}, {Status: "Manual Verification"})
                    await checkModel.findOneAndUpdate({vouchNum: code}, {Reason: reason})

                    await message.channel.send({content: '<a:verify:1054342372382740522>Sended for manual verification'})

                    let embedd = new MessageEmbed()
                    .setTitle("Vouch Changes")
                    .setDescription(`Some Changes were made to vouch number \`${code}\` :\n\nChanges done by: \`${message.author.tag} (${message.author.id})\`\nThe Vouch was: \`Sent for manual verification\`\nReason: \`${reason}\`  `)
                    .setColor(ee.embed_color)
                    .setFooter({text: ee.embed_footertext, iconURL: ee.embed_footericon})

                    let ch = "1054393021745078353";//and paste here
                    let cha = client.channels.cache.get(ch)

                    cha.send({embeds: [embedd]})


       }
      }