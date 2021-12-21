import { Message } from "discord.js";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Music implements ICommand {
	public readonly name: string = 'music';
	public readonly description: string = 'Gets music help page';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		if (message.member == null || message.guild == null) return;

		message.channel.send({
			embeds: [createMusicEmbed(
				`**All commands:** \n\n` +
				`${prefix}play <URL|search query>\n` +
				`${prefix}seek <HH:MM:SS | # in seconds>\n` +
				`${prefix}queue (loop | clear)\n` +
				`${prefix}pause | resume | stop | skip | shuffle | leave`
			)]
		});
	}
}