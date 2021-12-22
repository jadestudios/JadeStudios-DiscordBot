import { getVoiceConnection } from "@discordjs/voice";
import { Guild } from "discord.js";
import { Server } from "../../server/server_Server";
import IEvent from "../event";

export default class GuildDelete implements IEvent {
	public readonly name: string = 'guildDelete';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {
		const guild = <Guild>args[0];

		const serverFiles = new Server(`${guild.id}.db`);
		serverFiles.removeDB();
		getVoiceConnection(guild.id)?.destroy(); //Destroys any voice connections on kick/ban

	}

}