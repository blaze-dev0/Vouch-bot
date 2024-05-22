const { MessageEmbed, MessageAttachment, Message } = require("discord.js");
const vouchesModel = require("../../modals/vouch");
const ee = require("../../settings/embed.json")
const fs = require("fs")
const path = require("path")

let dir = __dirname

module.exports = {
    name: 'vouches',
    aliases: [],
    description: 'Shows your total vouches',
    run: async(client, message, args) => {


     let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    const member = client.users.cache.get(user.id);


    let vouches = await vouchesModel.find({userID: user.id}, {_id: 0, userID: 0, userTAG: 0, __v: 0});
        
    // console.log(vouches)


    // let hii = JSON.stringify(vouches);

     let bye = vouches.join(`\n\n`)

     fs.writeFileSync(`${__dirname}/${user.id}.txt`, bye, {encoding: 'utf8'})
     
     const embed = new MessageEmbed()
     .setColor(ee.embed_color)
     .setDescription(`Vouches of ${member} (${member.id})`);


     let neededFilePath = path.join(dir, `/${user.id}.txt`)


     let file = new MessageAttachment(neededFilePath, vouches.txt)
    

     await message.reply({embeds: [embed], files: [file]})

     return fs.unlink(`${__dirname}/${user.id}.txt`, (err) => {
        // console.log(err)
     });


    }
}