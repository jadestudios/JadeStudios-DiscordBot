/**
* @file table.js
* @function Builds a uniformed table when provided data
* @author thenerdoflight @ Jade Studios
*         jadestudios.uk
*/

const table = {
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

class Table {

	/**
    * @constructor -  new Table object
    *
    * @param {number} columns
    *    int > 0 - must match the ammount of data columns provided later
    * @param {number} padding
    *    int > 0 - provides padding for the whitespace in the table
    * @param {string}
    *   alignment [left, center, right] - aligns the text within the table
    */
	constructor(columns, padding, alignment) {
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
    */
	add(data) {
		this.data.push(data);
		this.updateSize();
	}

	push(data) {
		this.add(data);
	}

	updateSize() {
		this.data.forEach(data => {
			for (let i = 0; i < this.width; i++) {
				if (this.sizes[i] == undefined || this.sizes[i] < data[i].length) {
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
    *        String of Table
    */
	toString() {
		const arrayTable = EdgesOfTable(this.sizes);
		const dataTable = DataOfTable(this.sizes, this.data, arrayTable[1], this.alignment);
		return arrayTable[0] + dataTable + arrayTable[2];
	}

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
function EdgesOfTable(maxLength) {

	if (maxLength.length == 0) {
		return undefined;
	}

	let printTop = table.topLeftCorner;     // Goal:╔══╦══╗
	let printBot = table.bottomLeftCorner;  // Goal:╚══╩══╝
	let printMiddle = table.middleLeftBar;  // Goal:╠══╬══╣

	for (let i = 0; i < maxLength.length; i++) {
		for (let j = 0; j < maxLength[i]; j++) {
			printTop += table.line;
			printBot += table.line;
			printMiddle += table.line;
		}
		if (i == (maxLength.length - 1)) {
			printTop += table.topRightCorner;
			printBot += table.bottomRightCorner;
			printMiddle += table.middleRightBar;
		} else {
			printTop += table.topTeeJunction;
			printBot += table.bottomTeeJunction;
			printMiddle += table.middleJunction;
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
function DataOfTable(maxLength, data, printMiddle, alignment) {

	if (maxLength.length == 0) {
		return undefined;
	}
	let printData = ''; // Goal: ║ data ║ data ║ or ║  data║  data║ or ║data  ║data  ║
											//      Center Align        Right Align        Left Align

	for (let i = 0; i < data.length; i++) {
		const element = data[i];

		if (alignment == 'center') {
			printData += table.bar;

			for (let j = 0; j < maxLength.length; j++) {
				for (let k = Math.ceil(element[j].length / 2); k < Math.ceil(maxLength[j] / 2); k++) {
					printData += ' '; // Adds spacing left of the data
				}

				printData += element[j];

				for (let k = Math.floor(element[j].length / 2); k < Math.floor(maxLength[j] / 2); k++) {
					printData += ' '; // Adds spacing right of the data
				}

				printData += table.bar;
			}
		} else if (alignment == 'right') {

			printData += table.bar;

			for (let j = 0; j < maxLength.length; j++) {
				for (let k = element[j].length; k < maxLength[j]; k++) {
					printData += ' ';// Adds spacing left of the data
				}

				printData += element[j];
				printData += table.bar;
			}
		} else { // Left align

			printData += table.bar;

			for (let j = 0; j < maxLength.length; j++) {
				printData += element[j];

				for (let k = element[j].length; k < maxLength[j]; k++) {
					printData += ' '; // Adds spacing after the data
				}
				printData += table.bar;
			}
		}

		printData += '\n';

		if (i < (data.length - 1)) {
			printData += printMiddle; // Adds ╠══╬══╣ to string
		}
	}
	return printData;
}

module.exports = { Table };
