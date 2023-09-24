import { Message } from "discord.js";
import IWord from "./word";

export default class Skyrim implements IWord {
	public readonly name: string = 'skyrim';
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
		message.channel.send ("I used to be an adventurer like you. Then I took an arrow to the knee.");
	}
	
}