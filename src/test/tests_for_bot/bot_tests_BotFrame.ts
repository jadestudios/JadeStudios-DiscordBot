import { GuildTextBasedChannel } from "discord.js";
import { prefix } from "../../configs/config.json"

export default class BotFrame {

	private devChannel: GuildTextBasedChannel;
	private botID: string;

	constructor(devChannel: GuildTextBasedChannel, botID: string) {
		this.devChannel = devChannel;
		this.botID = botID;
	}

	public async test(command: string, matchReply: string | RegExp): Promise<0|1> {

		const appendedCommand = command.match(prefix) ? command : `!${command}`;

		try {
			console.log(`${appendedCommand} test started`);
			await this.devChannel.send(appendedCommand);
			const filter = m => m.author.id.match(this.botID);
			const message = await this.devChannel.awaitMessages({ filter, time: 5000, max: 1 });

			if (!message) {
				console.log(`${appendedCommand} test failed`);
				return 1;
			} 
			const content = message.first()?.content;
			console.log(`Expected: ${matchReply} | Got: ${content}`);

			if (!content?.match(matchReply)) {
				console.log(`${appendedCommand} test failed`);
				return 1
			}
			
		} catch (error) {
			console.log(error);
			console.log(`${appendedCommand} test failed`);
			return 1;
		}

		console.log(`${appendedCommand} test passed`);
		return 0;
	}
}

