module.exports = {
	name: 'help',
	description: 'sends help page to user',
	execute(prefix, command, args, message, fileName) {

		const toPrint = `
		To run a command in Discord, use **${prefix}command** or @ me and command.
		Responding to this dm will not do anything.
		
		All available commands:
		
		**help:** Shows this
		
		Usage:  ${prefix}help
		
		**attributes** 
		Adds|Removes|Updates attributes to user 
		Lists all attributes for user
		Prints out a specific attribute for user
		Prints out all users and values with a specific attribute 
						
		Usage:  ${prefix}attributes add|remove|update <Attribute Name> <user> [Attribute Value]
				${prefix}attributes list <user>
				${prefix}attributes print <Attribute Name> <user>
				${prefix}attributes printall <Attribute Name>
		
		**highnoon** 
		Find where it is high noon in the world
						
		Usage:  ${prefix}highnoon
		
		**ping**
		It's the ping to your pong and vice versa.
		
		Usage:  ${prefix}ping
		
		**pins**
		Sets the current channel to be archived
		Sets the current channel to be used as an archive
		Lists the channels used for archiving and to be archived
		Removes the current channel from being archived or used as an archive
		Forces a run and archives pins
		
		Usage:  ${prefix}pins <set|archive|list|remove|force>
		
		**remindme**
		Reminds the user of something after a set amount of time
		
		Warning: Please do not use this for anything important.
		These reminders are not saved.
		
		Usage:  ${prefix}remindme <number> <seconds|minutes|hours|days|weeks> <message>
		
		**toss**
		Rolls a dice
		
		Usage:  ${prefix}toss d<number>
		
		**status**
		Shows the status of prefonfigured hosts
		Lists the hosts that will be pinged
		Changes the old host domain to a new host domain
		Adds a new host to ping to
		Removes host to ping to
		
		Usage:  ${prefix}status hosts
				${prefix}status change <Original Host> <New Host>
				${prefix}status add <Host>
				${prefix}status remove <Host>
		
		`;
		message.author.send(toPrint);
		message.channel.send(`Cheers, love! The cavalry's here!`);
	},
};