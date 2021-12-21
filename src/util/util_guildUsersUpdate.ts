import { Collection, Guild, Role } from "discord.js";
import { RoleHandler } from "../server/server_RoleHandler";

/**
 * Purges old users/roles/attributes
 * Drops user and role tables and reinstantiates
 * Adds current users back to tables
 * @param guild 
 */
export default function guildUsersUpdate(guild: Guild): void {

	if (guild.available) { //for each available guild, this gets current users and roles
		const currentUserHolder = new Collection<string, SQLUser>();
		const currentUserRoleHolder = new Collection<string, SQLRoles>();
		const userHandler = new RoleHandler(`${guild.id}.db`);
		userHandler.instantiateDB();

		guild.members.cache.filter(member => !member.user.bot).forEach(member => { // https://stackoverflow.com/questions/65120234/how-to-get-all-non-bot-users-in-discord-js-using-a-discord-bot-in-nodejs
			currentUserHolder.set(member.user.id, new SQLUser(member.user.id, member.user.username, member.user.discriminator, member.displayName));
			currentUserRoleHolder.set(member.user.id, new SQLRoles(member.user.id, ...member.roles.cache.values()));
		});

		purgeUsers(userHandler, currentUserHolder); 

		userHandler.refreshUserTable(); //Drops table and reinitalizes it
		userHandler.refreshRoleTable();

		currentUserHolder.forEach(user => { //Add users back into the table
			userHandler.addUser(user.userID, user.name, user.discriminator, user.displayName);
			currentUserRoleHolder.get(user.userID)?.roles.forEach(role => {
				userHandler.addRole(user.userID, role.id);
			});
		});
	}
}

/**
	 * Purges any user in SQL not in current user set
	 * @param userHandler 
	 * @param currentUserHolder 
	 * @returns void
	 */
 function purgeUsers(userHandler: RoleHandler, currentUserHolder: Collection<string, SQLUser>): void {
	const userInSQL = userHandler.getUsers();

	if (userInSQL.length === 0){
		return;
	}

	userInSQL.forEach(user => {
		if (!currentUserHolder.get(user.userID)){
			userHandler.deleteUser(user.userID, true);
		}
	}); 
}

/**
 * @class SQLUser
 * Representation of data in db
 */
 class SQLUser {
	public readonly userID: string;
	public readonly name: string;
	public readonly discriminator: string;
	public readonly displayName: string;
	constructor (userID: string, name: string, discriminator: string, displayName: string) {
		this.userID = userID;
		this.name = name;
		this.discriminator = discriminator;
		this.displayName = displayName;
	}
}

/**
 * @class SQLRoles
 * Representation of data in db
 */
class SQLRoles {
	public readonly userID: string;
	public readonly roles: Role[];
	constructor (userID: string, ...roles: Role[]) { //Access via role.id
		this.userID = userID;
		this.roles = roles;
	}
}