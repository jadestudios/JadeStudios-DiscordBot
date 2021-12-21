import { Collection } from "discord.js";
import ICommand from "../commands/command";
import { ClocksCommand } from "./commands/clocks";
import { HuhCommand } from "./commands/huh";

export default function getWordCommands(): Collection<string, ICommand> {
	const commands = new Collection<string, ICommand>();
	let command: ICommand;

	command = new HuhCommand;
	commands.set(command.name, command);
	command = new ClocksCommand;
	commands.set(command.name, command);

	return commands;
}