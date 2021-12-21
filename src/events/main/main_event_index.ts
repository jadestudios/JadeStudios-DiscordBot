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

	let event: IEvent;
	
	event = new MessageCreate;
	events.set(event.name, event);
	event = new Ready;
	events.set(event.name, event);
	event = new GuildMemberAdd;
	events.set(event.name, event);
	event = new ChannelPinsUpdate;
	events.set(event.name, event);
	event = new GuildCreate;
	events.set(event.name, event);
	event = new GuildDelete;
	events.set(event.name, event);
	event = new GuildMemberUpdate;
	events.set(event.name, event);
	event = new ChannelDelete;
	events.set(event.name, event);

	return events;
}