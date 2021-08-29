
const Music = require('../../music');

module.exports = {
	name: 'skip',
	aliases: ['skip'],
	description: 'Skips a stream',
	execute(prefix, command, args, message, fileName) {
		if (!message.member.voice.channel) {
			message.channel.send(Music.createEmbed("Please join a voice channel and try again"));
			return;
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.channel.send(Music.createEmbed(`We're not in the same voice channel`));
			return
		}

		if (!fileName.getQueue(message)){
			message.channel.send(Music.createEmbed(`There is no music playing`));
			return;
		}

		const success = fileName.skip(message); //Returns a Song object

		if (success) {
			message.channel.send(Music.createEmbed(`Skipped: ${success.name}`));
		}
	},
};