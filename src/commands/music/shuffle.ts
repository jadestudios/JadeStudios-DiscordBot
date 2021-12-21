import { Player } from "discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Shuffle implements ICommand {
	public readonly name: string = 'shuffle';
	public readonly description: string = 'Shuffles the queue';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		let songs;
		try {
			songs = queue.shuffle();
		} catch (error) {
			console.error(error);
		} 
		
		if (songs) {
			message.channel.send({ embeds: [createMusicEmbed(`Shuffled **${songs.length}** song(s)`)] });
		}
	}
}