import { Queue, Song } from "@jadestudios/discord-music-player";
import { TextChannel } from "discord.js";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import { QueueData } from "../../util/util_customTypes";
import IEvent from "../event";

export default class SongAdd implements IEvent {
	public readonly name: string = 'songAdd';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {
		const queue = args[0] as Queue;
		const song = args[1] as Song;
		const data = queue.data as QueueData;

		const messageChannel = data.channel as TextChannel;
		if (messageChannel.guild.me?.isCommunicationDisabled()) return; //No response during timeout

		if (messageChannel) {
			messageChannel.send({ embeds: [createMusicEmbed(`Added to queue: ${song.name}`)] });
		}
	}
}