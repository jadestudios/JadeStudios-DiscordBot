import { Collection } from "discord.js";
import getWordCommands from "../words/word_command_index";
import ICommand from "./command";
import getMainCommands from "./main/main_command_index";
import getMusicCommands from "./music/music_command_index";


export default function getCommands(): Collection<string, ICommand> {
	const commands = new Collection<string, ICommand>();
	return commands.concat(getMainCommands(), getMusicCommands(), getWordCommands());
}