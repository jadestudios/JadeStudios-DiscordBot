import { Player } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import addMusic from "../../util/util_addMusic";
import ICommand from "../command";

export default class Play implements ICommand {
	public readonly name: string = 'play';
	public readonly description: string = 'Plays a stream';
	public async execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): Promise<void> {
		await addMusic(args, message, misc[0] as Player, false);
	}

}