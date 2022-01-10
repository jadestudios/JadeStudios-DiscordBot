import { Message } from "discord.js";
import getCommands from "../../commands/command_index";
import IEvent from "../event";
import { prefix } from "../../configs/config.json"
import { PinHandler } from "../../server/server_PinHandler";
import getWords from "../../words/word_index";
import { Player } from "discord-music-player";

export default class MessageCreate implements IEvent {
	public readonly name: string = 'messageCreate';
	public readonly once: boolean = false;
	private commands = getCommands();
	private words = getWords();
	public execute(...args: any[]): void {
		const message = <Message>args[0]; //Since messageCreate only has one argument
		if (message.member == null || message.guild == null || message.client.user == null) return;
		if (message.channel.type === "DM") return;

		if (message.type === 'CHANNEL_PINNED_MESSAGE') { //Makes it so that new PinHandler is made during pinned checks
			const pinHandler = new PinHandler(`${message.guild.id}.db`);
			if (pinHandler.hasArchiveChannel()) {
				message.delete();
			}		
			return;
		}

		const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${escapeRegex(prefix)})\\s*`);
		const player = args[1] as Player; //args[1] should be a dmp - player object

		if (!prefixRegex.test(message.content)) {
			if (this.words[1].test(message.content)) {
				const matchedWord = message.content.match(this.words[1]); //Will only do match if no prefix
				if (matchedWord) {
					try {
						this.words[0].get(matchedWord[0])?.execute(message, [player]);
					} catch (error) {
						console.error(error);
					}
					
				}
			}
			return;
		}

		const [, matchedPrefix] = message.content.match(prefixRegex);
		const messageArgs = message.content.slice(matchedPrefix.length).trim().split(/ +/);

		const command = messageArgs?.shift()!.toLowerCase();

		if (!this.commands.has(command)) return;

		try {
			this.commands.get(command)!.execute(prefix, command, message, messageArgs, [player]); 
		} catch (error) {
			console.error(error);
			message.reply('Failed to execute command');
		}

	}

}