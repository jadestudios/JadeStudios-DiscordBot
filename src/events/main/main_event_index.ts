import { Collection } from "discord.js";
import ChannelDelete from "./channelDelete";
import ChannelPinsUpdate from "./channelPinsUpdate";
import IEvent from "../event";
import GuildCreate from "./guildCreate";
import GuildDelete from "./guildDelete";
import GuildMemberAdd from "./guildMemberAdd";
import GuildMemberUpdate from "./guildMemberUpdate";
import MessageCreate from "./messageCreate";
import Ready from "./ready";


export default function getMainEvents(): Collection<string, IEvent> {
	const events = new Collection<string, IEvent>();
	let eve: IEvent[] = [
		new MessageCreate,
		new Ready,
		new GuildMemberAdd,
		new ChannelPinsUpdate,
		new GuildCreate,
		new GuildDelete,
		new GuildMemberUpdate,
		new ChannelDelete
	]

	eve.forEach(element => {
		events.set(element.name, element)
	});

	return events;
}