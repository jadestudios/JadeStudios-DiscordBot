import { Message, MessageActionRow, MessageButton } from "discord.js";
import ICommand from "../command";

export default class Help implements ICommand {
	public readonly name: string = 'help';
	public readonly description: string = 'Shows help page';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const toPrint = 
`To run a command in Discord, use **${prefix}command** or @ me and command.
Responding to this dm will not do anything.
		
**All available commands:**
${prefix}help				
${prefix}attributes add|remove|update <Attribute Name> <user> [Attribute Value]
${prefix}attributes list <user>
${prefix}attributes print <Attribute Name> <user>
${prefix}attributes printall <Attribute Name>
${prefix}highnoon
${prefix}ping
${prefix}pins <set|archive|list|remove|force>
${prefix}remindme <number> <seconds|minutes|hours|days|weeks> <message>
${prefix}remindme <number> <s|m|h|d|w> <message>
${prefix}toss d<number>
${prefix}status hosts
${prefix}status change <Original Host> <New Host>
${prefix}status add <Host>
${prefix}status remove <Host>
${prefix}catjam
${prefix}music
${prefix}s
		
For more info, click the link below.`;

		const button = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('LINK')
				.setLabel("Command Help")
				.setURL('https://gist.github.com/thenerdoflight/1fdd65669bb7b55fb62cdf2f634690cc')
		);
		message.author.send({ content: toPrint, components: [button] })
			.then(m2 => {
				message.reply(`Cheers, love! The cavalry's here!`);
			})
			.catch(error => {
				console.error(error);
				message.reply('Unable to send DM');
		});
	}
}