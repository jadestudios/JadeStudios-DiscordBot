import { Player, Queue } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import createMusicEmbed from "./util_createMusicEmbed";

/**
 * Checks all the typical issues when starting a music stream
 * @param message 
 * @param player DMP player
 * @returns undefined on fail, Queue on success
 */
export default function checkMusicConstraints(message: Message<boolean>, player: Player): undefined | Queue{
	if (message.member == null || message.guild == null || message.guild.me == null) return undefined;

		if (!message.member.voice.channel) {
			message.channel.send({embeds: [createMusicEmbed("Please join a voice channel and try again")]});
			return undefined;
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.channel.send({embeds: [createMusicEmbed(`We're not in the same voice channel`)]});
			return undefined;
		}

		let queue; 
		
		try {
			queue = player.getQueue(message.guild.id);
		} catch (error) {
			console.error(error);
		}

		if (typeof queue === 'undefined'){
			message.channel.send({embeds: [createMusicEmbed(`There is no music playing`)]});
			return undefined;
		}

		if (!queue.isPlaying){
			message.channel.send({embeds: [createMusicEmbed(`There is no music playing`)]});
			return undefined;
		}

		return queue;
}