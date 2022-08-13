import { Collection } from "discord.js";
import IEvent from "../event";
import Error from "./error";
import SongAdd from "./songAdd";
import SongChanged from "./songChanged";
import SongFirst from "./songFirst";



export default function getMusicEvents(): Collection<string, IEvent> {
	const events = new Collection<string, IEvent>();

	let event: IEvent;

	event = new SongFirst;
	events.set(event.name, event);
	// event = new SongChanged;
	// events.set(event.name, event);
	event = new SongAdd;
	events.set(event.name, event);
	event = new Error;
	events.set(event.name, event);

	return events;
}