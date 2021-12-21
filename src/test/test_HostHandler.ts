import { HostHandler } from "../server/server_HostHandler";

export class HostHandlerTest {

	readonly FILENAME = '857486711645798430.db';

	public run() {
		let count = 0;
		//Starts with a dupe test since table contains two entries
		count += this.serverTestaddHostDuplicate();
		count += this.serverTestaddHost();
		count += this.serverTestreplaceHostDuplicate();
		count += this.serverTestreplaceHost();
		count += this.serverTestdeleteHost();
		count += this.serverTestgetHosts();
		count += this.serverTestdeleteAllAndGetEmpty();
		count += this.serverTestaddAllAfterEmpty(); //Resets

		return count;
	}

	private serverTestaddHostDuplicate() {
		console.log("HostHandler class addHost DUPLICATE Test Started");
		const test = new HostHandler(this.FILENAME);
		if (!test.addHost("google.com")) {
			console.log("HostHandler class addHost DUPLICATE Test Passed");
			return 0;
		}
		console.log("HostHandler class addHost DUPLICATE Test Failed");
		return 1;
	}

	private serverTestaddHost() {
		console.log("HostHandler class addHost Test Started");
		const test = new HostHandler(this.FILENAME);
		if (test.addHost("fast.com")) {
			console.log(test.getHosts());
			console.log("HostHandler class addHost Test Passed");
			return 0;
		}
		console.log("HostHandler class addHost Test Failed");
		return 1;
	}

	private serverTestreplaceHostDuplicate() {
		console.log("HostHandler class replaceHost DUPLICATE Test Started");
		const test = new HostHandler(this.FILENAME);
		if (!test.replaceHost("google.com", "fast.com")) {
			console.log("HostHandler class replaceHost DUPLICATE Test Passed");
			return 0;
		}
		console.log("HostHandler class replaceHost DUPLICATE Test Failed");
		return 1;
	}

	private serverTestreplaceHost() {
		console.log("HostHandler class replaceHost Test Started");
		const test = new HostHandler(this.FILENAME);
		if (test.replaceHost("google.com", "bing.com")) {
			console.log(test.getHosts());
			console.log("HostHandler class replaceHost Test Passed");
			return 0;
		}
		console.log("HostHandler class replaceHost Test Failed");
		return 1;
	}

	private serverTestdeleteHost() {
		console.log("HostHandler class deleteHost Test Started");
		const test = new HostHandler(this.FILENAME);
		if (test.deleteHost("bing.com")) {
			console.log(test.getHosts());
			console.log("HostHandler class deleteHost Test Passed");
			return 0;
		}
		console.log("HostHandler class deleteHost Test Failed");
		return 1;
	}

	private serverTestgetHosts() {
		console.log("HostHandler class getHosts Test Started");
		const test = new HostHandler(this.FILENAME);
		if (test.getHosts()[0] === "yahoo.com") {
			console.log("HostHandler class getHosts Test Passed");
			return 0;
		}
		console.log("HostHandler class getHosts Test Failed");
		return 1;
	}

	private serverTestdeleteAllAndGetEmpty() {
		console.log("HostHandler class getHosts EMPTY Test Started");
		const test = new HostHandler(this.FILENAME);
		test.deleteHost("yahoo.com");
		test.deleteHost("fast.com");
		if (test.getHosts().length === 0) {
			console.log(test.getHosts());
			console.log("HostHandler class getHosts EMPTY Test Passed");
			return 0;
		}
		console.log("HostHandler class getHosts EMPTY Test Failed");
		return 1;
	}

	private serverTestaddAllAfterEmpty() {
		console.log("HostHandler class addHost AFTER EMPTY Test Started");
		const test = new HostHandler(this.FILENAME);
		test.addHost("google.com");
		test.addHost("yahoo.com");
		if (test.getHosts()[0] === "google.com") {
			console.log(test.getHosts());
			console.log("HostHandler class addHost AFTER EMPTY Test Passed");
			return 0;
		}
		console.log("HostHandler class addHost AFTER EMPTY Test Failed");
		return 1;
	}
}