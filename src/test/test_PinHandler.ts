import { PinHandler } from "../server/server_PinHandler";

export class PinHandlerTest {

	readonly FILENAME = '857486711645798430.db';

	public run() {
		let count = 0;
		count += this.serverTestgetChannelsEmpty();
		count += this.serverTestaddChannelToBePinned();
		count += this.serverTestaddChannelToBePinnedDuplicate();
		count += this.serverTestaddChannelToBePinnedSecond();
		count += this.serverTesthasChannel();
		count += this.serverTestgetChannels();
		count += this.serverTestdeleteChannel();
		count += this.serverTesthasArchiveChannelEmpty();
		count += this.serverTestsetArchiveChannelAlreadyInPins();
		count += this.serverTestsetArchiveChannel();
		count += this.serverTesthasArchiveChannel();
		count += this.serverTestgetArchiveChannel();
		count += this.serverTestsetArchiveChannel2();

		return count;
	}

	private serverTestgetChannelsEmpty() {
		console.log("PinHandler class getChannels EMPTY Test Started");
		const test = new PinHandler(this.FILENAME);
		const channels = test.getChannels();
		if (channels.length === 0) {
			console.log("PinHandler class getChannels EMPTY Test Passed");
			return 0;
		}
		console.log("PinHandler class getChannels EMPTY Test Failed");
		return 1;
	}

	private serverTestaddChannelToBePinned() {
		console.log("PinHandler class addChannelToBePinned Test Started");
		const test = new PinHandler(this.FILENAME);
		if (test.addChannel("123")) {
			console.log("PinHandler class addChannelToBePinned Test Passed");
			return 0;
		}
		console.log("PinHandler class addChannelToBePinned Test Failed");
		return 1;
	}

	private serverTestaddChannelToBePinnedDuplicate() {
		console.log("PinHandler class addChannelToBePinned DUPLICATE Test Started");
		const test = new PinHandler(this.FILENAME);
		if (!test.addChannel("123")) {
			console.log("PinHandler class addChannelToBePinned DUPLICATE Test Passed");
			return 0;
		}
		console.log("PinHandler class addChannelToBePinned DUPLICATE Test Failed");
		return 1;
	}

	private serverTestaddChannelToBePinnedSecond() {
		console.log("PinHandler class addChannelToBePinned SECOND Test Started");
		const test = new PinHandler(this.FILENAME);
		if (test.addChannel("133")) {
			console.log("PinHandler class addChannelToBePinned SECOND Test Passed");
			return 0;
		}
		console.log("PinHandler class addChannelToBePinned SECOND Test Failed");
		return 1;
	}

	private serverTesthasChannel() {
		console.log("PinHandler class hasChannel Test Started");
		const test = new PinHandler(this.FILENAME);
		if (test.hasChannel("133")) {
			console.log("PinHandler class hasChannel Test Passed");
			return 0;
		}
		console.log("PinHandler class hasChannel Test Failed");
		return 1;
	}

	private serverTestgetChannels() {
		console.log("PinHandler class getChannels Test Started");
		const test = new PinHandler(this.FILENAME);
		const channels = test.getChannels();
		if (channels[0] === "123" && channels[1] === "133") {
			console.log("PinHandler class getChannels Test Passed");
			return 0;
		}
		console.log("PinHandler class getChannels Test Failed");
		return 1;
	}

	private serverTestdeleteChannel() {
		console.log("PinHandler class deleteChannel Test Started");
		const test = new PinHandler(this.FILENAME);
		test.deleteChannel("123");
		if (!test.hasChannel("123")) {
			console.log("PinHandler class deleteChannel Test Passed");
			return 0;
		}
		console.log("PinHandler class deleteChannel Test Failed");
		return 1;
	}

	private serverTesthasArchiveChannelEmpty() {
		console.log("PinHandler class hasArchiveChannel EMPTY Test Started");
		const test = new PinHandler(this.FILENAME);
		if (!test.hasArchiveChannel()) {
			console.log("PinHandler class hasArchiveChannel EMPTY Test Passed");
			return 0;
		}
		console.log("PinHandler class hasArchiveChannel EMPTY Test Failed");
		return 1;
	}

	private serverTestsetArchiveChannelAlreadyInPins() {
		console.log("PinHandler class setArchiveChannel EXISTS IN PINS Test Started");
		const test = new PinHandler(this.FILENAME);
		if (!test.setArchiveChannel("133")) {
			console.log("PinHandler class setArchiveChannel EXISTS IN PINS Test Passed");
			return 0;
		}
		console.log("PinHandler class setArchiveChannel EXISTS IN PINS Test Failed");
		return 1;
	}

	private serverTestsetArchiveChannel() {
		console.log("PinHandler class setArchiveChannel Test Started");
		const test = new PinHandler(this.FILENAME);
		if (test.setArchiveChannel("143")) {
			console.log("PinHandler class setArchiveChannel Test Passed");
			return 0;
		}
		console.log("PinHandler class setArchiveChannel Test Failed");
		return 1;
	}

	private serverTesthasArchiveChannel() {
		console.log("PinHandler class hasArchiveChannel Test Started");
		const test = new PinHandler(this.FILENAME);
		if (test.hasArchiveChannel()) {
			console.log("PinHandler class hasArchiveChannel Test Passed");
			return 0;
		}
		console.log("PinHandler class hasArchiveChannel Test Failed");
		return 1;
	}

	private serverTestgetArchiveChannel() {
		console.log("PinHandler class getArchiveChannel Test Started");
		const test = new PinHandler(this.FILENAME);
		if (test.getArchiveChannel() === "143") {
			console.log("PinHandler class getArchiveChannel Test Passed");
			return 0;
		}
		console.log("PinHandler class getArchiveChannel Test Failed");
		return 1;
	}

	private serverTestsetArchiveChannel2() {
		console.log("PinHandler class setArchiveChannel SECONDARY Test Started");
		const test = new PinHandler(this.FILENAME);
		test.setArchiveChannel("153");
		if (test.getArchiveChannel() === "153") {
			console.log("PinHandler class setArchiveChannel SECONDARY Test Passed");
			return 0;
		}
		console.log("PinHandler class setArchiveChannel SECONDARY Test Failed");
		return 1;
	}

}