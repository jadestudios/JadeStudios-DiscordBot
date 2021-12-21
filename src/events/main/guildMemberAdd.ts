import { GuildMember } from "discord.js";
import { RoleHandler } from "../../server/server_RoleHandler";
import IEvent from "../event";

export default class GuildMemberAdd implements IEvent {
	public readonly name: string = 'guildMemberAdd';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {
		const member = <GuildMember>args[0];

		const handler = new RoleHandler(`${member.guild.id}.db`);

		if (handler.getUser(member.user.id)) {
			handler.getRoles(member.user.id).forEach(roleID => {
				member.guild.roles.fetch(roleID)
				.then(role => {
					if (role) {
						if (role.name !== '@everyone' && role.rawPosition < member.guild.me!.roles.botRole!.rawPosition) { //This is a bot, should exist
							member.roles.add(role)
							.catch(console.error);
						}
						
					}
				})
				.catch(error => {
					console.error(error);
				});
			});
		} else {
			handler.addUser(member.user.id, member.user.username, member.user.discriminator, member.displayName);
			member.roles.cache.forEach(role => {
				handler.addRole(member.user.id, role.id);
			});
		}
	}
}
