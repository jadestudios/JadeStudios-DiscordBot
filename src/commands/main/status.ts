import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { promisify } from "util";
import { HostHandler } from "../../server/server_HostHandler";
import ICommand from "../command";
import { sys } from "ping";

export default class Status implements ICommand {
	public readonly name: string = 'status';
	public readonly description: string = 'Pings a host';
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} hosts
								${prefix}${command} change <Original Host> <New Host>
								${prefix}${command} add <Host>
								${prefix}${command} remove <Host>`;


		const hostHandler = new HostHandler(`${message.guildId}.db`);

		if (args.length === 0) {
			const setTimeoutPromise = promisify(setTimeout);
			const hosts = hostHandler.getHosts();
			let isDead = false;
			const fieldArray: EmbedFieldData | EmbedFieldData[] | { name: any; value: any; inline: any; }[] = [];

			hosts.forEach(function (host) {
				sys.probe(host, function (isAlive) {
					if (!isAlive) {
						isDead = true;
						fieldArray.push({ name: `Connection to: ${host}`, value: ' Failed ', inline: false });
					} else {
						fieldArray.push({ name: `Connection to: ${host}`, value: ' Success', inline: false });
					}
				});
			});

			fieldArray.unshift({ name: 'Discord API', value: 'Connected', inline: false, });

			setTimeoutPromise(hosts.length * 125, message).then((message) => {
				const currentEmbed = new MessageEmbed()
					.setColor(isDead ? 'RED' : 'GREEN')
					.setTitle('STATUS')
					.setDescription(isDead ? 'Partially Online' : 'Fully Online')
					.addFields(fieldArray)
					.setTimestamp();

				message.channel.send({ embeds: [currentEmbed] });
			});

		} else {
			switch (args[0].toLowerCase()) {
				case 'hosts': {

					let toPrint = 'Currently pinging to the following:\n';
					hostHandler.getHosts().forEach(host => {
						toPrint += `${host}\n`;
					});
					message.channel.send(toPrint);

					break;
				}

				case 'change': {
					if (args.length < 3) {
						message.channel.send('Please indicate new/ old hosts');
						return
					}

					if (hostHandler.replaceHost(args[1], args[2])) {
						message.channel.send(`Changed host ${args[1]} to ${args[2]}`);
					} else {
						message.channel.send(`Failed to change host`);
					}

					break;
				}

				case 'add': {
					if (hostHandler.addHost(args[1])) {
						message.channel.send(`Added host: ${args[1]}`);
					} else {
						message.channel.send(`Failed to add host`);
					}

					break;
				}

				case 'remove': {
					if (hostHandler.deleteHost(args[1])) {
						message.channel.send(`Deleted host: ${args[1]}`);
					} else {
						message.channel.send(`Failed to delete host`);
					}

					break;
				}

				default:
					message.channel.send(invalidMessage);
					break;
			}
		}

	}
}