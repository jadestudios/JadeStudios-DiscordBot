import { Collection } from "discord.js";
import IEvent from "../event";
import Error from "./error";
import SongAdd from "./songAdd";
import SongChanged from "./songChanged"; //unused
import SongFirst from "./songFirst";



export default function getMusicEvents(): Collection<string, IEvent> {
	const events = new Collection<string, IEvent>();

	let eve: IEvent[] = [
		new SongFirst,
		new SongAdd,
		new Error
	]

	eve.forEach(element => {
		events.set(element.name, element)
	});
	return events;
}