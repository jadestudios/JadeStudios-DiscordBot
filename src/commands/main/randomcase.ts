import { Message } from "discord.js";
import ICommand from '../command';

export default class RandomCase implements ICommand {
	public readonly name: string = "s";
	public readonly description: string = "makes your sentences all wobbly";

	public execute(prefix: string, command: string, message: Message, args: string[], misc?: any | any[]): void {
		if (args.length === 0) return;
		
		const newContents = [];
		const randomPick = (Math.random() < 0.5) ? true : false;
		let totalCount = 0;

		for (let i = 0; i < args.length; i++) {
			const currentArg = args[i].toLowerCase();
			for (let j = 0; j < currentArg.length; j++) {
				if (randomPick) {
					if (totalCount % 2)
						newContents.push(currentArg[j].toUpperCase());
					else
						newContents.push(currentArg[j]);
				} else {
					if (!(totalCount % 2))
						newContents.push(currentArg[j].toUpperCase());
					else
						newContents.push(currentArg[j]);
				}
				totalCount++;
			}
			newContents.push(' ');
		}

		message.channel.send(newContents.join("").toString());
	}
}