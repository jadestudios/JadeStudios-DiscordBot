const Music = require('../../music');
module.exports = {
	name: 'queue',
	aliases: ['queue'],
	description: 'Does things with the queue',
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
			message.channel.send(Music.createEmbed(`**Server Playlist -  ${fileName.getQueue(message).repeatQueue ? 'looping' : 'Not looping'}**\n**Now Playing** : ${fileName.nowPlaying(message).name}\n\n**In Queue:**\n` + (fileName.getQueue(message).songs.map((track, i) => {
				return `**#${i}** - ${track.name}`
			}).slice(1, 4).join('\n') + `${fileName.getQueue(message).songs.length - 1 > 3 ? '\n**And more**' : ''}`+`\n\nTotal songs in Playlist: **${fileName.getQueue(message).songs.length}**`)));
			return;
		}

		switch (args[0].toLowerCase()) {
			case 'loop': {
				if (fileName.getQueue(message).repeatQueue) {
					fileName.setQueueRepeatMode(message, false);
					message.channel.send(Music.createEmbed('This queue will not loop'));
				} else {
					fileName.setQueueRepeatMode(message, true);
					message.channel.send(Music.createEmbed('Looping queue'));
				}
				break;
			}

			case 'clear':{
				if(fileName.getQueue(message).songs.length <= 1){
					message.channel.send(Music.createEmbed("There is only one song in the queue"));
					return;
				}

				fileName.clearQueue(message);
				message.channel.send(Music.createEmbed("Cleared queue"));
				break;
			}

			default:
				break;
		}

	},
}