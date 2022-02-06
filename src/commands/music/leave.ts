import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";
import { getVoiceConnection } from '@discordjs/voice';

export default class Leave implements ICommand {
	public readonly name: string = 'leave';
	public readonly description: string = 'Leaves a vc';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		if (message.member == null || message.guild == null) return;

		if (!message.guild.me?.voice.channel) {
			message.channel.send({ embeds: [createMusicEmbed("I'm not in a voice channel")] });
			return;
		}

		const player = <Player>misc[0];
		let queue

		try {
			queue = player.getQueue(message.guild.id);
			if (typeof queue === 'undefined') {
				getVoiceConnection(message.guild.id)?.destroy(); //Finds voice connection that the music player is bounded to - Fixes subsequent play error after leave here
				message.guild.me.voice.disconnect();
			} else {
				queue.connection?.stop();
				queue.connection?.leave();
				player.deleteQueue(message.guild.id);
			}
			message.channel.send({ embeds: [createMusicEmbed(`Bye!`)] });

		} catch (error) {
			console.error(error);
		}

		
	}
}