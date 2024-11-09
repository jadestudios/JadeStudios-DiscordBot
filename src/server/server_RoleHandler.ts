import Database from 'better-sqlite3';
import { UserHandler } from './server_UserHandler';
import { RoleHandler_Role } from '../interfaces/sqlite_interfaces';

/**
 * Handles all role related actions within a database
 * @extends UserHandler
 */
export class RoleHandler extends UserHandler {

	/**
	 * @constructor Calls the Server class contructor
	 * @param fileName Name of database file
	 */
	constructor(fileName: string) {
		super(fileName);
	}

	/**
	 * Adds a role for a user specified by userID to the database
	 * @param userID 
	 * @param role 
	 * @returns 0 on fail, 1 on success
	 */
	public addRole(userID: string, role: string): 0 | 1 {

		if (typeof this.getUser(userID) === 'undefined') {
			return 0; //Stops if user is not in database
		}

		if (this.hasRole(userID, role)) {
			return 0; //Stops addRole if role exists
		}

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`INSERT INTO roles (userID, role) VALUES (?,?)`);
		try {
			statement.run(userID, role);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Gets all roles associated with userID
	 * @param userID 
	 * @returns string array of roles
	 */
	public getRoles(userID: string): string[] {

		const row = this.getAllData("roles", "role", userID) as RoleHandler_Role[];

		if (typeof row === 'undefined') {
			return [];
		}

		const roles: string[] = [];
		row.forEach(inner => {
			roles.push(inner.role); //Removes role object surrounding the data
		});

		return roles;
	}


	/**
	 * Deletes a role associated with userID
	 * @param userID 
	 * @param role 
	 * @returns 0 on fail, 1 on success
	 */
	public deleteRole(userID: string, role: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`DELETE FROM roles WHERE userID = ? AND role = ?`);
		try {
			statement.run(userID, role);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Checks if a user has a role
	 * @param userID 
	 * @param role 
	 * @returns 0 on fail, 1 on success
	 */
	public hasRole(userID: string, role: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM roles WHERE userID = ? AND role = ?`);
		let row;
		try {
			row = statement.get(userID, role);
		} catch (error) {
			db.close();
			return 0;
		}
		db.close();

		if (typeof row === 'undefined') {
			return 0;
		}

		return 1;
	}

	/**
	 * Drops and Creates roles table
	 */
	public refreshRoleTable(){
		const db = new Database(`${this.getFilePath()}`);
			let statement = db.prepare("DROP TABLE roles");
			try {
				statement.run();
				statement = db.prepare("CREATE TABLE IF NOT EXISTS roles (userID TEXT, role TEXT)");
				statement.run();
				db.close();
			} catch (error) {
				console.error(error);
				db.close();
			}
	}

}