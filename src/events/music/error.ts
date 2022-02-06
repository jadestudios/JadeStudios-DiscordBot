import { Queue } from "@jadestudios/discord-music-player";
import { TextChannel } from "discord.js";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import IEvent from "../event";

export default class Error implements IEvent {
	public readonly name: string = 'error';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {
		const error = args[0];
		const queue = args[1] as Queue;

		const messageChannel = queue.data.channel as TextChannel;
		if (messageChannel.guild.me?.isCommunicationDisabled()) return; //No response during timeout

		if (messageChannel) {
			messageChannel.send({ embeds: [createMusicEmbed(`**Yipes**\n Error: ${error}`)] });
		}
	}
}