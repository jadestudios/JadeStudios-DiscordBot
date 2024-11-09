import { TimezoneHandler } from "../server/server_TimezoneHandler";

export class TimezoneHandlerTest {
	public run() {
		let count = 0;
		count += this.serverTestgetRandomPlace();
		return count;
	}

	private serverTestgetRandomPlace() {
		console.log("TimezoneHandler class getRandomPlace Test Started");
		const test = new TimezoneHandler();
		const row = test.getRandomPlace(-660);
		console.log(row);
		if (row !== undefined) {
			if (row.url.includes("google")) {
				console.log("TimezoneHandler class getRandomPlace Test Passed");
				return 0;
			}
		}
		console.log("TimezoneHandler class getRandomPlace Test Failed");
		return 1;
	}

}