import { Message } from "discord.js";
import IWord from "./word";

//This is a role detection
//The name is a roleID
export default class roleOne implements IWord {
	public readonly name: string = '845856786941607946'; //This is a specific role in the server
	public execute(message: Message<boolean>, misc?: any): void {
		const randomUserID = (message.guild?.members.cache.filter(member => !member.user.bot).random())?.id; 
		message.channel.send(`<@${randomUserID ? randomUserID : message.author.id}>`);	
	}
}