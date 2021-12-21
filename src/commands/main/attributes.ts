import { Message } from "discord.js";
import { AttributeHandler } from "../../server/server_AttributeHandler";
import { Table } from "../../util/util_Table";
import ICommand from "../command";

export default class Attributes implements ICommand {
	public readonly name: string = 'attributes';
	public readonly description: string = 'Adds|Deletes|Updates|Lists|Prints attributes';

	/**
	 * Finds a user whether it was via mentions or username/ nickname
	 * @param id Could be name or mention
	 * @returns userID or null on fail
	 */
	private findUserID(attributesHandler: AttributeHandler, id: string): string | null {
		if (id.startsWith('<@!')) {
			id = id.slice(3, id.length - 1);
			return id;
		} else if (id.startsWith('<@')) {
			id = id.slice(2, id.length - 1);
			return id;
		}

		const resolvedUser = attributesHandler.getUserWithName(id);

		if (typeof resolvedUser === 'undefined') {
			return null;
		}

		return resolvedUser.userID;
	}

	/**
	 * Gets a number from a given string
	 * @param numberString 
	 * @returns 0 by default, number if found
	 */
	private getNumber(numberString: string): number {
		const numberRegex = new RegExp('^(\\d+)$');
		const matchedNumber = numberString.match(numberRegex);
		let numberValue = 0;

		if (matchedNumber) {
			numberValue = Number(matchedNumber[0]);
		}
		return numberValue;
	}

	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		const invalidMessage = `***Invalid, must be:*** 
								${prefix}${command} <add|remove|update> <Attribute Name> <user> [Attribute Value],
								${prefix}${command} <list> <user>,
								${prefix}${command} <print> <Attribute Name> <user>,
								${prefix}${command} <printall> <Attribute Name>`;

		if (args.length < 1) { //Checking arg[0] first
			message.channel.send(invalidMessage);
			return;
		}

		const attributesHandler = new AttributeHandler(`${message.guildId}.db`);

		switch (args[0].toLowerCase()) {
			case 'add': {

				if (args.length < 3) {
					message.channel.send(invalidMessage);
					return;
				}

				const numberValue = this.getNumber(args[3]);
				const userID = this.findUserID(attributesHandler, args[2]);

				if (!userID) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				if (attributesHandler.addAttribute(userID, args[1], numberValue)) {
					message.channel.send(`Attribute added`);
				} else {
					message.channel.send(`Failed to add attribute`);
				}
				break;
			}


			case 'remove': {

				if (args.length < 3) {
					message.channel.send(invalidMessage);
					return;
				}

				const userID = this.findUserID(attributesHandler, args[2]);

				if (!userID) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				if (attributesHandler.deleteAttribute(userID, args[1])) {
					message.channel.send(`Attribute removed`);
				} else {
					message.channel.send(`Failed to remove attribute`);
				}
				break;
			}


			case 'update': {

				if (args.length < 3) {
					message.channel.send(invalidMessage);
					return;
				}

				const userID = this.findUserID(attributesHandler, args[2]);

				if (!userID) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				const numberValue = this.getNumber(args[3]);

				if (attributesHandler.updateAttribute(userID, args[1], numberValue)) {
					message.channel.send(`Attribute updated`);
				} else {
					message.channel.send(`Failed to update attribute`);
				}

				break;
			}


			case 'list': {

				if (args.length < 2) {
					message.channel.send(invalidMessage);
					return;
				}

				const userID = this.findUserID(attributesHandler, args[1]);

				if (!userID) {
					message.channel.send(`User: ${args[1]} not found`);
					return;
				}

				let listAttributes = '\n';

				attributesHandler.getAttributes(userID).forEach(attribute => {
					listAttributes += attribute.name + '\n';
				});

				const userDisplayName = attributesHandler.getDisplayName(userID);
				message.channel.send(`**${userDisplayName}** has the following attributes: ${listAttributes}`);
			}
				break;

			case 'print': {

				if (args.length < 3) {
					message.channel.send(invalidMessage);
					return;
				}

				const userID = this.findUserID(attributesHandler, args[2]);

				if (!userID) {
					message.channel.send(`User: ${args[2]} not found`);
					return;
				}

				const currentAttribute = attributesHandler.getAttribute(userID, args[1]);

				if (typeof currentAttribute === 'undefined') {
					message.channel.send(`Cannot find attribute`);
				} else {
					const userDisplayName = attributesHandler.getDisplayName(userID);
					message.channel.send(`**User:** ${userDisplayName} \n**Attribute:** ${currentAttribute.name} \n**Value:** ${currentAttribute.value}`);
				}

				break;
			}


			case 'printall': {

				if (args.length < 2) {
					message.channel.send(invalidMessage);
					return;
				}

				const userWithAttribute = attributesHandler.getAllWithAttribute(args[1]);

				if (userWithAttribute.length === 0) {
					message.channel.send('Ah, no one has this attribute.');
					return;
				}

				const table = new Table(2, 10, 'center');
				table.push(['Attribute :: ', `${args[1]}`]);
				table.push(['** User **', '** Value **']);
				table.push(['', '']);

				userWithAttribute.forEach(attribute => {
					const userDisplayName = attributesHandler.getDisplayName(attribute.userID);
					table.push([userDisplayName ? userDisplayName : '', String(attribute.value)]);
				});

				message.channel.send('```' + table.toString() + '```');
				break;
			}


			default:
				message.channel.send(invalidMessage);
				break;
		}
	}

}