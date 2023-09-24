import { Collection } from "discord.js";
import ICommand from "../command";
import Filters from "./filters";
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
	let cmd: ICommand[] = [
		new Play,
		new Stop,
		new Leave,
		new Pause,
		new Queue,
		new Loop,
		new Resume,
		new Seek,
		new Shuffle,
		new Skip,
		new Music,
		new Filters
	]

	cmd.forEach(element => {
		commands.set(element.name, element);
	});
	return commands;
}