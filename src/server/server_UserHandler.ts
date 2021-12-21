import Database from 'better-sqlite3';
import { Server } from './server_Server';

/**
 * Handles all user related actions within a database
 * @extends Server 
 */
export class UserHandler extends Server {

	/**
	 * @constructor Calls the Server class contructor
	 * @param fileName Name of database file
	 */
	constructor(fileName: string) {
		super(fileName);
	}

	/**
	 * Adds a user to the database
	 * 
	 * Uses the same monikers as a Discord User object
	 * @param userID 
	 * @param name 
	 * @param discriminator 
	 * @param displayName 
	 * @returns 0 on fail, 1 on success
	 */
	public addUser(userID: string, name: string, discriminator: string, displayName: string): 0 | 1 {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`INSERT INTO users (userID, name, discriminator, displayName) VALUES (?,?,?,?)`);
		try {
			statement.run(userID, name, discriminator, displayName);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Deletes a user with a given userID
	 * @param userID 
	 * @param removeAttributes true to remove/ false to keep
	 * @returns 0 on fail, 1 on success
	 */
	public deleteUser(userID: string, removeAttributes: boolean): 0 | 1 {
		const db = new Database(`${this.getFilePath()}`);
		let statement = db.prepare(`DELETE FROM users WHERE userID = ?`); //Never fails even if userID is not found
		try { //Deletes all data related to userID
			statement.run(userID);
			statement = db.prepare(`DELETE FROM roles WHERE userID = ?`);
			statement.run(userID);
			if(removeAttributes) {
				statement = db.prepare(`DELETE FROM attributes WHERE userID = ?`);
				statement.run(userID);
			}
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Gets a user with a given userID
	 * @param userID 
	 * @returns SQL User object 
	 * 
	 * Access via __.(userID| name | discriminator | displayName)
	 */
	public getUser(userID: string) {
		return this.getData("users", "*", userID);
	}

	/**
	 * Gets a user with a name/ displayname
	 * @param name
	 * @returns SQL User object - Returns the 1st user with name/ displayname
	 * 
	 * Access via __.(userID| name | discriminator | displayName)
	 */
	public getUserWithName(name: string) {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM users WHERE name = ? OR displayName = ?`);
		let row;
		try {
			row = statement.get(name, name);
		} catch (error) {
			db.close();
			return;
		}

		db.close();
		return row;
	}

	/**
	 * Gets all users
	 * @returns SQL User object - array
	 * 
	 * Access via __[n].(userID| name | discriminator | displayName)
	 */
	public getUsers() {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM users`);
		let row;
		try {
			row = statement.all();
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
	 * Checks if the database has a user with a given UserID
	 * @param userID 
	 * @returns 0 on fail, 1 on success
	 */
	public hasUser(userID: string): 0 | 1 {
		if (typeof this.getUser(userID) === 'undefined') {
			return 0;
		}
		return 1;
	}

	/**
	 * Gets the name of user with the userID
	 * @param userID 
	 * @returns name
	 */
	public getName(userID: string):string | undefined {

		const row = this.getData("users", "name", userID);

		if (typeof row === 'undefined') {
			return;
		}

		return row.name;
	}

	/**
	 * Sets the name of user with the userID
	 * @param userID 
	 * @param name 
	 * @returns 0 on fail, 1 on success
	 */
	public setName(userID: string, name: string): 0 | 1 {
		return this.setData("users", "name", userID, name);
	}

	/**
	 * Gets the discriminator of user with the userID
	 * @param userID 
	 * @returns discriminator
	 */
	public getDiscrminator(userID: string):string | undefined {

		const row = this.getData("users", "discriminator", userID);

		if (typeof row === 'undefined') {
			return;
		}

		return row.discriminator;
	}

	/**
	 * Sets the discriminator of user with the userID
	 * @param userID 
	 * @param discriminator 
	 * @returns 0 on fail, 1 on success
	 */
	public setDiscrminator(userID: string, discriminator: string): 0 | 1 {
		return this.setData("users", "discriminator", userID, discriminator);
	}

	/**
	 * Gets the display name of user with the userID
	 * @param userID 
	 * @returns display name
	 */
	public getDisplayName(userID: string): string | undefined {
		const row = this.getData("users", "displayName", userID);

		if (typeof row === 'undefined') {
			return;
		}

		return row.displayName;
	}

	/**
	 * Sets the display name of user with the userID
	 * @param userID 
	 * @param displayName 
	 * @returns 0 on fail, 1 on success
	 */
	public setDisplayName(userID: string, displayName: string): 0 | 1 {
		return this.setData("users", "displayName", userID, displayName);
	}

	/**
	 * Generalized function for updating database info where userID is the key
	 * @param table table in database
	 * @param column column in table
	 * @param userID 
	 * @param changeParam new data that is set
	 * @returns 0 on fail, 1 on success
	 */
	protected setData(table: string, column: string, userID: string, changeParam: string): 0 | 1 {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`UPDATE ${table} SET ${column} = ? WHERE userID = ?`);
		try {
			statement.run(changeParam, userID);
		} catch (error) {
			db.close();
			return 0;
		}
		db.close();
		return 1;
	}

	/**
	 * Generalized function that gets the first row of data that matches userID
	 * @param table table in database
	 * @param column column in table
	 * @param userID 
	 * @returns SQL object
	 */
	protected getData(table: string, column: string, userID: string) {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT ${column} FROM ${table} WHERE userID = ?`);
		let row;
		try {
			row = statement.get(userID);
		} catch (error) {
			db.close();
			return;
		}

		db.close();
		return row;
	}

	/**
	 * Generalized function that gets all data that matches userID
	 * @param table 
	 * @param column 
	 * @param userID 
	 * @returns SQL object
	 */
	protected getAllData(table: string, column: string, userID: string) {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT ${column} FROM ${table} WHERE userID = ?`);
		let row;
		try {
			row = statement.all(userID);
		} catch (error) {
			db.close();
			return;
		}

		db.close();
		return row;
	}

	/**
	 * Drops and Creates users table
	 */
	public refreshUserTable(){
		const db = new Database(`${this.getFilePath()}`);
			let statement = db.prepare("DROP TABLE users");
			try {
				statement.run();
				statement = db.prepare("CREATE TABLE IF NOT EXISTS users (userID TEXT UNIQUE, name TEXT, discriminator TEXT, displayName TEXT)");
				statement.run();
				db.close();
			} catch (error) {
				console.error(error);
				db.close();
			}
	}

}