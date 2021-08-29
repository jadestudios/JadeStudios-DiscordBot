
const Music = require('../../music');

module.exports = {
	name: 'stop',
	aliases: ['stop'],
	description: 'Stops a stream',
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

		fileName.setQueueRepeatMode(message, false);
		fileName.setRepeatMode(message, false);
		const success = fileName.stop(message);

		if(success){
			message.channel.send(Music.createEmbed(`Music stopped`));
		}
	
	},
};