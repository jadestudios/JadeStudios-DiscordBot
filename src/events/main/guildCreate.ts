import { Guild } from "discord.js";
import guildUsersUpdate from "../../util/util_guildUsersUpdate";
import IEvent from "../event";

export default class GuildCreate implements IEvent {
	public readonly name: string = 'guildCreate';
	public readonly once: boolean = false;
	execute(...args: any[]): void {
		const guild = <Guild> args[0];
		guildUsersUpdate(guild);
	}
}