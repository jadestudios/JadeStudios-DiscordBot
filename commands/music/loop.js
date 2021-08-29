const Music = require('../../music');
module.exports = {
	name: 'loop',
	aliases: ['loop'],
	description: 'Loops a stream',
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

		if(args.length == 0){
			if(fileName.getQueue(message).repeatMode){
					fileName.setRepeatMode(message, false);
					message.channel.send(Music.createEmbed('This song will not loop'));
			}else{
					fileName.setRepeatMode(message, true);
					message.channel.send(Music.createEmbed('Looping song'));
			}
			return;
		}

	},
};