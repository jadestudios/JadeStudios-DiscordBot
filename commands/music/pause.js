
const Music = require('../../music');

module.exports = {
	name: 'pause',
	aliases: ['pause'],
	description: 'Pauses a stream',
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

		if (!fileName.getQueue(message).playing){
			message.channel.send(Music.createEmbed(`Music is already paused`));
			return;
		}  

		const success = fileName.pause(message); //Returns a Song object

		if (success){
			message.channel.send(Music.createEmbed(`Paused: ${success.name}`));
		} 
	},
};