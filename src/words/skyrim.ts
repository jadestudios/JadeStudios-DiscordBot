import { Message } from "discord.js";
import IWord from "./word";

export default class Skyrim implements IWord {
	public readonly name: string = 'skyrim';
	public execute(message: Message<boolean>, misc?: any): void {
		message.channel.send ("I used to be an adventurer like you. Then I took an arrow to the knee.");
	}
	
}