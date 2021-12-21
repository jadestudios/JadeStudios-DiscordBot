import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

export class timezones_to_db {

	readonly FILENAME = 'timezones_compact.db';
	readonly FILETOREAD = 'timezones_compact.json';

	private filePath: string;
	private fileToReadPath: string;

	constructor() {
		this.filePath = path.resolve(`./prod/configs/${this.FILENAME}`);
		if (this.filePath.includes('\\')) { //For Windows 
			this.filePath = this.filePath.replaceAll('\\', '\\\\');
		}

		this.fileToReadPath = path.resolve(`./prod/configs/${this.FILETOREAD}`);
		if (this.fileToReadPath.includes('\\')) { //For Windows 
			this.fileToReadPath = this.fileToReadPath.replaceAll('\\', '\\\\');
		}
	}

	public run() {
		const db = new Database(`${this.filePath}`);
		let statement = db.prepare("CREATE TABLE IF NOT EXISTS timezones (placeMessage TEXT UNIQUE, url TEXT UNIQUE, offset INT)");
		statement.run();

		const tzi = JSON.parse(fs.readFileSync(this.fileToReadPath, 'utf8'));
		tzi.forEach(area => {

			(area.places).forEach(selectedPlace => {

				const tziPlaceTemp = selectedPlace.split('\n');

				let tziCity = tziPlaceTemp[0].split(' ');
				tziCity.shift();
				tziCity.pop();

				tziCity = tziCity.toString().replaceAll(",", "+");

				let tziCountry = tziPlaceTemp[1].split(' ');
				tziCountry.shift();
				tziCountry.pop();

				tziCountry = tziCountry.toString().replaceAll(",", "+");

				const url = `https://www.google.com/maps/search/${tziCity}+${tziCountry}`;

				statement = db.prepare(`INSERT INTO timezones (placeMessage, url, offset) VALUES (?,?,?)`);
				try {
					statement.run(selectedPlace, url, area.offsetInMinutes);
				} catch (error) {
					console.error(error);
				}
			});

		});

		db.close();
	}

}