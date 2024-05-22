const {
  MessageActionRow,
  Modal,
  TextInputComponent,
  Message,
  Client,
  MessageEmbed,
  Formatters,
} = require("discord.js");
const { default: fetch } = require("node-fetch");
const ee = require("../../settings/embed.json");
const vouchModel = require("../../modals/vouch");
const userModel = require("../../modals/vouches");
const tokenModel = require("../../modals/users");
const badgeEmojis = require("../../settings/badges.json");
const scamModel = require("../../modals/scammer");
const dwcModel = require("../../modals/dwc");
const badgesModel = require("../../modals/badges");
const db = require("quick.db");
const blackModel = require("../../modals/blacklisted")
const JSONdb = require("simple-json-db");
const Db = new JSONdb('storage.json', { syncOnWrite: true });
var sleep = require('thread-sleep');


module.exports = {
  name: "profile",
  aliases: ["p"],
  permissions: ["SEND_MESSAGES"],
  description: 'Shows your profile.',
 
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const statuses = {
      online: "<a:Online:983108234556608573> Online",
      offline: "<:invisible:983109578193526824> Offline",
      dnd: "<a:mm_RedAlertsign:983108383555080232> DND",
      idle: "<:BRV_ios_moon_6:983108686182506516> Idle",
    };


     
   
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    const member = client.users.cache.get(user.id);

    let deek = await scamModel.findOne({ userID: user.id, scammer: "true" })
    if(deek) {
      await message.channel.send({embeds: [
        new MessageEmbed()
        .setTitle(`${member.tag}'s profile`)
        .setColor("FF0000")
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: "Created by Him" })
        .setTitle(`${user} is a scammer`)
        .setDescription(`**Marked By Frisk Staff**\n**This user was marked for:**\n${deek.reason}`)

      ]})
      return;
    }
const createdAt = Formatters.time(member.createdAt, "R");
    let bl = await blackModel.findOne({ userID: user.id, blacklisted: "true" })
    if(bl) {
      await message.channel.send({embeds: [
        new MessageEmbed()
        .setTitle(`${member.tag}'s profile`)
        .setColor("RED")
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: "Frisk Alert" })
        .setDescription(`**Member Mention:** <@${member.id}>\n**Member ID:** ${member.id}\n**Display Name:** ${member.username}\n**User Created:** ${createdAt}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**__User Information__**\n⚠️**__BLACKLISTED FROM VOUCHING__**⚠️\n\nFeel free to Appeal this desicion at [Frisk Support](https://discord.gg/friskalert)`)

      ]})
      return;
    }

    let dataa = await userModel.findOne({ userID: user.id });

    if (!dataa) {
      new userModel({
        userID: user.id,
        pen_vouches: 0,
        unreps: 0,
        app_vouches: 0,
        dec_vouches: 0,
        veri_vouches: 0,
        overall_vouches: 0,
      }).save();
    }

    let dete = await userModel.findOne({ userID: user.id });

    let ook = await tokenModel.findOne({ userID: user.id });

    let token = client.functions.randToken();

    if (!ook) {
     await new tokenModel({
        token: token,
        userID: user.id,
        badges: `${badgeEmojis["User"]} User`,
        shop: "Not Set",
      }).save();
    }
    
    

    let oook = await tokenModel.findOne({ userID: user.id });

   

    let detee = await userModel.findOne({ userID: user.id });

    let badg = oook.badges;

    //console.log(oook.badges)


      
     let h = badg.splice(",").join("\n")


  
       
    
     let pastVouches = await vouchModel.find({userID: user.id, Status: "Accepted"}, { _id: 0, vouchNum: 0, vouchAuthor: 0, userID: 0, userTAG: 0, Status: 0, __v: 0 }).limit(5)

    
      let author = message.author;
      let shop1 = await Db.get(`user_${user}`);
  if (shop1 === null) shop1 = "Not Set!";
  let forum = await Db.get(`forum_${user}`);
    
    let product = await Db.get(`product_${user}`);
      
    let devbadge =  db.fetch(`badge_${user}`)
    
  if (devbadge === 1) devbadge = "<a:Ax_dev:1009405943404052561> Bot dev";
    if (devbadge <1) devbadge = "";

    let staffbadge =  db.fetch(`staffbadge_${user}`)
    
  if (staffbadge === 1) staffbadge = "<:moderation:1022413455946428436> Staff";
    if (staffbadge <1) staffbadge = "";

    let ownerbadge =  db.fetch(`ownerbadge_${user}`)
    
  if (ownerbadge === 1) ownerbadge = "<:Ax_own:1002221876833157190> Owner";
    if (ownerbadge <1) ownerbadge = "";

    let donatorbadge =  db.fetch(`donatorbadge_${user}`)
    
  if (donatorbadge === 1) donatorbadge = "<:Az_premium:1015923938502660167> Donator";
    if (donatorbadge <1) donatorbadge = "";

    

      let link = db.fetch(`link_${user}`)
    if (link === null) link = "Not Set!";
    
