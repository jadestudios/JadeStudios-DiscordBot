import { Message } from "discord.js";
import IWord from "../word";
import ICommand from "../../commands/command";

export class RandomCaseWord implements IWord {
	public readonly name: string = '(([ ][/]\\b([{1}s]))|([/]\\b([{1}s])))'; // '/s or ' /s'
	public execute(message: Message<boolean>, misc?: any): void {
		const string = message.content.slice(0, message.content.indexOf('/s'));
		const args: string[] = string.split(' ');
		if (args.length === 0) return;

		message.channel.send(randomCaseGen(args));
	}

}

export class RandomCaseCommand implements ICommand {
	public readonly name: string = "s";
	public readonly description: string = "makes your sentences all wobbly";

	public execute(prefix: string, command: string, message: Message, args: string[], misc?: any | any[]): void {
		if (args.length === 0) return;
		message.channel.send(randomCaseGen(args));
	}
}

function randomCaseGen(args: string[]): string {

	const newContents = [];

	for (let i = 0; i < args.length; i++) {
		const currentArg = args[i].toLowerCase();
		for (let j = 0; j < currentArg.length; j++) { //https://github.com/dyzhu12/studly-caps/blob/master/lib/studlyCaps.js
			Math.random() >= 0.5 ? newContents.push(currentArg[j].toUpperCase()) : newContents.push(currentArg[j].toLowerCase());		
		}
		newContents.push(' ');
	}
	return newContents.join("").toString();
}