import { MessageEmbed, EmbedAuthorData } from "discord.js";


const auth = {} as EmbedAuthorData;
auth.name = "Encountered Error";
auth.iconURL = "https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/warning.png";

/**
	 * Creates an embed for all music related responses
	 * @param string message to include
	 * @returns Discord.MessageEmbed
 */
export default function createMusicEmbed(string: string): MessageEmbed {
	const currentEmbed = new MessageEmbed()
		.setColor('#ff0000')
		.setAuthor(auth)
		.setDescription(string);
	return currentEmbed;
}