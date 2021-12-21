import { Message } from "discord.js";
import ICommand from "../command";
import { promisify } from "util";

export default class RemindMe implements ICommand {
	public readonly name: string = "remindme";
	public readonly description: string = "Reminders"

	private supportedTimes = ['week', 'day', 'hour', 'minute', 'second'];
	private supportedTimesPlural = ['weeks', 'days', 'hours', 'minutes', 'seconds'];
	private supportedTimesAbbrev = ['w', 'd', 'h', 'm', 's'];
	private milliseconds = [604800000, 86400000, 3600000, 60000, 1000];

	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} <number> <seconds|minutes|hours|days|weeks> <message>`;
		if (args.length < 3) {
			message.channel.send(invalidMessage);
			return;
		}
		const numberRegex = new RegExp('^(\\d+)$');
		const wordRegex = new RegExp('^((\\b(second|minute|hour|day|week)+s?)|(\\b([{1}smhdw])))$');

		const timeNumber = args[0].match(numberRegex);
		const timeWord = args[1].match(wordRegex);

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

			message.channel.send('**Reminder set!**');

			setTimeoutPromise(totalTime, message).then((message) => {
				message.reply(`It's time to: ${toSend}`);
			});

		} else {
			message.channel.send(invalidMessage);
		}
	}

	/**
	 * Gets the time in milliseconds provided the time string
	 * @param nameOfTime 'second(s)' | 'minute(s)' | 'hour(s)' | 'day(s)' | 'week(s)' | 's' | 'm' | 'h' | 'd' | 'w'
	 * @returns milliseconds
	 */
	private getTimeMS(nameOfTime: string): number {
		const timeMap = new Map();

		for (let i = 0; i < this.milliseconds.length; i++) {
			timeMap.set(this.supportedTimes[i], this.milliseconds[i]);
			timeMap.set(this.supportedTimesPlural[i], this.milliseconds[i]);
			timeMap.set(this.supportedTimesAbbrev[i], this.milliseconds[i]);
		}

		return timeMap.get(nameOfTime);

	}
}