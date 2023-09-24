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
		let index = 0
		if (args.length > 0){
			index = parseInt(args[0])
			index = Number.isNaN(index) ? 0 : index -1 //default is 0
		}

		let songs;
		try {
			songs = queue.skip(index);
		} catch (error) {
			console.error(error);
		} 
		
		if (songs) {
			message.channel.send({ embeds: [createMusicEmbed(`Skipped: **${songs.name}${index !== 0 ? (' and ' + index + ' others') : ''}**`)] });
		}
	}
}