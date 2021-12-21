import { Message } from "discord.js";
import ICommand from "../command";

export default class Catjam implements ICommand {
	public readonly name: string = "catjam";
	public readonly description: string =  "Does cat jam";
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {
		message.channel.send({
			files: ['https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/7776_catJAM.gif']
		});
	}
	
}