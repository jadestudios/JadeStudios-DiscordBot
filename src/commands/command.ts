/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "discord.js";

export default interface ICommand {

	readonly name: string;
	readonly description: string;
	execute(prefix: string, command: string, message: Message, args: string[], misc?: any | any[] ): void;
}