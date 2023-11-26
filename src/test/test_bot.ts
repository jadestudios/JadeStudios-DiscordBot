import { Client, GuildTextBasedChannel, Intents } from 'discord.js';
import BotFrame from './tests_for_bot/bot_tests_BotFrame';
import { tests } from "./tests_for_bot/bot_tests.json";
import EventEmitter from 'events';
import {token} from "../configs/config.json"

export default class BotTest {

	private testCount;
	private errorCount;

	constructor() {
		this.testCount = 0;
		this.errorCount = 0;

	}

	public getTestCount() {
		return this.testCount;
	}

	public getErrorCount() {
		return this.errorCount;
	}

	public run() {

		const client = new Client({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES]
		});

		client.once('ready', async () => {
			console.log('Ready!');

			const devGuild = client.guilds.resolve('GUILD ID');

			if (devGuild) {
				const devChannel = devGuild.channels.resolve('GUILD ID') as GuildTextBasedChannel;
				if (devChannel) {
					const bot = new BotFrame(devChannel, 'GUILD ID');

					if (this.testCount === tests.length - 1) return;

					this.runTest(bot);

				}
			}

		});

		client.login(token);

	}

	private end() {
		console.log(`\nBot Features Test finished ${this.testCount} tests with: ${this.errorCount} failed test(s)`);
		process.exit();
	}

	private runTest(bot: BotFrame) {
		bot.test(tests[this.testCount].command, tests[this.testCount].expects).then((num: number) => this.errorCount += num)
			.finally(() => {
				this.testCount++;
				this.testCount === tests.length ? this.end() : this.runTest(bot);
			});
	}


}



