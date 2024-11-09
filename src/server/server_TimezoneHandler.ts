import Database from 'better-sqlite3';
import ServerFrame from './server_ServerFrame';
import { TimezoneHandler_Place } from '../interfaces/sqlite_interfaces';

/**
 * Handles time related items in its own database
 * @extends ServerFrame
 */
export class TimezoneHandler extends ServerFrame {

	/**
	 * @constructor Creates a valid file path to be used later
	 */
	constructor() {
		const fileName = "timezones_compact.db"; //Will always use this name
		super(fileName);
	}


	/**
	 * Gets a random place for a given time offset
	 * @param offset Time offset in minutes from -660 to 840
	 * @returns SQL object
	 * 
	 * Access via _.(placeMessage | url)
	 */
	public getRandomPlace(offset: number): TimezoneHandler_Place | undefined {
		if (this.foundDB()) {
			const db = new Database(`${this.getFilePath()}`);
			const statement = db.prepare(`SELECT placeMessage, url FROM timezones WHERE offset = ? ORDER by random()`);
			let row;
			try {
				row = statement.get(offset);
			} catch (error) {
				db.close();
				return;
			}
			db.close();

			return row as TimezoneHandler_Place;
		}
	}
}