import { TextChannel } from "discord.js";
import { PinHandler } from "../../server/server_PinHandler";
import createPinEmbed from "../../util/util_createPinEmbed";
import IEvent from "../event";

export default class ChannelPinsUpdate implements IEvent {
	public readonly name: string = 'channelPinsUpdate';
	public readonly once: boolean = false;
	public execute(...args: any[]): void {

		const channel = <TextChannel>args[0];
		const pinHandler = new PinHandler(`${channel.guild.id}.db`);

		const aChannel = <TextChannel>channel.guild.channels.resolve(pinHandler.getArchiveChannel());
		if (aChannel == null) {return;}

		pinHandler.getChannels().forEach(pin => {
			if (pin === channel.id) {
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
	}
}