import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import createMusicEmbed from "./util_createMusicEmbed";

/**
 * Adds a song to a queue or starts a queue
 * @param args What to search
 * @param message Message obj
 * @param player Player obj
 * @param suppressMessage true or false
 * @param customContent Anything for Message.channel.send
 * @returns 
 */
export default async function addMusic(args: string[], message: Message, player: Player, suppressMessage: boolean, customContent?: any) {
	if (message.member == null || message.guild == null || message.guild.me == null) return;

	if (!message.member.voice.channel) {
		if (!suppressMessage) message.channel.send({ embeds: [createMusicEmbed("Please join a voice channel and try again")] });
		return;
	}

	if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
		if (!suppressMessage) message.channel.send({ embeds: [createMusicEmbed("We're not in the same voice channel")] });
		return
	}

	if (!args[0]) {
		if (!suppressMessage) message.channel.send({ embeds: [createMusicEmbed("No song title was included")] });
		return
	}

	let queue;
	try {
		queue = player.createQueue(message.guild.id, {
			data: {
				channel: message.channel
			}
		});
	} catch (error) {
		console.error(error);
	}
	await queue?.join(message.member?.voice.channelId as string).catch(console.error);
	await queue?.play(args.join(" ")).then(song => {
		song.setData({
			content: customContent
		});
	}).catch(console.error);
}