import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Resume implements ICommand {
	public readonly name: string = 'resume';
	public readonly description: string = 'Resumes a song';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		if (!queue.paused) {
			message.channel.send({ embeds: [createMusicEmbed(`Music is already playing`)] });
			return;
		}

		try {
			queue.setPaused(false);
		} catch (error) {
			console.error(error);
		} 
		
		message.channel.send({ embeds: [createMusicEmbed(`Resumed: ${queue.nowPlaying?.name}`)] });
	}
}