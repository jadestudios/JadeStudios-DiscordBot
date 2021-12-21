import { Player } from "discord-music-player";
import { Message } from "discord.js";
import addMusic from "../../util/util_addMusic";
import IWord from "../word";
import ICommand from "../../commands/command";

const url = 'https://youtu.be/qbeEO58Hlfo';
const content = { content: 'What was that noise?', files: ['https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/mg_alert.jpg'] };

export class HuhWord implements IWord {
	public readonly name: string = 'huh';
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
		await addMusic([url], message, misc[0] as Player, true, content);
	}

}

export class HuhCommand implements ICommand {
	public readonly name: string = 'huh';
	public readonly description: string = 'Plays mg alert sound';
	public async execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): Promise<void> {
		await addMusic([url], message, misc[0] as Player, true, content);
	}
}
