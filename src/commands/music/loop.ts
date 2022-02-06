import { Player, RepeatMode } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Loop implements ICommand {
	public readonly name: string = 'loop';
	public readonly description: string = 'Loops a song';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		if (args.length === 0) {
			try {
				if (queue.repeatMode === RepeatMode.SONG) {
					queue.setRepeatMode(RepeatMode.DISABLED);
					message.channel.send({ embeds: [createMusicEmbed('This song will not loop')] });
				} else {
					queue.setRepeatMode(RepeatMode.SONG);
					message.channel.send({ embeds: [createMusicEmbed('Looping song')] });
				}

			} catch (error) {
				console.error(error);
			}
		}
	}
}