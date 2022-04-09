import { MessageEmbed, EmbedAuthorData } from "discord.js";


const auth = {} as EmbedAuthorData;
auth.name = "Music Player";
auth.iconURL = "https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/music.png";

/**
	 * Creates an embed for all music related responses
	 * @param string message to include
	 * @returns Discord.MessageEmbed
 */
export default function createMusicEmbed(string: string): MessageEmbed {
	const currentEmbed = new MessageEmbed()
		.setColor('#66ccff')
		.setAuthor(auth)
		.setDescription(string);
	return currentEmbed;
}