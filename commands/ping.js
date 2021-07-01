module.exports = {
	name: 'ping',
	description: 'ping',
	execute(prefix, command, args, message, fileName) {
		message.channel.send('Pong.');
	},
};