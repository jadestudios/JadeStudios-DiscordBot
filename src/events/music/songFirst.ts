import { Queue, Song } from "@jadestudios/discord-music-player";
import { TextChannel } from "discord.js";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import IEvent from "../event";

export default class SongFirst implements IEvent {
	public readonly name: string = 'songFirst';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {
		const queue = args[0] as Queue;
		const song = args[1] as Song;
		const messageChannel = queue.data.channel as TextChannel;

		if (messageChannel) {
			if (typeof song.data.content === 'undefined') {
				messageChannel.send({ embeds: [createMusicEmbed(`Now Playing: ${song.name}`)] });
			} else {
				messageChannel.send(song.data.content);
			}
		}
	}
}