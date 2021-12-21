import { MessageEmbed } from "discord.js";

/**
	 * Creates an embed for all music related responses
	 * @param string message to include
	 * @returns Discord.MessageEmbed
 */
export default function createMusicEmbed(string: string): MessageEmbed {
	const currentEmbed = new MessageEmbed()
		.setColor('#66ccff')
		.setAuthor("Music Player", "https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/music.png")
		.setDescription(string);
	return currentEmbed;
}