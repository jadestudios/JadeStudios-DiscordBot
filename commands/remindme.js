module.exports = {
	name: 'remindme',
	description: 'Reminds user of something',
	execute(prefix, command, args, message, fileName) {

		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} <number> <seconds|minutes|hours|days|weeks> <message>`;
		if (args.length < 3) {
			message.channel.send(invalidMessage);
			return;
		}

		if (!Number.isInteger(Number(args[0]))) {
			message.channel.send(invalidMessage);
			return;
		}

		if (args[1].toLowerCase().charAt(args[1].length - 1) == 's' && args[1].length > 1) {
			args[1] = args[1].slice(0, args[1].length - 1);
		}

		const supportedTimes = ['week', 'day', 'hour', 'minute', 'second'];

		const milliseconds = {
			week: 604800000,
			day: 86400000,
			hour: 3600000,
			minute: 60000,
			second: 1000,
		};

		let foundTime;
		supportedTimes.forEach(time => {
			if (time == args[1]) {
				foundTime = milliseconds[args[1]];
			}
		});

		if (foundTime == undefined) {
			message.channel.send(invalidMessage);
			return;
		}

		let toSend = '';
		for (let i = 2; i < args.length; i++) {
			toSend += args[i];
			toSend += ' ';
		}

		const totalTime = args[0] * foundTime;

		if (totalTime > 2147483647) {
			message.channel.send('Invalid: Can only support up to 3.5 weeks in advance');
			return;
		}

		const util = require('util');
		const setTimeoutPromise = util.promisify(setTimeout);

		message.channel.send('**Reminder set!**\n\n*Please do not use this for anything important.*\n*These reminders are not saved.*');

		setTimeoutPromise(totalTime, message).then((message) => {
			message.reply(`It's time to: ${toSend}`);
		});
	},
};
