
const fs = require("fs")
const botconfig = require("./botconfig.json")
const Discord = require("discord.js")
const bot = new Discord.Client({fetchAllMembers: true})




bot.commands = new Discord.Collection()
let prefix = botconfig.prefix



fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err) 

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0) {
		console.log("Couldn't find commands folder.")
		return
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`)
		console.log(`${i + 1}: ${f} loaded!`)
		bot.commands.set(props.help.name,props)
	})

})


bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`)
	bot.user.setActivity("Froix.xyz", {type: "WATCHING"});
	
})

bot.on("message", async message => {
	

	if (!message.content.startsWith(prefix)) return


	let messageArray = message.content.split(" ")
	let cmd = messageArray[0]
	let args = messageArray.slice(1)
	let commandFile = bot.commands.get(cmd.slice(prefix.length))
	if(commandFile) commandFile.run(bot, message, args)




})



bot.login(process.env.BOT_TOKEN);
