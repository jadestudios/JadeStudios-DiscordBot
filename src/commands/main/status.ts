import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { HostHandler } from "../../server/server_HostHandler";
import ICommand from "../command";
import { PingResponse, promise } from "ping";
import { exec } from "child_process"
import RestPing from "../../util/util_ping";
import { pingAPIaddress } from "../../configs/config.json"

export default class Status implements ICommand {
	public readonly name: string = 'status';
	public readonly description: string = 'Pings a host';
	private isInDocker = false;

	constructor() {
		inDocker().then((v) => this.isInDocker = v);
	}

	public async execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): Promise<void> {

		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} hosts
								${prefix}${command} change <Original Host> <New Host>
								${prefix}${command} add <Host>
								${prefix}${command} remove <Host>`;


		const hostHandler = new HostHandler(`${message.guildId}.db`);

		if (args.length === 0) {
			const hosts = hostHandler.getHosts();
			let isDead = false;
			const fieldArray: EmbedFieldData | EmbedFieldData[] | { name: any; value: any; inline: any; }[] = [];
			const restAPI = this.isInDocker ? new RestPing(pingAPIaddress) : null;

			for (let i = 0; i < hosts.length; i++) {
				const host = hosts[i];
				let res;
				if (restAPI) {
					try {
						res = await restAPI.getPingResponse(host) as PingResponse;
					} catch (error) {
						fieldArray.push({ name: `Connection to: ${host}`, value: ' Error ', inline: false });
					}

				} else {
					try {
						res = await promise.probe(host);
					} catch (error) {
						fieldArray.push({ name: `Connection to: ${host}`, value: ' Error ', inline: false });
					}
				}
				if (res) {
					if (!res.alive) {
						isDead = true;
						fieldArray.push({ name: `Connection to: ${host}`, value: ' Failed ', inline: false });
					} else {
						fieldArray.push({ name: `Connection to: ${host}`, value: ` Success -> ${res.avg} ms`, inline: false });
					}
				}
			}

			fieldArray.unshift({ name: 'Discord API', value: 'Connected', inline: false, });
			const currentEmbed = new MessageEmbed()
				.setColor(isDead ? 'RED' : 'GREEN')
				.setTitle('STATUS')
				.setDescription(isDead ? 'Partially Online' : 'Fully Online')
				.addFields(fieldArray)
				.setTimestamp();

			message.channel.send({ embeds: [currentEmbed] });

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

function inDocker(): Promise<boolean> {
	return new Promise((resolve, reject) => {
		exec(`grep -E -o 'docker|lsc' /proc/1/mounts | head -n 1`, (error, stdout, stderr) => { //Finds first match in linux
			if (!error){
				if (stdout.includes('docker') || stdout.includes('lsc')){
					console.log('In Docker - Using RestPing')
					resolve(true);
				}
			}
			resolve(false);
		});

	});
}