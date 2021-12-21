import { Message } from "discord.js";
import ICommand from '../command';

export default class Ping implements ICommand {
	public readonly name: string = "ping";
	public readonly description: string = "the ping to your pong";

	public execute(prefix: string, command: string, message: Message, args: string[], misc?: any | any[] ): void {
		message.channel.send('Pong');
	}
}