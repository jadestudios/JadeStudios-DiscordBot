import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Skip implements ICommand {
	public readonly name: string = 'skip';
	public readonly description: string = 'Skips a stream';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		let songs;
		try {
			songs = queue.skip();
		} catch (error) {
			console.error(error);
		} 
		
		if (songs) {
			message.channel.send({ embeds: [createMusicEmbed(`Skipped: **${songs.name}**`)] });
		}
	}
}