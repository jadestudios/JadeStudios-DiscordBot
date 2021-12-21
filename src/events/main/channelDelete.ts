import { TextChannel } from "discord.js";
import { PinHandler } from "../../server/server_PinHandler";
import IEvent from "../event";

export default class ChannelDelete implements IEvent {
	public readonly name: string = 'channelDelete';
	public readonly once: boolean = false;
	execute(...args: any[]): void {
		const channel = <TextChannel>args[0];

		const pinHandler = new PinHandler(`${channel.guild.id}.db`)

		if (pinHandler.hasChannel(channel.id)) {
			pinHandler.deleteChannel(channel.id);
			return;
		}

		if (pinHandler.getArchiveChannel() === channel.id) {
			pinHandler.setArchiveChannel('');
		}
	}
}