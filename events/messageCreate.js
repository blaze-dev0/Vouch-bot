const client = require("..");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");
const { MessageEmbed } = require("discord.js");
const tokenModel = require("../modals/users");
const { token } = require("..");

client.on('messageCreate', async message => {
    let prefix = config.prefix
    // if (!message.guild) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    // getting prefix when bot mention
    if (cmd.length === 0) {
        if (message.mentions.has(client.user)) {
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(ee.embed_color)
            
                    .setDescription(`My prefix for this server is: \`+\``)
                    .setFooter(ee.embed_footertext, ee.embed_footericon)
                ]
            });

        }
    }

    



    const command = client.commands.get(cmd.toLowerCase()) ||  client.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;
    if (command) {
        
        // guild Only
        if(command.guildOnly === true) {
            if(!message.guild) return message.reply({content: '**This command can be used in guild only!**'})
        }
       
        
        // staff only
        
        if(command.vouchStaffOnly === true) {
            if(!message.guild) return;
            if(!message.member.roles.cache.find((r) => r.id === "1054369407327027261" || r.id === "1054369407327027261" ))//your vouch staff roleid 
            {         
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription("**Only Frisk Vouch Staff Can Use This Command**")
                    ]
                })
            }
        }

        if(command.reportStaffOnly === true) {
            if(!message.guild) return;
            if(!message.member.roles.cache.find((r) => r.id === "1054365597124808774" || r.id === "1054365597124808774"))//your report staff role id 
            {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription("**Only Frisk Report Staff Can Use This Command**")
                    ]
                })
            }
        }
        
        

        if(command.ownerOnly === true) {
            if(!message.member.id === "292305058396372993")//your id 
            {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription("**Only Frisk Bot Owner Can Use This Command**")
                    ]
                })
            }
        }
          if(command.nexusOnly=== true)//leave it
          {
            if(!message.member.id === "292305058396372993") {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription("**Only Him can use this command**")
                    ]
                })
            }
        }
        
        
        
        // checking user perms
        command.run(client, message, args, prefix)
    }
})

//now all setuo done
//next create channel

//channel name

//pending
//approve
//verify
//decline

//copy pending channel id
//copy approve channelid
//copy verify channelid
//copy decline channel id

//now run repl