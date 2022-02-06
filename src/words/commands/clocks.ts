import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import addMusic from "../../util/util_addMusic";
import IWord from "../word";
import ICommand from "../../commands/command";

const url = 'https://youtu.be/PFW2uSCZ0uE';

export class ClocksWord implements IWord {
	public readonly name: string = 'clocks';
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
		await addMusic([url], message, misc[0] as Player, true);
	}

}

export class ClocksCommand implements ICommand {
	public readonly name: string = 'clocks';
	public readonly description: string = 'Plays clocks by coldplay';
	public async execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): Promise<void> {
		await addMusic([url], message, misc[0] as Player, true);
	}
}