let imported = db.fetch(`importedvouches_${user}`)
    if (imported === null) imported = "0";
    
let forum1 = db.fetch(`forum_${user}`)
    if (forum1 === null) forum1 = "Not Set!";
     
     if(!pastVouches) {
      let hqh = "No vouches to show."
     }

     let commentOne = pastVouches[0]?.comment || "No Vouches";
     let commentTwo = pastVouches[1]?.comment || "";
     let commentThree = pastVouches[2]?.comment || "";
     let commentFour = pastVouches[3]?.comment || "";
     let commentFive = pastVouches[4]?.comment || "";

     let hh = `${commentOne}\n${commentTwo}\n${commentThree}\n${commentFour}\n${commentFive}`

     // console.log(pastReturn)


    if (detee.pen_vouches < 0) {
      pen_vouches = 0;
    } else {
      pen_vouches = detee.pen_vouches;
    }

    const response = await fetch(
  
  `https://japi.rest/discord/v1/user/${user.id}`
    );
    const data = await response.json(); //public_flags_array

    let status = member.presence?.status;

    if (status === "dnd" || status === "idle" || status === "online")
      status = statuses[status];
    else if (
      status === "invisible" ||
      status === "offline" ||
      status === undefined
    )
      status = statuses["offline"];

    // const joinedAt = Formatters.time(member.joinedAt, "R");
    

  
   let embed = new MessageEmbed()
      .setTitle(`${member.tag}'s profile`)
      .setThumbnail(member.displayAvatarURL({ dynamic: true }))
      .setColor("00A1EF")
      .setDescription(
        `**Member Mention:** <@${member.id}>\n**Member ID:** ${member.id}\n**Display Name:** ${member.username}\n**User Created:** ${createdAt}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**__Vouch Information__**:\n**<:positive:1054331956906692608>Positive** : ${detee.app_vouches}\n**<:negative:1054331985310523422>Negative** : ${detee.unreps}\n**<:reload:1054333407989092392>Imported** : ${imported}\n**\▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Badges:**\n${h}\n${donatorbadge}\n${staffbadge}\n${devbadge}\n${ownerbadge}\n**__Services and Products__**\n**Shop**: ${link}\n**Forum:** ${forum1}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**__Recent 5 Vouch Comments__\n${hh}`
      )
      .setFooter({ text: "Made by Him" })
      

    await message.channel.send({ embeds: [embed] }).then((m) => {
      function mdelete() {
        m.delete();
      }
      setTimeout(mdelete, 10000);
    });
let dwc = await dwcModel.findOne({ userID: user.id, dwc: "true" })
    if(dwc) {
      await message.channel.send({embeds: [
        new MessageEmbed()
        .setTitle(`⚠️**__DEAL WITH CAUTION__**⚠️`)
        .setColor("RED")
        
       
        
        .setDescription(`${user} was marked dwc, Reason: \`${dwc.reason}\`. Be aware while dealing with them.`)

      ]}).then((m) => {
      function mdelete() {
        m.delete();
      }
      setTimeout(mdelete, 10000);
    });
      return;
    };


     

    

     }
};

