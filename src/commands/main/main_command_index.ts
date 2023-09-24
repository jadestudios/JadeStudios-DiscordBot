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

export default function getMainCommands(): Collection<string, ICommand> {
	const commands = new Collection<string, ICommand>();
	let cmd: ICommand[] = [
		new Ping,
		new Catjam,
		new HighNoon,
		new Toss,
		new RemindMe,
		new Status,
		new Pins,
		new Attributes,
		new Help
	]

	cmd.forEach(element => {
		commands.set(element.name, element);
	});	
	return commands;
}