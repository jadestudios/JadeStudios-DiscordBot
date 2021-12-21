import { Message } from "discord.js";
import ICommand from "../command";

export default class Toss implements ICommand {
	public readonly name: string = 'toss';
	public readonly description: string = 'Rolls a dice';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		const invalidMessage = `**Invalid, must be:** ${prefix}${command} d<number>`;

		if (args.length === 0){
			message.channel.send(invalidMessage);
			return;
		} 
		
		const diceRegex = new RegExp('^([d])(\\d+)$');
		const matched = args[0].match(diceRegex);
		//null on fail, [ 'd20', 'd', '20', index: 0, input: 'd20', groups: undefined ] on success

		if (matched){
			message.reply(`You rolled: **${Math.floor(Math.random() * (Number(matched[2])) + 1)}**`);
		}else{
			message.channel.send(invalidMessage);
		}
	}
	
}