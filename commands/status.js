module.exports = {
	name: 'status',
	description: 'pings server',
	execute(prefix, command, args, message, fileName) {
		const fs = require('fs');
		
		const config = JSON.parse(fs.readFileSync(`./configs/${message.guild.id}_config.json`, 'utf8'));
		const hosts = config[1].hosts;
		const invalidMessage = `***Invalid, must be:*** ${prefix}status hosts
								${prefix}status change <Original Host> <New Host>
								${prefix}status add <Host>
								${prefix}status remove <Host>`;

		const ping = require('ping');
		const { Table } = require('../table');
		const util = require('util');
		const setTimeoutPromise = util.promisify(setTimeout);
		const Discord = require('discord.js');

		if (args.length == 0) {
			let table = new Table(2, 10, 'center');
			table.push(['** Status **', '']);

			hosts.forEach(function (host) {
				ping.sys.probe(host, function (isAlive) {
					if (isAlive) {
						table.push([host, 'Online']);
					} else {
						table.push([host, 'Offline']);
					}
				});
			});

			setTimeoutPromise(250, message).then((message) => {
				const currentEmbed = new Discord.MessageEmbed()
					.setColor('#66ccff')
					.addFields(
						{ name: '\u200B', value: '```' + table.toString() + '```' },
					);

				message.channel.send(currentEmbed);
			});

		} else {
			switch (args[0].toLowerCase()) {
				case 'hosts':
					let toPrint = 'Currently pinging to the following:\n';
					hosts.forEach(host => {
						toPrint += `${host}\n`;
					});
					message.channel.send(toPrint);
					break;

				case 'change':

					if (args.length < 3) {
						message.channel.send(invalidMessage);
						return
					}

					let foundHost = false;

					for (let i = 0; i < hosts.length; i++) {
						if (hosts[i] == args[1]) {
							hosts[i] = args[2];
							foundHost = true
						}
					}

					if (foundHost == false) {
						message.channel.send(`Cannot find ${args[1]}`);
					} else {
						fs.writeFileSync(`./configs/${message.guild.id}_config.json`, JSON.stringify(config, null, 4), 'utf8');
						//console.log('Config updated');
						message.channel.send(`Changed host ${args[1]} to ${args[2]}`);
					}
					break;

					case 'add':{
						hosts.push(args[1]);
						fs.writeFileSync(`./configs/${message.guild.id}_config.json`, JSON.stringify(config, null, 4), 'utf8');
						message.channel.send(`Added host: ${args[1]}`);	
					}

					break;

					case 'remove':{

						let removed;
						for (let i = 0; i < hosts.length; i++) {
							if (hosts[i] == args[1]){
								removed = hosts.splice(i,1);
								i--;
							}
						}

						if (removed == null){
							message.channel.send(`${args[1]} not found`);
							return;
						}

						fs.writeFileSync(`./configs/${message.guild.id}_config.json`, JSON.stringify(config, null, 4), 'utf8');
						message.channel.send(`Removed host: ${args[1]}`);	

					}
					break;
				default:
					message.channel.send(invalidMessage);
					break;
			}
		}
	},
};