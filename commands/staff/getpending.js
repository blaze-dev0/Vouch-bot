

const { MessageEmbed, MessageAttachment, Message } = require("discord.js");
const vouchesModel = require("../../modals/vouch");
const ee = require("../../settings/embed.json")
const fs = require("fs")
const path = require("path")

let dir = __dirname

module.exports = {
    name: 'getpending',
    aliases: [],
    description: 'Shows your total vouches',
    vouchStaffOnly: true,
    run: async(client, message, args) => {
    

     let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    const member = client.users.cache.get(user.id);


    let vouches = await vouchesModel.find({Status: "Pending"}, {userID: String,
  userTAG: String,
  vouchNum: Number,
  comment: String,
  vouchAuthor: String,
  Status: String,})
        
    // console.log(vouches)


    // let hii = JSON.stringify(vouches);

     let bye = vouches.join(`\n\n`)

     fs.writeFileSync(`${__dirname}/pendingvouches.txt`, bye, {encoding: 'utf8'})
     
     const embed = new MessageEmbed()
     .setColor(ee.embed_color)
     .setDescription(`Pending Vouches`);


     let neededFilePath = path.join(dir, `/pendingvouches.txt`)


     let file = new MessageAttachment(neededFilePath,vouches.txt)
    

     await message.reply({embeds: [embed], files: [file]})

     return fs.unlink(`${__dirname}/pendingvouches.txt`, (err) => {
        // console.log(err)
     });


    }
}