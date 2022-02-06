import { Player, RepeatMode } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Queue implements ICommand {
	public readonly name: string = 'queue';
	public readonly description: string = 'Does things with the queue';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		if (args.length == 0) {
			try {
				message.channel.send({
					embeds: [createMusicEmbed(`**Server Playlist -  ${queue.repeatMode === RepeatMode.QUEUE ? 'looping' : 'Not looping'}**\n**Now Playing** : ${queue.nowPlaying?.name}\n\n**In Queue:**\n` + (queue.songs.map((track, i) => {
						return `**#${i}** - ${track.name}`
					}).slice(1, 4).join('\n') + `${queue.songs.length - 1 > 3 ? '\n**And more**' : ''}` + `\n\nTotal songs in Playlist: **${queue.songs.length}**`))]
				});
				
			} catch (error) {
				console.error(error);
			}
			return;
		}

		switch (args[0].toLowerCase()) {
			case 'loop': {
				try {
					if (queue.repeatMode === RepeatMode.QUEUE) {
						queue.setRepeatMode(RepeatMode.DISABLED);
						message.channel.send({ embeds: [createMusicEmbed('This queue will not loop')] });
					} else {
						queue.setRepeatMode(RepeatMode.QUEUE);
						message.channel.send({ embeds: [createMusicEmbed('Looping queue')] });
					}

				} catch (error) {
					console.error(error);
				}
				break;
			}

			case 'clear': {

				try {
					if (queue.songs.length <= 1) {
						message.channel.send({ embeds: [createMusicEmbed("There is only one song in the queue")] });
						return;
					}
					queue.clearQueue();
					message.channel.send({ embeds: [createMusicEmbed("Cleared queue")] });

				} catch (error) {
					console.error(error);
				}

				break;
			}

			default:
				break;
		}

	}
}