const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const client = require("..");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");
const userModel = require("../modals/vouches");
const vouchModel = require("../modals/vouch");
const checkModel = require("../modals/checking");

client.on('interactionCreate', async interaction => {
    // Slash Command Handling
    if (interaction.isCommand()) {
       // await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (cmd) {

            
          
            // checking user perms
            if (!interaction.member.permissions.has(cmd.permissions || [])) {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor({name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({dynamic: true})}`})
                            .setColor(ee.embed_color)
                            .setDescription(`You don't Have \`${cmd.permissions}\` To Run Command..`)
                            .setFooter({text: `${ee.embed_footertext}`, iconURL: `${ee.embed_footericon}`})
                    ]
                })
            }
            

            cmd.run(client, interaction, args);

        }
    }


    if (interaction.isButton()) {
        

        if(interaction.customId === "pending") {
        await interaction.deferReply({ephemeral: true})

        let data = await vouchModel.find({Status: "Pending"}, { __v: 0, _id: 0, vouchAuthor: 0, comment: 0, userID: 0, userTAG: 0 })

        let truee = data.slice(",").join("\n")

        let pend = `\`\`\`${truee}\`\`\``;

        const embed = new MessageEmbed()
        .setTitle("Pending Vouches")
        .setColor(ee.embed_color)
        .setDescription(pend)
        .setTimestamp();
        
         return await interaction.followUp({embeds: [embed], ephemeral: true})

        }


    }




    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
    })