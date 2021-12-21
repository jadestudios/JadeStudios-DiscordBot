import { Player, PlayerEvents } from "discord-music-player";
import { Client } from "discord.js";
import getMainEvents from "./main/main_event_index";
import getMusicEvents from "./music/music_event_index";

export default function registerEvents(client: Client, player: Player): void {

	const clientEvents = getMainEvents();
	const musicEvents = getMusicEvents();

	clientEvents.forEach(event => {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => {
				if (event.name === 'messageCreate') { //only pushes to command event
					args.push(player);
				}
				event.execute(...args)
			}
			);
		}
	});

	musicEvents.forEach(event => {
		player.on(event.name as keyof PlayerEvents, (...args) => {
			event.execute(...args);
		});
	});
}