import { Client } from "discord.js";
import guildUsersUpdate from "../../util/util_guildUsersUpdate";
import IEvent from "../event";

export default class Ready implements IEvent {
	public readonly name: string = 'ready';
	public readonly once: boolean = true;
	public execute(...args: any[]): void {
		const client = <Client> args[0];
		const guilds = client.guilds.cache.map(guild => guild); //Gets array of guilds this bot is in 

		guilds.forEach(guild => {
			guildUsersUpdate(guild);
		});
		
		console.log('ready');
	}
}