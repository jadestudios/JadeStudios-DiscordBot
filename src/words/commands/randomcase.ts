import { Message } from "discord.js";
import IWord from "../word";
import ICommand from "../../commands/command";

export class RandomCaseWord implements IWord {
	public readonly name: string = '/\\b[sS]'; // Matches '/s' or '/S'
	private readonly reg: RegExp = new RegExp(this.name,'gi');
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
		const string = message.content.split(this.reg);
		if (string.length === 0) return;
		const args: string[] = string[0].split(' ');
		if (args.length === 0) return;

		message.channel.send(randomCaseGen(args));
	}

}

export class RandomCaseCommand implements ICommand {
	public readonly name: string = "s";
	public readonly description: string = "makes your sentences all wobbly";

	public async execute(prefix: string, command: string, message: Message, args: string[], misc?: any | any[]): Promise<void> {
		if (args.length === 0) return;
		message.channel.send(randomCaseGen(args));
	}
}

function randomCaseGen(args: string[]): string {
	return args
		.map((arg) =>
			arg
				.toLowerCase()
				.split("")
				.map((char) =>
					Math.random() >= 0.5 ? char.toUpperCase() : char.toLowerCase()
				)
				.join("")
		)
		.join(" ");
}