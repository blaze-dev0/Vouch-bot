const { Client } = require('discord.js');
const fs = require('fs');
const colors = require("colors")

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
    try {
        fs.readdirSync("./events/").forEach((file) => {
            const events = fs.readdirSync("./events/").filter((file) =>
              file.endsWith(".js")
            );
            for (let file of events) {
              let pull = require(`../events/${file}`);
              if (pull.name) {
                client.events.set(pull.name, pull);
              }
            }
            console.log((`${file}  Events Loaded Successfullly`.green));
          });
    } catch (e) {
        console.log(colors.red(e.message));
    }
}