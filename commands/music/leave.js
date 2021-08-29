
const Music = require('../../music');

module.exports = {
	name: 'leave',
	aliases: ['leave'],
	description: 'Leaves a stream',
	execute(prefix, command, args, message, fileName) {

		if(!message.guild.voice.channel){
			message.channel.send(Music.createEmbed("I'm not in a voice channel"));
			return;
		}

		if (!fileName.getQueue(message)) {
			message.guild.voice.connection.disconnect();
			message.channel.send(Music.createEmbed(`Bye!`));
			return;
		} else {
			const success = fileName.stop(message);

			if (success) {
				fileName.getQueue(message).connection.disconnect();
				message.channel.send(Music.createEmbed(`Bye`));
			}
		}
	},
};