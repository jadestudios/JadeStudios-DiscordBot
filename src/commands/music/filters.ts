import { StreamFilters } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import ICommand from "../command";

import { MessageEmbed, EmbedAuthorData } from "discord.js";
const auth = {} as EmbedAuthorData;
auth.name = "Music Player";
auth.iconURL = "https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/music.png";

export default class Filters implements ICommand {
	public readonly name: string = 'filters';
	public readonly description: string = 'Shows all the filters';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		try {
			const fields = [{ name: '\u200b', value: '', inline: true },
			{ name: '\u200b', value: '', inline: true },
			{ name: '\u200b', value: '', inline: true }
			];
			const k = Object.keys(StreamFilters).sort();

			let i = 0;
			while (k.length > 0) {
				fields[i].value = fields[i].value.concat(`${k.pop()}\n`);
				i++;
				if (i > fields.length - 1) {
					i = 0
				}
			}

			const currentEmbed = new MessageEmbed()
				.setColor('#66ccff')
				.setAuthor(auth)
				.setTitle(`**Available Filters**`)
				.setDescription(`Append one of these to **${prefix}play** to use!`)
				.addFields(fields);

			message.channel.send({
				embeds: [currentEmbed]
			});

		} catch (error) {
			console.error(error);
		}
		return;
	}
}