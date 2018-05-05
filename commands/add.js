const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let channel = message.channel;
    let cName = channel.name;
    if(cName.startsWith("ticket-") || cName.startsWith("pending-")) {

        let user = message.mentions.users.first();
        if(user) {
        channel.overwritePermissions(user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
} else message.channel.send("You need to tag a user to add them to this ticket.");
      } else message.reply("You can't execute this command outside a ticket channel.");

}

module.exports.help = {
    name: "add"
}