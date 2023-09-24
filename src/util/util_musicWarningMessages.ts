import { Message } from "discord.js";
import createMusicEmbed from "./util_createMusicEmbed";

/**
 * Generic Music Warnings on play
 * @param arg What to search
 * @param message Message obj
 * @param suppressMessage true or false
 * @returns true on message
 */
export default function musicWarningMessages(arg: string, message: Message, suppressMessage: boolean) {
	if (!message.member!.voice.channel) {
		if (!suppressMessage) message.channel.send({ embeds: [createMusicEmbed("Please join a voice channel and try again")] });
		return true;
	}

	if (message.guild!.me!.voice.channel && message.member!.voice!.channel!.id !== message.guild!.me!.voice.channel.id) {
		if (!suppressMessage) message.channel.send({ embeds: [createMusicEmbed("We're not in the same voice channel")] });
		return true;
	}

	if (!arg) {
		if (!suppressMessage) message.channel.send({ embeds: [createMusicEmbed("No song title was included")] });
		return true;
	}
}