const client = require("..");
const colors = require("colors")
const functions = require("../functions.js")

client.on('ready', async () => {
    console.log(`${client.user.username} Is Online`.green)
    client.user.setActivity(`+help`,{type : "LISTENING"});
//same pvt channel id
 let readyEmbed = client.functions.successEmbed("Client Updates!", "Client is connected!")
   client.functions.logger("same channel id", readyEmbed)

  
})