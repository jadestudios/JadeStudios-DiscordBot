import { Player, RepeatMode } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Stop implements ICommand {
	public readonly name: string = 'stop';
	public readonly description: string = 'Stops a stream';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;
		
		try {
			queue.setRepeatMode(RepeatMode.DISABLED);
			queue.stop();
		} catch (error) {
			console.error(error);
		}
		message.channel.send({embeds: [createMusicEmbed(`Music stopped`)]});
	}

}