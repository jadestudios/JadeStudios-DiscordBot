import { UserHandler } from '../server/server_UserHandler';
import fs from 'fs';

export class UserHandlerTest {

	readonly FILENAME = '857486711645798430.db';

	public run() {
		//fs.unlinkSync('C:\\\\Users\\\\Ice_Cream\\\\Desktop\\\\DiscordBot\\\\BotTestTSN\\\\prod\\\\configs\\\\857486711645798430.db');
		let count = 0;
		count += this.serverTestFileName();
		count += this.serverTestRemoveDB(); //This creates and removes a db
		count += this.serverTestInstantiateDB();
		count += this.serverTestCreateUser();
		if (!this.serverTestCreateUser()) {
			count++;//Second one should fail due to UNIQUE flag
		}
		count += this.serverTestGetName();
		count += this.serverTestGetNameNotInDB();
		count += this.serverTestsetName();
		count += this.serverTestGetDiscriminator();
		count += this.serverTestGetDisplayName();
		count += this.serverTestsetDiscriminator();
		count += this.serverTestsetDisplayName();
		count += this.serverTestGetUser();
		count += this.serverTestDeleteUser();
		count += this.serverTestCreateUser();//Prep for next test
		count += this.serverTestCreateUser2();
		return count;
	}

	private serverTestFileName() {
		console.log("UserHandler Class getFilePath Test Started");
		const test = new UserHandler(this.FILENAME);
		if (test.getFilePath() === 'C:\\\\Users\\\\Ice_Cream\\\\Desktop\\\\DiscordBot\\\\BotTestTSN\\\\prod\\\\configs\\\\857486711645798430.db') {
			console.log(test.getFilePath());
			console.log("UserHandler Class File Path Test Passed");
			return 0;
		}
		console.log(test.getFilePath());
		console.log("UserHandler Class File Path Test Failed");
		return 1;
	}

	private serverTestInstantiateDB() {
		console.log("UserHandler Class instantiateDB Test Started");
		const test = new UserHandler(this.FILENAME);
		test.instantiateDB();
		if (fs.existsSync(test.getFilePath())) {
			console.log("UserHandler Class instantiateDB Test Passed");
			return 0;
		}
		console.log("UserHandler Class instantiateDB Test Failed");
		return 1;
	}

	private serverTestRemoveDB() {
		console.log("UserHandler Class removeDB Test Started");
		const test = new UserHandler(this.FILENAME);
		test.instantiateDB();
		test.removeDB();
		if (!fs.existsSync(test.getFilePath())) {
			console.log("UserHandler Class removeDB Test Passed");
			return 0;
		}
		console.log("UserHandler Class removeDB Test Failed");
		return 1;
	}

	private serverTestCreateUser() {
		console.log("UserHandler Class createUser Test Started");
		const test = new UserHandler(this.FILENAME);
		if (test.addUser("1", "Bob", "112", "Sob")) {
			console.log("UserHandler Class createUser Test Passed");
			return 0;
		}
		console.log("UserHandler Class createUser Test Failed");
		return 1;
	}

	private serverTestCreateUser2() {
		console.log("UserHandler Class createUser 2 Test Started");
		const test = new UserHandler(this.FILENAME);
		if (test.addUser("2", "Nob", "112", "Shob")) {
			console.log("UserHandler Class createUser 2 Test Passed");
			return 0;
		}
		console.log("UserHandler Class createUser 2 Test Failed");
		return 1;
	}

	private serverTestGetName() {
		console.log("UserHandler Class getName Test Started");
		const test = new UserHandler(this.FILENAME);
		const name = test.getName("1");

		if (name === 'Bob') {
			console.log("UserHandler Class getName Test Passed");
			return 0;
		}
		console.log("UserHandler Class getName Test Failed");
		return 1;
	}

	private serverTestGetNameNotInDB() {
		console.log("UserHandler Class getName NotInDB Test Started");
		const test = new UserHandler(this.FILENAME);
		const name = test.getName("0");

		if (typeof name === 'undefined') {
			console.log("UserHandler Class getName NotInDB Test Passed");
			return 0;
		}
		console.log("UserHandler Class getName NotInDB Test Failed");
		return 1;
	}

	private serverTestsetName() {
		console.log("UserHandler Class setName Test Started");
		const test = new UserHandler(this.FILENAME);
		test.setName("1", "Rob");
		if (test.getName("1") === "Rob") {
			console.log("UserHandler Class setName Test Passed");
			return 0;
		}
		console.log("UserHandler Class setName Test Failed");
		return 1;
	}

	private serverTestGetDiscriminator() {
		console.log("UserHandler Class getDiscriminator Test Started");
		const test = new UserHandler(this.FILENAME);
		const discriminator = test.getDiscrminator("1");

		if (discriminator === '112') {
			console.log("UserHandler Class getDiscriminator Test Passed");
			return 0;
		}
		console.log("UserHandler Class getDiscriminator Test Failed");
		return 1;
	}

	private serverTestsetDiscriminator() {
		console.log("UserHandler Class setDiscriminator Test Started");
		const test = new UserHandler(this.FILENAME);
		test.setDiscrminator("1", "111");
		if (test.getDiscrminator("1") === "111") {
			console.log("UserHandler Class setDiscriminator Test Passed");
			return 0;
		}
		console.log("UserHandler Class setDiscriminator Test Failed");
		return 1;
	}

	private serverTestGetDisplayName() {
		console.log("UserHandler Class getDisplayName Test Started");
		const test = new UserHandler(this.FILENAME);
		const displayName = test.getDisplayName("1");

		if (displayName === 'Sob') {
			console.log("UserHandler Class getDisplayName Test Passed");
			return 0;
		}
		console.log("UserHandler Class getDisplayName Test Failed");
		return 1;
	}

	private serverTestsetDisplayName() {
		console.log("UserHandler Class setDisplayName Test Started");
		const test = new UserHandler(this.FILENAME);
		test.setDisplayName("1", "Cob");
		if (test.getDisplayName("1") === "Cob") {
			console.log("UserHandler Class setDisplayName Test Passed");
			return 0;
		}
		console.log("UserHandler Class setDisplayName Test Failed");
		return 1;
	}

	private serverTestGetUser() {
		console.log("UserHandler Class getUser Test Started");
		const test = new UserHandler(this.FILENAME);
		if (!(typeof test.getUser("1") === 'undefined')) {
			console.log("UserHandler Class getUser Test Passed");
			return 0;
		}
		console.log("UserHandler Class getUser Test Failed");
		return 1;
	}

	private serverTestDeleteUser() {
		console.log("UserHandler Class deleteUser Test Started");
		const test = new UserHandler(this.FILENAME);
		test.deleteUser("1", true);
		if (!test.hasUser("1")) {
			console.log("UserHandler Class deleteUser Test Passed");
			return 0;
		}
		console.log("UserHandler Class deleteUser Test Failed");
		return 1;
	}


}