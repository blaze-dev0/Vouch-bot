const {  MessageActionRow, Modal, TextInputComponent, Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [],
    permissions : ["SEND_MESSAGES"],
    description: "Shows websocket ping",
    guildOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply({content: `Websocket: ${client.ws.ping}ms`})
    },
};