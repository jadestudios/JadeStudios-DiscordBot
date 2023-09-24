import { Collection } from "discord.js";
import ICommand from "../commands/command";
import { ClocksCommand } from "./commands/clocks";
import { HuhCommand } from "./commands/huh";
import { RandomCaseCommand } from "./commands/randomcase";
import { HiltonCommand } from "./commands/hilton";

export default function getWordCommands(): Collection<string, ICommand> {
	const commands = new Collection<string, ICommand>();
	let cmd: ICommand[] = [
		new HuhCommand,
		new ClocksCommand,
		new RandomCaseCommand,
		new HiltonCommand
	]

	cmd.forEach(element => {
		commands.set(element.name, element);
	});
	return commands;
}