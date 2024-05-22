
const {  MessageActionRow, Modal, TextInputComponent, Message, Client, MessageEmbed } = require("discord.js");
const tokenModel = require("../../modals/users");
const badges = require("../../settings/badges.json");

module.exports = {
    name: "token",
    aliases: [],
    permissions : ["SEND_MESSAGES"],
    description: "Sends secret token",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.guild) {
            return message.reply({content: 'Error ❌\nYou can use this command in dms only.'})
        }
        let data = await tokenModel.findOne({userID: message.author.id})

        if(data) {
            await message.author.send({embeds: [
                new MessageEmbed()
                .setTitle("Profile Recovery System")
                .setColor("2F3136")
                .setDescription(`**Token**: ${data.token}`)
              .setFooter("This string is unique to you! Copy it and keep it safe! It is required to transfer your vouches if you get banned.")
                
            ]}).then((m) => {
                m.pin()
            })
            // console.log("1")
            return;
        }

        if(!data) {


            let token = client.functions.randToken()

            new tokenModel({
                userID: message.author.id,
                badges: `${badges["User"]}User`,
                token: token,
                shop: "Not set"
            }).save();

            await message.author.send({embeds: [
                new MessageEmbed()
                .setTitle("Profile Recovery System")
                .setColor("2F3136")
                .setDescription(`**Token**: ${data.token}`)
              .setFooter("This string is unique to you! Copy it and keep it safe! It is required to transfer your vouches if you get banned.")
            ]}).then((m) => {
                m.pin();
            })
            // console.log("2")
            return;
        }


    },
};

