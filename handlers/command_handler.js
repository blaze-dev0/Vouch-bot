const { Client } = require('discord.js');
const fs = require('fs');
const colors = require("colors")

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
    try {
        let command = 0;
        fs.readdirSync("./commands").forEach(cmd => {
        
            let commands = fs.readdirSync(`./commands/${cmd}/`).filter((file) => file.endsWith(".js"));
            for (cmds of commands) {
                let pull = require(`../commands/${cmd}/${cmds}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    command++
                } else {
                    console.log(`${cmds} Command is not Ready`.red);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));

            }
        })
        console.log(`${command} lOADED`.green);
    } catch (e) {
        console.log(colors.red(e.message));
    }
}