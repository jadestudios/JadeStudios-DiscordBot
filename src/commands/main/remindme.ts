import { Message } from "discord.js";
import ICommand from "../command";
import { promisify } from "util";

export default class RemindMe implements ICommand {
	public readonly name: string = "remindme";
	public readonly description: string = "Reminders";

	private readonly timeMap = this.getTimeMap();
	private readonly numberRegex = new RegExp('^(\\d+)$');
	private readonly wordRegex = new RegExp('^((\\b(second|minute|hour|day|week)+s?)|(\\b([{1}smhdw])))$');

	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} <number> <seconds|minutes|hours|days|weeks> <message>`;
		if (args.length < 3) {
			message.channel.send(invalidMessage);
			return;
		}

		const timeNumber = args[0].match(this.numberRegex);
		const timeWord = args[1].match(this.wordRegex);

		if (timeNumber && timeWord) {

			const totalTime = Number(timeNumber[0]) * this.getTimeMS(timeWord[0]);

			if (totalTime > 2147483647) {
				message.channel.send('I can only support up to 3.5 weeks in advance');
				return;
			}

			let toSend = '';
			for (let i = 2; i < args.length; i++) {
				toSend += args[i];
				toSend += ' ';
			}

			const setTimeoutPromise = promisify(setTimeout);

			message.reply(`**Reminder set!**`);

			setTimeoutPromise(totalTime, message).then((message) => {
				message.reply(`**It's time to:** ${toSend}`);
			});

		} else {
			message.channel.send(invalidMessage);
		}
	}

	/**
	 * Gets the time in milliseconds provided the time string
	 * @param nameOfTime 'second(s)' | 'minute(s)' | 'hour(s)' | 'day(s)' | 'week(s)' | 's' | 'm' | 'h' | 'd' | 'w'
	 * @returns milliseconds or 1000ms on fail
	 */
	private getTimeMS(nameOfTime: string): number {
		const time = this.timeMap.get(nameOfTime);
		return time ? time : 1000;
	}

	/**
	 * Creates a map relating times and word equivalents
	 * @returns a map
	 */
	private getTimeMap(): Map<string, number> {

		const supportedTimes = ['week', 'day', 'hour', 'minute', 'second'];
		const supportedTimesPlural = ['weeks', 'days', 'hours', 'minutes', 'seconds'];
		const supportedTimesAbbrev = ['w', 'd', 'h', 'm', 's'];
		const milliseconds = [604800000, 86400000, 3600000, 60000, 1000];

		const timeMap = new Map();

		for (let i = 0; i < milliseconds.length; i++) {
			timeMap.set(supportedTimes[i], milliseconds[i]);
			timeMap.set(supportedTimesPlural[i], milliseconds[i]);
			timeMap.set(supportedTimesAbbrev[i], milliseconds[i]);
		}

		return timeMap;

	}
}