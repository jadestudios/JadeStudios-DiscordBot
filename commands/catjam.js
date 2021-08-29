const { MessageAttachment } = require("discord.js");

module.exports = {
	name: 'catjam',
    aliases: ['catJAM', 'catJam'],
	description: 'Does cat jam',
	execute(prefix, command, args, message, fileName) {
		message.channel.send(new MessageAttachment('https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/7776_catJAM.gif'));
	},
};