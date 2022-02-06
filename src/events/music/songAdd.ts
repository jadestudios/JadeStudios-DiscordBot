import { Queue, Song } from "@jadestudios/discord-music-player";
import { TextChannel } from "discord.js";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import IEvent from "../event";

export default class SongAdd implements IEvent {
	public readonly name: string = 'songAdd';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {
		const queue = args[0] as Queue;
		const song = args[1] as Song;
		const messageChannel = queue.data.channel as TextChannel;

		if (messageChannel) {
			messageChannel.send({ embeds: [createMusicEmbed(`Added to queue: ${song.name}`)] });
		}
	}
}