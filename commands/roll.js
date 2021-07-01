module.exports = {
	name: 'toss',
	description: 'Rolls a dice',
	execute(prefix, command, args, message, fileName) {
		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} d<number>`;
		if(args[0] == undefined) {
			message.channel.send(invalidMessage);
			return;
		}
		if(args[0].toLowerCase().charAt(0) == 'd' && args[0].length > 1) {
			args[0] = args[0].slice(1, args[0].length);
		}
		if(!Number.isInteger(Number(args[0]))) {
			message.channel.send(invalidMessage);
			return;
		}

		const seedrandom = require('seedrandom');
		const rng = seedrandom(Math.random(), { entropy: true });

		message.channel.send(Math.round(rng() * (Number(args[0]) - 1) + 1));
	},
};