import { Player, Song } from "discord-music-player";
import { Message } from "discord.js";
import checkMusicConstraints from "../../util/util_checkMusicConstraints";
import createMusicEmbed from "../../util/util_createMusicEmbed";
import ICommand from "../command";

export default class Seek implements ICommand {
	public readonly name: string = 'seek';
	public readonly description: string = 'Seeks a song';
	public async execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): Promise<void> {
		const player = <Player>misc[0];
		const queue = checkMusicConstraints(message, player);
		if (!queue) return;

		if (args.length == 0) {
			message.channel.send({ embeds: [createMusicEmbed(`Please indicate a time to seek to`)] });
			return;
		}

		let timeCount = 0; //In seconds

		if (args[0].includes(':')) { //Checks for colon
			const substrings = args[0].split(':'); //Splits by colon for formats up to HH:MM:SS
			switch (substrings.length) {
				case 2: {
					const min = (parseInt(substrings[0]) * 60); //Converts MM to SS and adds to timeCount
					timeCount += (!Number.isNaN(min) ? min : 0);
				}
					break;

				case 3: {
					const hour = (parseInt(substrings[0]) * 60 * 60); //Converts HH to SS and adds to timeCount
					timeCount += (!Number.isNaN(hour) ? hour : 0);
					const min = (parseInt(substrings[1]) * 60); //Converts MM to SS and adds to timeCount
					timeCount += (!Number.isNaN(min) ? min : 0);
					break;
				}
				default:
					break;
			}
			const seconds = (parseInt(substrings[substrings.length - 1]));//Adds SS to timeCount
			timeCount += (!Number.isNaN(seconds) ? seconds : 0);

		} else {
			const seconds = parseInt(args[0]);
			timeCount += (!Number.isNaN(seconds) ? seconds : 0);
		}



		if (await queue.seek(timeCount * 1000)) { //seeks in ms
			message.channel.send({ embeds: [createMusicEmbed(`Seeked to **${args[0]}**`)] });
			const song = queue.nowPlaying as Song;
			song.seekTime = 0;
		}
	}
}