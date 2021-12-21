import Database from 'better-sqlite3';
import { Server } from './server_Server';

/**
 * Handles all pin related actions within a database
 * @extends Server
 */
export class PinHandler extends Server {

	/**
	 * @constructor Calls the Server class contructor
	 * @param fileName Name of database file
	 */
	constructor(fileName: string) {
		super(fileName);
	}

	/**
	 * Adds a channel to the database to be archived
	 * @param channelID 
	 * @returns 0 on fail, 1 on success
	 */
	public addChannel(channelID: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`INSERT INTO toBePinned (channelID) VALUES (?)`);
		try {
			statement.run(channelID);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Sets which channel should everything archive to
	 * @param channelID 
	 * @returns 0 on fail, 1 on success
	 */
	public setArchiveChannel(channelID: string): 0 | 1 {

		if (this.hasChannel(channelID)) {
			return 0; //archive and pin must be different
		}

		const db = new Database(`${this.getFilePath()}`);
		let statement;

		switch (this.hasArchiveChannel()) {
			case 1: {
				//if exists, this updates
				statement = db.prepare(`UPDATE archive SET channelID = (?) WHERE ROWID = 1`);
				break;
			}

			case 0: {
				//if not exists, this sets the channel
				statement = db.prepare(`INSERT INTO archive (channelID) VALUES (?)`);
				break;
			}
		}

		try {
			statement.run(channelID);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Deletes a channel from being archived
	 * @param channelID 
	 * @returns 0 on fail, 1 on success
	 */
	public deleteChannel(channelID: string): 0 | 1 {
		return this.deleteChannelInTable("toBePinned", channelID);
	}

	/**
	 * Generalized function to delete channel data given a channelID
	 * @param table table in database
	 * @param channelID 
	 * @returns 0 on fail, 1 on success
	 */
	private deleteChannelInTable(table: string, channelID: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`DELETE FROM ${table} WHERE channelID = ?`);
		try {
			statement.run(channelID);
		} catch (error) {
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Checks if channel is being archived
	 * @param channelID 
	 * @returns 0 on fail, 1 on success
	 */
	public hasChannel(channelID: string): 0 | 1 {
		return this.hasChannelInTable("toBePinned", channelID);
	}

	/**
	 * Generalized function to check if a table has a channelID
	 * @param table table in database
	 * @param channelID 
	 * @returns 0 on fail, 1 on success
	 */
	private hasChannelInTable(table: string, channelID: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM ${table} WHERE channelID = ?`);
		let row;
		try {
			row = statement.get(channelID);
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
	 * Gets all channels that are being archived
	 * @returns string array of channelIDs
	 */
	public getChannels(): string[] {
		return this.getChannelsFromTable("toBePinned");
	}

	/**
	 * Generailized function that gets all channels within a table
	 * and strips the SQL object
	 * @param table 
	 * @returns string array of channelIDs
	 */
	private getChannelsFromTable(table: string): string[] {
		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM ${table}`);
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

		const channels: string[] = [];
		row.forEach(inner => {
			channels.push(inner.channelID); //Removes channelID object surrounding the data
		});

		return channels;
	}

	/**
	 * Gets the archive channel
	 * @returns channelID
	 */
	public getArchiveChannel(): string {
		return this.getChannelsFromTable("archive")[0];
	}

	/**
	 * Checks if archive channel exists
	 * @returns 0 on fail, 1 on success
	 */
	public hasArchiveChannel(): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM archive WHERE ROWID = 1`);
		let row;
		try {
			row = statement.get();
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
}