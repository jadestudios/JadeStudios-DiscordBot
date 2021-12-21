import Database from 'better-sqlite3';
import { UserHandler } from './server_UserHandler';

/**
 * Handles all attribute related actions within a database
 * @extends UserHandler
 */
export class AttributeHandler extends UserHandler {

	/**
	 * @constructor Calls the Server class contructor
	 * @param fileName Name of database file
	 */
	constructor(fileName: string) {
		super(fileName);
	}

	/**
	 * Adds an attribute for a user specified by userID to the database
	 * @param userID 
	 * @param name 
	 * @param value 
	 * @returns 0 on fail, 1 on success
	 */
	public addAttribute(userID: string, name: string, value: number): 0 | 1 {

		if (typeof this.getUser(userID) === 'undefined') {
			return 0;
		}

		if (this.hasAttribute(userID, name)) {
			return 0; //Stops addAttribute if attribute exists
		}

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`INSERT INTO attributes (userID, name, value) VALUES (?,?,?)`);
		try {
			statement.run(userID, name, value);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Updates an attribute for a user specified by userID to the database
	 * @param userID 
	 * @param name 
	 * @param value 
	 * @returns 0 on fail, 1 on success
	 */
	public updateAttribute(userID: string, name: string, value: number): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`UPDATE attributes SET value = ? WHERE userID = ? AND name = ?`);
		try {
			statement.run(value, userID, name);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Gets all attributes associated with a user
	 * @param userID 
	 * @returns Array of SQL object
	 * 
	 * Access by __[n].(name | value)
	 */
	public getAttributes(userID: string) {

		const row = this.getAllData("attributes", "name, value", userID);

		if (typeof row === 'undefined') {
			return [];
		}

		return row;
	}

	/**
	 * Gets a certain attribute of user
	 * @param userID 
	 * @param name 
	 * @returns SQL object
	 * 
	 * Access by _.(userID | name | value)
	 */
	public getAttribute(userID: string, name: string) {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM attributes WHERE userID = ? AND name = ?`);
		let row;
		try {
			row = statement.get(userID, name);
		} catch (error) {
			db.close();
			return;
		}
		db.close();

		return row;
	}

	/**
	 * Get all data that matches an attribute in descending order
	 * @param name 
	 * @returns Array of SQL objects
	 * 
	 * Access by __[n].(userID | name | value)
	 */
	public getAllWithAttribute(name: string) {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM attributes WHERE name = ? ORDER BY value DESC`);
		let row;
		try {
			row = statement.all(name);
		} catch (error) {
			db.close();
			return [];
		}

		db.close();

		if (typeof row === 'undefined') {
			return [];
		}

		return row;
	}

	/**
	 * Deletes an attribute from user
	 * @param userID 
	 * @param name 
	 * @returns 0 on fail, 1 on success
	 */
	public deleteAttribute(userID: string, name: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`DELETE FROM attributes WHERE userID = ? AND name = ?`);
		try {
			statement.run(userID, name);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Checks if user has attribute
	 * @param userID 
	 * @param name 
	 * @returns 0 on fail, 1 on success
	 */
	public hasAttribute(userID: string, name: string): 0 | 1 {

		const row = this.getAttribute(userID, name);

		if (typeof row === 'undefined') {
			return 0;
		}

		return 1;
	}
}