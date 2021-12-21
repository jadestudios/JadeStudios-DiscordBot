import Database from 'better-sqlite3';
import { Server } from './server_Server';

/**
 * Handles all host/url related actions within a database
 * @extends Server
 */
export class HostHandler extends Server {

	/**
	 * @constructor Calls the Server class contructor
	 * @param fileName Name of database file
	 */
	constructor(fileName: string) {
		super(fileName);
	}

	/**
	 * Adds a host/url to the database
	 * @param url 
	 * @returns 0 on fail, 1 on success
	 */
	public addHost(url: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`INSERT INTO hosts (url) VALUES (?)`);
		try {
			statement.run(url);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Deletes a host/url from database
	 * @param url 
	 * @returns 0 on fail, 1 on success
	 */
	public deleteHost(url: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`DELETE FROM hosts WHERE url = ?`);
		try {
			statement.run(url);
		} catch (error) {
			db.close();
			return 0;
		}

		db.close();

		return 1;
	}


	/**
	 * Replaces old host/url with new host/url
	 * @param oldUrl 
	 * @param newUrl 
	 * @returns 0 on fail, 1 on success
	 */
	public replaceHost(oldUrl: string, newUrl: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`UPDATE hosts SET url = (?) WHERE url = ?`)

		try {
			statement.run(newUrl, oldUrl);
		} catch (error) {
			console.error(error);
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}

	/**
	 * Gets all the hosts/urls and strips the SQL object
	 * @returns string array of hosts/urls
	 */
	public getHosts(): string[] {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`SELECT * FROM hosts`);
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

		const urls: string[] = [];
		row.forEach(inner => {
			urls.push(inner.url);
		});

		return urls;
	}
}