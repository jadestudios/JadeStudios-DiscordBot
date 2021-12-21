/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
* @file util_table.ts - Previously known as table.js
* @function Builds a uniformed table when provided data in the form of strings
* @author thenerdoflight @ Jade Studios
*         jadestudios.uk
*/

export class Table {

	readonly table = {
		topLeftCorner: '╔',
		topTeeJunction: '╦',
		topRightCorner: '╗',
		middleLeftBar: '╠',
		middleJunction: '╬',
		middleRightBar: '╣',
		bottomLeftCorner: '╚',
		bottomTeeJunction: '╩',
		bottomRightCorner: '╝',
		line: '═',
		bar: '║',
	};

	private data: string[][];
	private sizes: number[];
	private width: number;
	private padding: number;
	private alignment: "left" | "center" | "right";

	/**
	* @constructor -  new Table object
	*
	* @param {number} columns
	*    int > 0 - must match the amount of data columns provided later
	* @param {number} padding
	*    int > 0 - provides padding for the whitespace in the table
	* @param {string}
	*   alignment [left, center, right] - aligns the text within the table
	*/
	constructor(columns: number, padding: number, alignment: "left" | "center" | "right") {
		this.data = [];
		this.sizes = [];
		this.width = columns;
		this.padding = padding;
		this.alignment = alignment;
	}

	/**
	* add() / push()
	* @function Adds data into the Table object and updates the column sizing
	* @param {array} data array of data up to or greater than the size of columns from the constructor
	*                this.data should be a 2D array
	* @returns
	*        1 on success
	*        0 on fail
	*/
	public add(data: string[]) {
		if(data.length < this.width){
			return 0;
		}
		this.data.push(data);
		this.updateSize();
		return 1;
	}

	public push(data: string[]) {
		this.add(data);
	}

	private updateSize() {
		this.data.forEach(data => {
			for (let i = 0; i < this.width; i++) { //Sizes dynamically updates when data is put in.
				if (typeof this.sizes[i] === "undefined" || this.sizes[i] < data[i].length) {
					this.sizes[i] = data[i].length + this.padding;
				}
			}
		});
	}

	/**
	* toString()
	* @function
	*        makes a table and returns a string representation of the table
	* @returns
	*        table as a string or an empty string on fail
	*/
	public toString() {
		const arrayTable = this.EdgesOfTable(this.sizes);
		if (arrayTable.length === 0){
			console.error("util_Table.ts: No data in table");
			return '';
		}

		const dataTable = this.DataOfTable(this.sizes, this.data, arrayTable[1], this.alignment);
		return arrayTable[0] + dataTable + arrayTable[2];
	}

	/**
	* EdgesOfTable(maxLength)
	* @function
	*        Makes the edges of the table as Strings with new line appended
	* @param {array} maxLength
	*        array of ints >= length of longest data item
	* @returns
	*        Array of Strings [top, middle, bottom]
	*/
	private EdgesOfTable(maxLength: number[]) {

		if (maxLength.length === 0) {
			return [];
		}

		let printTop = this.table.topLeftCorner;     // Goal:╔══╦══╗
		let printBot = this.table.bottomLeftCorner;  // Goal:╚══╩══╝
		let printMiddle = this.table.middleLeftBar;  // Goal:╠══╬══╣

		for (let i = 0; i < maxLength.length; i++) {
			for (let j = 0; j < maxLength[i]; j++) {
				printTop += this.table.line;
				printBot += this.table.line;
				printMiddle += this.table.line;
			}
			if (i == (maxLength.length - 1)) {
				printTop += this.table.topRightCorner;
				printBot += this.table.bottomRightCorner;
				printMiddle += this.table.middleRightBar;
			} else {
				printTop += this.table.topTeeJunction;
				printBot += this.table.bottomTeeJunction;
				printMiddle += this.table.middleJunction;
			}
		}

		printTop += '\n';
		printBot += '\n';
		printMiddle += '\n';

		return [printTop, printMiddle, printBot];
	}

	/**
	* DataOfTable(maxLength, data, printMiddle, alignment)
	* @function
	*        Creates the middle portion of table that consists of data
	* @param {array} maxLength
	*          array of ints >= length of longest data item
	* @param {array} data
	*          Essentially using this.data (a 2D array)
	* @param {string} printMiddle
	*          String for middle edge created by EdgesOfTable(maxLength);
	* @param {string} alignment
	*          Refer to this.alignment
	* @returns
	*        String of concatenated data and edge
	*/
	private DataOfTable(maxLength: number[], data: string[][], printMiddle: string, alignment: "left" | "center" | "right") {

		if (maxLength.length === 0) {
			return '';
		}
		let printData = ''; // Goal: ║ data ║ data ║ or ║  data║  data║ or ║data  ║data  ║
							//      Center Align        Right Align        Left Align

		for (let i = 0; i < data.length; i++) {
			const element = data[i];

			switch (alignment) {
				case 'center': {
					printData += this.table.bar;

					for (let j = 0; j < maxLength.length; j++) {
						for (let k = Math.ceil(element[j].length / 2); k < Math.ceil(maxLength[j] / 2); k++) {
							printData += ' '; // Adds spacing left of the data
						}

						printData += element[j];

						for (let k = Math.floor(element[j].length / 2); k < Math.floor(maxLength[j] / 2); k++) {
							printData += ' '; // Adds spacing right of the data
						}

						printData += this.table.bar;
					}
					break;
				}

				case 'right': {
					printData += this.table.bar;

					for (let j = 0; j < maxLength.length; j++) {
						for (let k = element[j].length; k < maxLength[j]; k++) {
							printData += ' ';// Adds spacing left of the data
						}

						printData += element[j];
						printData += this.table.bar;
					}
					break;
				}

				default: { //LEFT ALIGN
					printData += this.table.bar;

					for (let j = 0; j < maxLength.length; j++) {
						printData += element[j];

						for (let k = element[j].length; k < maxLength[j]; k++) {
							printData += ' '; // Adds spacing after the data
						}
						printData += this.table.bar;
					}
					break;
				}

			}

			printData += '\n';

			if (i < (data.length - 1)) {
				printData += printMiddle; // Adds ╠══╬══╣ to string
			}
		}
		return printData;
	}
}

