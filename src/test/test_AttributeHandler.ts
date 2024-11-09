import { AttributeHandler } from "../server/server_AttributeHandler";

export class AttributeHandlerTest {

	readonly FILENAME = '857486711645798430.db';

	public run() {
		let count = 0;
		count += this.serverTestaddAttributeToUser1();
		count += this.serverTestaddAttribute2ToUser1();
		count += this.serverTestaddDuplicateAttributeToUser1();
		count += this.serverTestaddAttributeToUser2();
		count += this.serverTestgetAttributesOfUser1();
		count += this.serverTestgetAttributeHotOfUser1();
		count += this.serverTestgetAllWithAttribute();
		count += this.serverTestdeleteAttributeFromUser1();
		count += this.serverTesthasAttribute();
		return count;
	}

	private serverTestaddAttributeToUser1() {
		console.log("AttributeHandler class addAttribute To User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (test.addAttribute("1", "HOT", 100)) {
			console.log("AttributeHandler class addAttribute To User 1 Test Passed");
			return 0;
		}
		console.log("AttributeHandler class addAttribute To User 1 Test Failed");
		return 1;
	}

	private serverTestaddDuplicateAttributeToUser1() {
		console.log("AttributeHandler class addAttribute Duplicate To User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (!test.addAttribute("1", "HOT", 100)) {
			console.log("AttributeHandler class addAttribute To User 1 Test Passed");
			return 0;
		}
		console.log("AttributeHandler class addAttribute To User 1 Test Failed");
		return 1;
	}

	private serverTestaddAttribute2ToUser1() {
		console.log("AttributeHandler class addAttribute 2 To User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (test.addAttribute("1", "LAME", 100)) {
			console.log("AttributeHandler class addAttribute 2 To User 1 Test Passed");
			return 0;
		}
		console.log("AttributeHandler class addAttribute 2 To User 1 Test Failed");
		return 1;
	}

	private serverTestaddAttributeToUser2() {
		console.log("AttributeHandler class addAttribute To User 2 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (test.addAttribute("2", "LAME", 54)) {
			console.log("AttributeHandler class addAttribute To User 2 Test Passed");
			return 0;
		}
		console.log("AttributeHandler class addAttribute To User 2 Test Failed");
		return 1;
	}

	private serverTestgetAttributesOfUser1() {
		console.log("AttributeHandler class getAttributes of User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (test.getAttributes('1')[0].name === "HOT" && test.getAttributes('1')[1].name === "LAME") {
			console.log("AttributeHandler class getAttributes of User 1 Test Passed");
			return 0;
		}
		console.log("AttributeHandler class getAttributes of User 1 Test Failed");
		return 1;
	}
	private serverTestgetAttributeHotOfUser1() {
		console.log("AttributeHandler class getAttribute Hot of User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		const x = test.getAttribute('1', "HOT");
		if (x !== undefined) {
			if (x.value === 100) {
				console.log("AttributeHandler class getAttribute Hot of User 1 Test Passed");
				return 0;
			}
		}
		console.log("AttributeHandler class getAttribute Hot of User 1 Test Failed");
		return 1;

	} private serverTestgetAllWithAttribute() {
		console.log("AttributeHandler class getAllWithAttribute Test Started");
		const test = new AttributeHandler(this.FILENAME);
		const all = test.getAllWithAttribute("LAME");
		if (all[0].userID === "1" && all[1].userID === "2") {
			console.log("AttributeHandler class getAllWithAttribute Test Passed");
			return 0;
		}
		console.log("AttributeHandler class getAllWithAttribute Test Failed");
		return 1;
	}

	private serverTestdeleteAttributeFromUser1() {
		console.log("AttributeHandler class deleteAttribute from User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (test.deleteAttribute("1", "HOT")) {
			console.log("AttributeHandler class deleteAttribute from User 1  Test Passed");
			return 0;
		}
		console.log("AttributeHandler class deleteAttribute from User 1  Test Failed");
		return 1;
	}

	private serverTesthasAttribute() {
		console.log("AttributeHandler class hasAttribute of Deleted from User 1 Test Started");
		const test = new AttributeHandler(this.FILENAME);
		if (!test.hasAttribute("1", "HOT")) {
			console.log("AttributeHandler class hasAttribute of Deleted from User 1  Test Passed");
			return 0;
		}
		console.log("AttributeHandler class hasAttribute of Deleted from User 1  Test Failed");
		return 1;
	}
}