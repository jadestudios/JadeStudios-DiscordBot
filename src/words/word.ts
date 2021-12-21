import { Message } from "discord.js";

export default interface IWord {
	readonly name: string;
	execute(message: Message,  misc?: any | any[]): void;
}