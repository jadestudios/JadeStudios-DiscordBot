import { Message } from "discord.js";
import getCommands from "../../commands/command_index";
import IEvent from "../event";
import { prefix } from "../../configs/config.json"
import { PinHandler } from "../../server/server_PinHandler";
import getWords from "../../words/word_index";
import { Player } from "@jadestudios/discord-music-player";

export default class MessageCreate implements IEvent {
	public readonly name: string = 'messageCreate';
	public readonly once: boolean = false;
	private commands = getCommands();
	private words = getWords();
	private escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	public execute(...args: any[]): void {
		const message = <Message>args[0]; //Since messageCreate only has one argument
		if (message.client.user == null || message.channel.type === "DM" || message.guild == null || message.member == null || message.author.bot) return;
		const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${this.escapeRegex(prefix)})\\s*`);

		if (message.guild.me?.isCommunicationDisabled()) return; //No response during timeout

		if (message.type === 'CHANNEL_PINNED_MESSAGE') { //Check for new pins
			const pinHandler = new PinHandler(`${message.guild.id}.db`); //Makes it so that new PinHandler is made during pinned checks
			if (pinHandler.hasArchiveChannel()) {
				message.delete();
			}
			return;
		}

		const player = args[1] as Player; //args[1] should be a dmp - player object

		if (!prefixRegex.test(message.content)) { //should be case-insensitive in here since no args used
			const ci_content = message.content.toLowerCase()
			if (this.words[1].test(ci_content)) {
				const matchedWord = ci_content.match(this.words[1]); //Will only do match if no prefix
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

		const matchedPrefix = message.content.match(prefixRegex);
		if (!matchedPrefix) return;

		//[1] - explicit to [,matchedPrefix]
		const messageArgs = message.content.slice(matchedPrefix[1].length).trim().split(/ +/);

		const command = messageArgs.shift()?.toLowerCase();
		if (!command) return;

		if (!this.commands.has(command)) return;

		try {
			//#get(command) is covered above
			this.commands.get(command)?.execute(prefix, command, message, messageArgs, [player]);
		} catch (error) {
			console.error(error);
			message.reply('Failed to execute command');
		}

	}

}