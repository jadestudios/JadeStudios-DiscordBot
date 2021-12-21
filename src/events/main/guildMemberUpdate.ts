import { GuildMember } from "discord.js";
import { RoleHandler } from "../../server/server_RoleHandler";
import IEvent from "../event";

export default class GuildMemberUpdate implements IEvent {
	public readonly name: string = 'guildMemberUpdate';
	public readonly once: boolean = false;
	execute(...args: any[]): void {
		const newMember = <GuildMember>args[1];
		const handler = new RoleHandler(`${newMember.guild.id}.db`);

		handler.deleteUser(newMember.user.id, false);
		handler.addUser(newMember.user.id, newMember.user.username, newMember.user.discriminator, newMember.displayName);
		newMember.roles.cache.forEach(role => {
			handler.addRole(newMember.user.id, role.id);
		});
	}
}