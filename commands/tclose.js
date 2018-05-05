const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let channel = message.channel;
  let cName = channel.name;

  if(cName.startsWith("ticket-") || cName.startsWith("pending-")) {
    channel.delete();
  } else message.reply("You can't execute this command outside a ticket channel.");
}

module.exports.help = {
    name: "close"
}