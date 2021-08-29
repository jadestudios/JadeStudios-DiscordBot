const Music = require('../../music');
module.exports = {
	name: 'music',
	aliases: ['music'],
	description: 'Shows music help page',
	execute(prefix, command, args, message, fileName) {

		message.channel.send(Music.createEmbed(
			`**All commands:** \n\n` +
			`${prefix}play <URL|search query>\n`+
			`${prefix}seek <HH:MM:SS | # in seconds>\n`+
			`${prefix}queue (loop | clear)\n`+
			`${prefix}pause | resume | stop | skip | shuffle | leave`
		));

	},
};