import { Collection } from "discord.js";
import Attributes from "./attributes";
import Catjam from "./catjam";
import ICommand from "../command";
import Help from "./help";
import HighNoon from "./highnoon";
import Ping from "./ping";
import Pins from "./pins";
import RemindMe from "./remindme";
import Status from "./status";
import Toss from "./toss";
import RandomCase from "./randomcase";

export default function getMainCommands(): Collection<string, ICommand> {
	const commands = new Collection<string, ICommand>();
	let command: ICommand;
	
	command = new Ping;
	commands.set(command.name, command);
	command = new Catjam;
	commands.set(command.name, command);
	command = new HighNoon;
	commands.set(command.name, command);
	command = new Toss;
	commands.set(command.name, command);
	command = new RemindMe;
	commands.set(command.name, command);
	command = new Status;
	commands.set(command.name, command);
	command = new Pins;
	commands.set(command.name, command);
	command = new Attributes;
	commands.set(command.name, command);
	command = new Help;
	commands.set(command.name, command);
	command = new RandomCase;
	commands.set(command.name, command);

	return commands;
}