const Discord = require("discord.js")



module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have enough permissions.");
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        let channel = message.channel;
        let c = message.channel;
        let channelName = message.channel.name

        if (channelName.startsWith(`pending-`)) return message.channel.send(`Your ticket is already pending.`);
        if (!channelName.startsWith(`ticket-`)) return message.channel.send(`You can't run this command outside a ticket channel.`);
        
        let category = message.guild.channels.find("name", "Pending Tickets");
        if(category) {
            channel.setParent(category)
            .then(c => {c.edit({ name: `pending-${c.name.slice(7)}` });})
            .catch(console.error);
           } 
        
        
    let tpendingembed = new Discord.RichEmbed()
        .setTitle("Ticket Pending")
        .setColor("#ff0000")
        .setDescription(`Ticket ${c.name.slice(7)} has been marked as pending.\nYour freelancer will provide you with updates in this channel.`)
        .setFooter("©Froix");

        message.channel.send(tpendingembed)

    }

}



module.exports.help = {
	name: "pending"
}
