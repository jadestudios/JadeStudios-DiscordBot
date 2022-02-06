import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Pause implements ICommand {
	public readonly name: string = 'pause';
	public readonly description: string = 'Pauses a song';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		if (queue.paused) {
			message.channel.send({ embeds: [createMusicEmbed(`Music is already paused`)] });
			return;
		}

		try {
			queue.setPaused(true);
		} catch (error) {
			console.error(error);
		}
		
		message.channel.send({ embeds: [createMusicEmbed(`Paused: ${queue.nowPlaying?.name}`)] });
	}
}