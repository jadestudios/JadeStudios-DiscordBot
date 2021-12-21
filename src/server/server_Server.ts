import Database from 'better-sqlite3';
import ServerFrame from './server_ServerFrame';

/**
 * Handles basic server database actions
 * @extends ServerFrame
 */
export class Server extends ServerFrame {

	/**
	 * 
	 * @constructor Creates a valid file path to be used later
	 * @param fileName name of file with extension
	 */
	constructor(fileName: string) {
		super(fileName);
	}

	/**
	 * Creates a new pre-defined database at the file path if it doesn't exist
	 */
	public instantiateDB() {
		if (!this.foundDB()) {

			const db = new Database(`${this.getFilePath()}`);
			let statement = db.prepare("CREATE TABLE IF NOT EXISTS users (userID TEXT UNIQUE, name TEXT, discriminator TEXT, displayName TEXT)");
			try {
				statement.run();
				statement = db.prepare("CREATE TABLE IF NOT EXISTS attributes (userID TEXT, name TEXT, value INT)");
				statement.run();
				statement = db.prepare("CREATE TABLE IF NOT EXISTS roles (userID TEXT, role TEXT)");
				statement.run();

				statement = db.prepare("CREATE TABLE IF NOT EXISTS toBePinned (channelID TEXT UNIQUE)");
				statement.run();
				statement = db.prepare("CREATE TABLE IF NOT EXISTS archive (channelID TEXT UNIQUE)");
				statement.run();
				statement = db.prepare("CREATE TABLE IF NOT EXISTS hosts (url TEXT UNIQUE)");
				statement.run();

				statement = db.prepare("INSERT INTO hosts VALUES('google.com')");
				statement.run();
				statement = db.prepare("INSERT INTO hosts VALUES('yahoo.com')");
				statement.run();

				db.close();
			} catch (error) {
				console.error(error);
				db.close();
			}
		}
	}

	/**
	 * Removes any null values in a table column
	 * @param table 
	 * @param column 
	 * @returns 0 on fail, 1 on success
	 */
	protected cleanUpNull(table: string, column: string): 0 | 1 {

		const db = new Database(`${this.getFilePath()}`);
		const statement = db.prepare(`DELETE FROM ${table} WHERE ${column} IS NULL`);
		try {
			statement.run();
		} catch (error) {
			db.close();
			return 0;
		}

		db.close();
		return 1;
	}
}
