const Music = require('../../music');
module.exports = {
	name: 'play',
	aliases: ['play'],
	description: 'Plays a stream',
	execute(prefix, command, args, message, fileName) {
		if (!message.member.voice.channel) {
			message.channel.send(Music.createEmbed("Please join a voice channel and try again"));
			return;
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.channel.send(Music.createEmbed(`We're not in the same voice channel`));
			return
		}

		if (!args[0]) {
			message.channel.send(Music.createEmbed(`No song title was included`));
			return
		}
		fileName.play(message, args.join(" "));

	},
};