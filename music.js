const Discord = require('discord.js');

/**
 * Contains all general methods used by music related js files
 */
module.exports = {
	name: 'Music',

	/**
	 * Creates an embed for all music related responses
	 * @param string message to include
	 * @returns Discord.MessageEmbed
	 */
	createEmbed(string) {
		const currentEmbed = new Discord.MessageEmbed()
			.setColor('#66ccff')
			.setAuthor("Music Player", "https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/music.png")
			.setDescription(string);
		return currentEmbed;
	},

}