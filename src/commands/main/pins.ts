import { Message, TextChannel } from "discord.js";
import { PinHandler } from "../../server/server_PinHandler";
import createPinEmbed from "../../util/util_createPinEmbed";
import ICommand from "../command";

//Message.guild is not null since the caller checks if the message came from a guild first.
export default class Pins implements ICommand {
	public readonly name: string = 'pin';
	public readonly description: string = 'Archive these pins'
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		const invalidMessage = `***Invalid, must be:*** ${prefix}${command} <set|archive|list|remove|force>
								Please use this command in the channel you want to archive or should archive to`;

		if (args.length < 1) {
			message.channel.send(invalidMessage);
			return;
		}

		if (message.channel.type !== "GUILD_TEXT") {
			return;
		}

		const pinHandler = new PinHandler(`${message.guildId}.db`);

		switch (args[0].toLowerCase()) {
			case 'set': {

				if (pinHandler.addChannel(message.channel.id)) {
					message.channel.send('This channel will be archived');
				} else {
					message.channel.send(`Channel already set to be archived - check with ${prefix}pin list`);
				}
				break;
			}


			case 'archive': {

				if (pinHandler.setArchiveChannel(message.channel.id)) {
					message.channel.send('All pins will be archived to this channel');
				} else {
					message.channel.send(`Channel is already being used - check with ${prefix}pin list`);
				}
				break;
			}


			case 'list': {
				// Could be simplified to calling <#channelID>, but
				// this checks if channel exists - useful for implementations of other args in this command

				const aChannel = message.guild?.channels.resolve(pinHandler.getArchiveChannel());

				if (aChannel == null) {
					message.channel.send("No archive channel set or does not exist");
					return;
				}

				let toPrint = `Pins from below channels will be archived to <#${aChannel.id}>:\n`;
				pinHandler.getChannels().forEach(pin => {
					const channel = message.guild?.channels.resolve(pin);
					if (channel != null) {
						toPrint += `<#${channel.id}>\n`;
					}
				});

				message.channel.send(toPrint);
				break;
			}


			case 'remove': {

				if (pinHandler.hasChannel(message.channel.id)) {
					pinHandler.deleteChannel(message.channel.id);
					message.channel.send('This channel will not be archived');
					return;
				}

				if (pinHandler.getArchiveChannel() === message.channel.id) {
					pinHandler.setArchiveChannel('');
					message.channel.send('This channel will not be used as a pin archive');
					return;
				}

				message.channel.send('Channel is not being archived or used for pin archives');
				break;
			}


			case 'force': {
				const aChannel = <TextChannel>message.guild?.channels.resolve(pinHandler.getArchiveChannel());

				if (aChannel == null) {
					message.channel.send("No archive channel set or does not exist");
					return;
				}

				pinHandler.getChannels().forEach(pin => {
					const channel = <TextChannel>message.guild?.channels.resolve(pin);
					if (channel != null) {
						channel.messages.fetchPinned()
							.then(messages => {
								messages.each(m => {
									const currentEmbed = createPinEmbed(m, channel.name);
									aChannel.send({ embeds: [currentEmbed], files: [...m.attachments.values()] });
									m.unpin().then().catch();
								});
							})
							.catch(console.error);
					}
				});
				break;
			}

			default:
				message.channel.send(invalidMessage);
				break;
		}
	}
}