import { Collection } from "discord.js";
import ICommand from "../command";
import Leave from "./leave";
import Loop from "./loop";
import Music from "./music";
import Pause from "./pause";
import Play from "./play";
import Queue from "./queue";
import Resume from "./resume";
import Seek from "./seek";
import Shuffle from "./shuffle";
import Skip from "./skip";
import Stop from "./stop";


export default function getMusicCommands(): Collection<string, ICommand> {
	const commands = new Collection<string, ICommand>();
	let command: ICommand;

	command = new Play;
	commands.set(command.name, command);
	command = new Stop;
	commands.set(command.name, command);
	command = new Leave;
	commands.set(command.name, command);
	command = new Pause;
	commands.set(command.name, command);
	command = new Queue;
	commands.set(command.name, command);
	command = new Loop;
	commands.set(command.name, command);
	command = new Resume;
	commands.set(command.name, command);
	command = new Seek;
	commands.set(command.name, command);
	command = new Shuffle;
	commands.set(command.name, command);
	command = new Skip;
	commands.set(command.name, command);
	command = new Music;
	commands.set(command.name, command);

	return commands;
}