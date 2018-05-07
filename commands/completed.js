const Discord = require("discord.js")



module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have enough permissions.");
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        let channel = message.channel;
        let c = message.channel;
        let channelName = message.channel.name

        if (!channelName.startsWith(`pending-`)) return message.channel.send(`You can't run this command outside a ticket channel.`);
        
        let category = message.guild.channels.find("name", "COMPLETED");
        if(category) {
            channel.setParent(category)
            .then(c => {c.edit({ name: `completed-${c.name.slice(7)}` });})
            .catch(console.error);
           } 
	    message.channel.overwritePermissions(message.author, {SEND_MESSAGES: false});
        });
	  let role2 = message.guild.roles.find("name", "@everyone");
            channel.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });    
        
    let tpendingembed = new Discord.RichEmbed()
        .setTitle("Ticket Completed")
        .setColor("#ff0000")
        .setDescription(`Ticket ${c.name.slice(7)} has been marked as completed.\nThank you for choosing us.`)
        .setFooter("©Froix");

        message.channel.send(tpendingembed)

    }

}



module.exports.help = {
	name: "done"
}
