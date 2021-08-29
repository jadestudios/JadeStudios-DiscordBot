
const Music = require('../../music');

module.exports = {
	name: 'seek',
	aliases: ['seek'],
	description: 'Seeks a stream',
	execute(prefix, command, args, message, fileName) {
		if (!message.member.voice.channel) {
			message.channel.send(Music.createEmbed("Please join a voice channel and try again"));
			return;
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.channel.send(Music.createEmbed(`We're not in the same voice channel`));
			return
		}

		if (!fileName.getQueue(message)) {
			message.channel.send(Music.createEmbed(`There is no music playing`));
			return;
		}

		if (args.length == 0) {
			message.channel.send(Music.createEmbed(`Please indicate a time to seek to`));
			return;
		}

		let timeCount = 0; //In seconds

		if (args[0].includes(':')) { //Checks for colon
			let substrings = args[0].split(':'); //Splits by colon for formats up to HH:MM:SS
			switch (substrings.length) {
				case 2: {
					const min = (parseInt(substrings[0]) * 60); //Converts MM to SS and adds to timeCount
					timeCount += (!Number.isNaN(min) ? min : 0);
				}
					break;
		
				case 3: {
					const hour = (parseInt(substrings[0]) * 60 * 60); //Converts HH to SS and adds to timeCount
					timeCount += (!Number.isNaN(hour) ? hour : 0);
					const min = (parseInt(substrings[1]) * 60); //Converts MM to SS and adds to timeCount
					timeCount += (!Number.isNaN(min) ? min : 0);
					break;
				}
				default:
					break;
			}
			const seconds = (parseInt(substrings[substrings.length - 1]));//Adds SS to timeCount
			timeCount += (!Number.isNaN(seconds) ? seconds : 0);
		
		} else {
			const seconds = parseInt(args[0]);
			timeCount += (!Number.isNaN(seconds) ? seconds : 0);
		}

		const success = fileName.seek(message, timeCount * 1000); //seeks in ms

		if (success) {
			message.channel.send(Music.createEmbed(`Seeked to **${args[0]}**`));
		}
	},
};