module.exports = {
	name: 'attributes',
	description: 'Adds|Deletes|Updates|Lists|Prints attributes',
	execute(prefix, command, args, message, fileName) {
		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} <add|remove|update> <Attribute Name> <user> [Attribute Value],
								${prefix}${command} <list> <user>,
								${prefix}${command} <print> <Attribute Name> <user>,
								or ${prefix}${command} <printall> <Attribute Name>`;

		if (args.length < 2) {
			message.channel.send(invalidMessage);
			return;
		}

		const { Attributes } = require('../genericConst');
		const { Table } = require('../table');
		const fs = require('fs');
		const Discord = require('discord.js');

		const server = JSON.parse(fs.readFileSync(fileName, 'utf8'));

		switch (args[0].toLowerCase()) {
			case 'add': {

				const currentUser = attributeFindUser(args[2], server);

				if (currentUser == undefined) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				const currentAttribute = attributeFindAttribute(args[1], currentUser);

				if (currentAttribute != undefined) {
					message.channel.send(`${currentUser.displayName} already has Attribute ${args[1]}`);
					return;
				}

				if (args[3] == undefined) {
					args[3] = 'none';
				}

				currentUser.attributes.push(new Attributes(args[1], args[3]));

				writeToFile(fileName, server);
				//console.log(getDate() + 'Added Attribute ' + args[1] + ' to ' + currentUser.displayName + ' with value ' + args[3]);
				message.channel.send('Added Attribute ' + args[1] + ' to ' + currentUser.displayName + ' with value ' + args[3]);

			}
				break;

			case 'remove': {

				const currentUser = attributeFindUser(args[2], server);

				if (currentUser == undefined) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				const currentAttribute = attributeFindAttribute(args[1], currentUser);

				if (currentAttribute == undefined) {
					message.channel.send(`Attribute: ${args[1]} not found`);
					return;
				}

				for (let i = 0; i < currentUser.attributes.length; i++) {
					if (currentUser.attributes[i] == currentAttribute) {
						currentUser.attributes.splice(i, 1);
						i--;
					}
				}

				writeToFile(fileName, server);
				//console.log(getDate() + 'Removed Attribute ' + args[1] + ' from ' + currentUser.displayName);
				message.channel.send('Removed Attribute ' + args[1] + ' from ' + currentUser.displayName);
			}
				break;

			case 'update': {

				const currentUser = attributeFindUser(args[2], server);

				if (currentUser == undefined) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				const currentAttribute = attributeFindAttribute(args[1], currentUser);

				if (currentAttribute == undefined) {
					message.channel.send(`Attribute: ${args[1]} not found`);
					return;
				}

				const oldValue = currentAttribute.value;
				if (args[3] == undefined) {
					args[3] = 'none';
				}
				currentAttribute.value = args[3];

				writeToFile(fileName, server);
				//.log(getDate() + 'Updated Attribute Value of ' + args[1] + ' from ' + oldValue + ' to ' + args[3]);
				message.channel.send('Updated Attribute Value of ' + args[1] + ' from ' + oldValue + ' to ' + args[3]);
			}
				break;

			case 'list': {

				const currentUser = attributeFindUser(args[1], server);

				if (currentUser == undefined) {
					message.channel.send(`User: ${args[1]} not found`);
					return;
				}
				let listAttributes = '\n';

				currentUser.attributes.forEach(attribute => {
					listAttributes = listAttributes + attribute.name + '\n';
				});

				message.channel.send(`**${currentUser.displayName}** has the following attributes: ${listAttributes}`);
			}
				break;

			case 'print': {

				const currentUser = attributeFindUser(args[2], server);

				if (currentUser == undefined) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				const currentAttribute = attributeFindAttribute(args[1], currentUser);

				if (currentAttribute == undefined) {
					message.channel.send(`Attribute: ${args[1]} not found`);
					return;
				}

				message.channel.send(`**User:** ${currentUser.displayName} \n**Attribute:** ${currentAttribute.name} \n**Value:** ${currentAttribute.value}`);
			}
				break;

			case 'printall': {

				const userWithAttribute = [];

				function descendingAttributeCompare(a, b) {
					const aa = attributeFindAttribute(args[1], a);
					const bb = attributeFindAttribute(args[1], b);

					let tempA = new Attributes(aa.name, aa.value);
					let tempB = new Attributes(bb.name, bb.value);

					if (aa.value.charAt(aa.value.length - 1) == '%') {
						tempA.value = aa.value.slice(0, aa.value.length - 1);
					}
					if (bb.value.charAt(bb.value.length - 1) == '%') {
						tempB.value = bb.value.slice(0, bb.value.length - 1);
					}

					if (tempB.value == 'none') {
						return -1;
					} else if (tempA.value == 'none') {
						return 1;
					} else {
						return tempB.value - tempA.value;
					}
				}

				server.users.forEach(user => {
					const currentAttribute = attributeFindAttribute(args[1], user);

					if (currentAttribute != undefined) {
						userWithAttribute.push(user);
					}
				});

				userWithAttribute.sort(descendingAttributeCompare);

				if (userWithAttribute.length == 0) {
					message.channel.send('Ah, no one has this attribute.');
					return;
				}

				const table = new Table(2, 10, 'center');
				table.push(['Attribute :: ', `${args[1]}`]);
				table.push(['** User **', '** Value **']);
				table.push(['', '']);

				userWithAttribute.forEach(user => {
					const currentAttribute = attributeFindAttribute(args[1], user);

					table.push([user.displayName, currentAttribute.value]);
				});

				message.channel.send('```' + table.toString() + '```');
				//console.log(table.toString());

			}
				break;

			default:
				message.channel.send(invalidMessage);
				break;
		}
	},
};

// https://usefulangle.com/post/187/nodejs-get-date-time
// function getDate() {
// 	const date_ob = new Date();
// 	const date = ('0' + date_ob.getDate()).slice(-2);
// 	const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
// 	const year = date_ob.getFullYear();
// 	const hours = date_ob.getHours();
// 	const minutes = date_ob.getMinutes();
// 	const seconds = date_ob.getSeconds();

// 	const overAll = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds + ' ~ ';
// 	return overAll;

// }

// function getWhiteSpace() {
// 	let whiteSpace = '';

// 	for (let i = 0; i < getDate().length; i++) {
// 		whiteSpace = whiteSpace + ' ';
// 	}
// 	return whiteSpace;
// }


/**
 * Finds matching User object in local file
 * @warning This fails when more than one user shares a name
 * @param {*} id Identifier for User 
 * @param {array} server JSON parsed file
 * @returns currentUser User object in server
 */
function attributeFindUser(id, server) {
	if (id.startsWith('<@!')) {
		id = id.slice(3, id.length - 1);
	} else if (id.startsWith('<@')) {
		id = id.slice(2, id.length - 1);
	}

	function checkUser(user) {
		return user.name == id || user.displayName == id || user.id == id;
	}

	const currentUser = server.users.find(checkUser);

	return currentUser;
}

/**
 * Finds the Attribute object of User object
 * @param {string} attributeName name of attribute
 * @param {*} currentUser user object containing an attribute
 * @returns currentAttribute Attribute object of User object
 */
function attributeFindAttribute(attributeName, currentUser) {
	function findAttribute(attribute) {
		return attribute.name == attributeName;
	}

	const currentAttribute = currentUser.attributes.find(findAttribute);

	return currentAttribute;
}

/**
 * Writes data to file at fileName
 * @param {string} fileName location of the file
 * @param {*} data any data
 */
function writeToFile(fileName, data) {
	const fs = require('fs');
	const updatedFileContent = JSON.stringify(data, null, 4);
	fs.writeFileSync(fileName, updatedFileContent, 'utf8');
}