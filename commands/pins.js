module.exports = {
	name: 'pin',
	description: 'pin',
	execute(prefix, command, args, message, fileName) {
		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} <set|archive|list|remove|force>
								Please use this command in the channel you want to archive or should archive to`;

		if (args.length < 1) {
			message.channel.send(invalidMessage);
			return;
		}

		if (!message.channel.isText()) {
			message.channel.send(`This is not a text channel`);
			return;
		}

		const fs = require('fs');
		const { Pins } = require('../genericConst');
		const Discord = require('discord.js');

		const config = JSON.parse(fs.readFileSync(`./configs/${message.guild.id}_config.json`, 'utf8'));
		const pins = Object.assign(new Pins(), config[0]);
		let pinsChannel = pins.pinsChannel; // Where the pins currently are

		switch (args[0].toLowerCase()) {
			case 'set': {
				let channel;

				pinsChannel.forEach(pChannel => {
					if (pChannel == message.channel.id) {
						channel = message.channel.id;
					}
				});

				if (channel == undefined) {
					pinsChannel.push(message.channel.id);
					message.channel.send('This channel will be archived');

					config[0] = pins;
					fs.writeFileSync(`./configs/${message.guild.id}_config.json`, JSON.stringify(config, null, 4), 'utf8');
					//console.log('Config updated');
				} else {
					message.channel.send('Channel already set to be archived');
				}
			}
				break;

			case 'archive': {

				if (pins.archiveChannel != message.channel.id) {

					pins.setArchive(message.channel.id);
					message.channel.send('All pins will be archived to this channel');

					config[0] = pins;
					fs.writeFileSync(`./configs/${message.guild.id}_config.json`, JSON.stringify(config, null, 4), 'utf8');
					//console.log('Config updated');
				} else {
					message.channel.send('Channel already set to be used as an archive');
				}
			}
				break;

			case 'list': {
				// Could be simplified to calling <#channelID>, but
				// this checks if channel exists - useful for implementations of other args in this command

				const aChannel = message.guild.channels.resolve(pins.archiveChannel);

				if (aChannel == null) {
					message.channel.send("No archive channel set or does not exist");
					return;
				}

				let toPrint = `Pins from below channels will be archived to <#${aChannel.id}>:\n`;
				pinsChannel.forEach(pin => {
					const channel = message.guild.channels.resolve(pin);
					if (channel != null) {
						toPrint += `<#${channel.id}>\n`;
					}
				});

				message.channel.send(toPrint);
			}
				break;

			case 'remove': {

				let channel;
				let foundPin = false;
				let foundArchive = false;

				pinsChannel.forEach(pChannel => {
					if (pChannel == message.channel.id) {
						channel = message.channel.id;
					}
				});

				if (channel == message.channel.id) {

					for (let i = 0; i < pinsChannel.length; i++) {
						if (pinsChannel[i] == message.channel.id) {
							pinsChannel.splice(i, 1);
							i--;
						}
					}

					message.channel.send('This channel will not be archived');
					foundPin = true;
				}

				if (pins.archiveChannel == message.channel.id) {

					pins.setArchive('');
					message.channel.send('This channel will not be used as a pin archive');
					config[0] = pins;
					foundArchive = true;
				}

				if (foundPin || foundArchive) {
					fs.writeFileSync(`./configs/${message.guild.id}_config.json`, JSON.stringify(config, null, 4), 'utf8');
					//console.log('Config updated');
				} else {
					message.channel.send('Channel is not being archived or used for pin archives');
				}
			}
				break;

			case 'force': {
				const aChannel = message.guild.channels.resolve(pins.archiveChannel);

				if (aChannel == null) {
					message.channel.send("No archive channel set or does not exist");
					return;
				}

				pinsChannel.forEach(pin => {
					const channel = message.guild.channels.resolve(pin);
					if (channel != null) {
						channel.messages.fetchPinned()
							.then(messages => {
								messages.each(m => {
									const currentEmbed = new Discord.MessageEmbed()
										.setColor(m.member.displayHexColor)
										.setTitle(`Jump to Message`)
										.setAuthor(m.author.tag, m.author.displayAvatarURL({ format: 'png', dynamic: true }))
										.setURL(m.url)
										.setTimestamp(m.createdAt)
										.setFooter(`Pinned Message from #${channel.name}`);

									if (m.content.length != 0) {
										currentEmbed.addFields(
											{ name: '\u200B', value: m.content },
										);
									}
									m.attachments.each(a => {
										currentEmbed.attachFiles(a);
									});

									if (m.embeds.length != 0) {
										if (m.embeds[0].image != null) {
											currentEmbed.setImage(m.embeds[0].image.proxyURL);
										} else if (m.embeds[0].thumbnail != null) {
											currentEmbed.setImage(m.embeds[0].thumbnail.proxyURL);
										}
									}

									aChannel.send(currentEmbed);
									m.unpin({ reason: `Archived to ${aChannel.name}` })
										.then()
										.catch()
								});
							})
							.catch(console.error);
					}
				});
			}
				break;

			default:
				message.channel.send(invalidMessage);
				break;
		}
	},
};
