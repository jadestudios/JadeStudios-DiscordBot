import { RoleHandler } from "../server/server_RoleHandler";

export class RoleHandlerTest {

	readonly FILENAME = '857486711645798430.db';

	public run() {
		let count = 0;
		count += this.serverTestaddRole();
		count += this.serverTestaddRole2();
		count += this.serverTestgetRole();
		count += this.serverTestaddDuplicateRole();
		count += this.serverTestdeleteRole();
		count += this.serverTestdeleteRoleNonExist();//0 rows affected - no errors

		return count;
	}

	private serverTestaddRole() {
		console.log("RoleHandler class addRole Test Started");
		const test = new RoleHandler(this.FILENAME);
		if (test.addRole("1", "1646")) {
			console.log("RoleHandler class addRole Test Passed");
			return 0;
		}
		console.log("RoleHandler class addRole Test Failed");
		return 1;
	}

	private serverTestaddRole2() {
		console.log("RoleHandler class addRole2 Test Started");
		const test = new RoleHandler(this.FILENAME);
		if (test.addRole("1", "1645")) {
			console.log("RoleHandler class addRole2 Test Passed");
			return 0;
		}
		console.log("RoleHandler class addRole2 Test Failed");
		return 1;
	}

	private serverTestgetRole() {
		console.log("RoleHandler class getRole Test Started");
		const test = new RoleHandler(this.FILENAME);
		const testRoles = [ '1646', '1645' ];
		const roles = test.getRoles("1");
		let checks = 0;
		
		if(roles.length === testRoles.length){
			checks++;
		}else{
			console.log("RoleHandler class getRole Test Failed");
			return 1;
		}
		
		for (let i = 0; i < testRoles.length; i++) {
			if (testRoles[i] === roles[i]){
				checks++;
			}
		}

		if (checks === 3) {
			console.log("RoleHandler class getRole Test Passed");
			return 0;
		}
		console.log("RoleHandler class getRole Test Failed");
		return 1;
	}

	private serverTestaddDuplicateRole() {
		console.log("RoleHandler class addDuplicateRole Test Started");
		const test = new RoleHandler(this.FILENAME);
		if (!test.addRole("1", "1646")) {
			console.log("RoleHandler class addDuplicateRole Test Passed");
			return 0;
		}
		console.log("RoleHandler class addDuplicateRole Test Failed");
		return 1;
	}

	private serverTestdeleteRole() {
		console.log("RoleHandler class deleteRole Test Started");
		const test = new RoleHandler(this.FILENAME);
		test.deleteRole("1", "1646");
		if (!test.hasRole("1", "1646")) {
			console.log("RoleHandler class deleteRole Test Passed");
			return 0;
		}
		console.log("RoleHandler class deleteRole Test Failed");
		return 1;
	}

	private serverTestdeleteRoleNonExist() {
		console.log("RoleHandler class deleteRole NonExistant Test Started");
		const test = new RoleHandler(this.FILENAME);
		if (test.deleteRole("1", "1646")) {
			console.log("RoleHandler class deleteRole NonExistant Test Passed");
			return 0;
		}
		console.log("RoleHandler class deleteRole NonExistant Test Failed");
		return 1;
	}
}