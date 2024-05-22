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
        const arrayOfSlashCommands = [];
        fs.readdirSync("./slscommands").forEach(cmd => {
            let commands = fs.readdirSync(`./slscommands/${cmd}/`).filter((file) => file.endsWith(".js"));
            for (cmds of commands) {
                let pull = require(`../slscommands/${cmd}/${cmds}`);
                if (pull.name) {
                    client.slashCommands.set(pull.name, pull);
                    arrayOfSlashCommands.push(pull)
                    command++
                } else {
                    console.log(`${cmds} Command is not Ready`.red);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));

            }
            client.on("ready", async () => {
                    
                await client.guilds.cache.get("1110881335087743106").commands.set(arrayOfSlashCommands);
              //  await client.guilds.cache.get("982367994187513856").commands.set(arrayOfSlashCommands);
                  
            let hi = client.functions.successEmbed("Command Loading", "Slash Commands Loaded")
              client.functions.logger("1110881335087743106", hi)//paste same channel id xd

            });

        })
        console.log(`${command} sls lOADED`.green);
      
    } catch (e) {
        console.log(colors.red(e.message));
    }
}//now do staff role setup