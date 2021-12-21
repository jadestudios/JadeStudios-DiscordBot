import path from 'path';
import fs from 'fs';

/**
 * Basic class for server handlers
 * 
 * Handles path creation and file deletion/ checks
 */
export default class ServerFrame {

	private filePath: string;

	/**
	 * 
	 * @constructor Creates a valid file path to be used later
	 * @param fileName name of file with extension
	 */
	constructor(fileName: string) {
		this.filePath = path.resolve(`./prod/configs/${fileName}`);
		if (this.filePath.includes('\\')) { //For Windows 
			this.filePath = this.filePath.replaceAll('\\', '\\\\');
		}
	}

	/**
	 * Gets file path
	 * @returns filePath
	 */
	public getFilePath(): string {
		return this.filePath
	}

	/**
	 * Removes the database
	 */
	public removeDB() {
		if (this.foundDB()) {
			fs.unlinkSync(this.getFilePath());
		}
	}

	/**
	 * Checks if database exists
	 * @returns 0 on fail, 1 on success
	 */
	protected foundDB() {
		if (fs.existsSync(this.getFilePath())) {
			return 1;
		}
		return 0;
	}
}