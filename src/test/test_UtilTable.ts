import { Table } from "../util/util_Table";

export class UtilTableTest {

	public run() {
		let count = 0;
		count += this.utilTestEmptyTable();
		count += this.utilTestAddSmallDataTable();

		this.utilVisualTestLeftTable();
		this.utilVisualTestCenterTable();
		this.utilVisualTestRightTable();

		return count;
	}

	private utilTestEmptyTable() {
		console.log("Table class Empty Table Test Started");

		const table = new Table(1,0,"left");
		if (table.toString() === ''){
			console.log("Table class Empty Table Test Passed");
			return 0;
		}
		console.log("Table class Empty Table Test Failed");
		return 1;
	}

	private utilTestAddSmallDataTable() {
		console.log("Table class Add Data Smaller Than Col Reults Empty Table Test Started");

		const table = new Table(2,0,"left");
		table.add(["123"]);
		if (table.toString() === ''){
			console.log("Table class Add Data Smaller Than Col Reults Empty Table Test Passed");
			return 0;
		}
		console.log("Table class Add Data Smaller Than Col Reults Empty Table Test Failed");
		return 1;
	}

	private utilVisualTestLeftTable() {
		console.log("Table class Visual Test of Left Aligned Table Started");

		const table = new Table(2,0,"left");
		table.add(["SOME 1", "SOME 2"]);
		table.add(["1", "13"]);

		console.log(table.toString());

		console.log("Table class Visual Test of Left Aligned Table Ended");

	}


	private utilVisualTestCenterTable() {
		console.log("Table class Visual Test of Center Aligned Table Started");

		const table = new Table(2,0,"center");
		table.add(["SOME 1", "SOME 2"]);
		table.add(["1", "13"]);

		console.log(table.toString());

		console.log("Table class Visual Test of Center Aligned Table Ended");

	}

	private utilVisualTestRightTable() {
		console.log("Table class Visual Test of Right Aligned Table Started");

		const table = new Table(2,0,"right");
		table.add(["SOME 1", "SOME 2"]);
		table.add(["1", "13"]);

		console.log(table.toString());

		console.log("Table class Visual Test of Right Aligned Table Ended");

	}
}