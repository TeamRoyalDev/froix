const Discord = require("discord.js")



module.exports.run = async (bot, message, args) => {
    let channel = message.channel;
    let channelName = message.channel.name
    if (channelName.startsWith(`ticket-`)) return message.channel.send(`You can't create a ticket in a ticket.`);
    if (channelName.startsWith(`pending-`)) return message.channel.send(`You can't create a ticket in a pending ticket.`);

    const reason = message.content.split(" ").slice(1).join(" ");
    if (message.guild.channels.exists("name", `ticket-${message.author.username.toLowerCase()}`))
     return message.channel.send(`You already have a ticket open.`);

    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
    let category = message.guild.channels.find("name", "Open Tickets");
        if(category) {
            c.setParent(category)
             .then(updated => console.log(`Set the category of ${channel.name} to ${channel.parent.name}`))
            .catch(console.error);
           } else message.reply("Category could not be found.");
        let role = message.guild.roles.find("name", "Sales Representative");
        if(!role) return message.channel.send("Create a Sales Representative role.")
        let role2 = message.guild.roles.find("name", "@everyone");


        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });

        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });

        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        let tcreateembed = new Discord.RichEmbed()
        .setTitle("Ticket Created")
        .setColor("#ff0000")
        .setDescription(`Ticket ${c} has been created. You can \naccess it at the top of the Discord.`)
        .setFooter("©Froix");
      
        message.channel.send(tcreateembed);

        role.setMentionable(true, 'Sales Representative')
        .then(updated => console.log(`Role mentionable: ${updated.mentionable}`))
        .catch(console.error);
        const embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .addField(`Ticket successfully created | Hello  ${message.author.username}!`, `Welcome to your Ticket. Our team will help you shortly. In the mean time,\n describe what you would like to speed up the process.
        \n-  Advertisements\n-  Discord Setups <FREE>\n- Web Development\n- Graphics\n- Discord bot development\n- Server Trailers\n- Builds\n- Plugin Development\n\n_Thats what Froix offer!_`)
        .setTimestamp();
        c.send({ embed: embed });
        c.send(`${role.toString()} - New Inquiry`);

    })



    
}

module.exports.help = {
	name: "ticket"
}
