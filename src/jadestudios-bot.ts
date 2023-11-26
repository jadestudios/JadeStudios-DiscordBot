import { Player } from '@jadestudios/discord-music-player';
import { Client, Intents } from 'discord.js';
import { token } from './configs/config.json';
import registerEvents from './events/event_index';

class JadeClient {

	private client: Client;
	private player: Player;

	constructor() {
		this.client = new Client({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_PRESENCES]
		});

		this.player = new Player(this.client, {
			leaveOnEnd: false,
			leaveOnStop: true,
			leaveOnEmpty: true,
			deafenOnJoin: true,
			timeout: 35000,
		});

		registerEvents(this.client, this.player);
	}

	public login() {
		this.client.login(token);
	}

	public destroy() {
		this.client.destroy();
	}
}

const maxRetry = 3;
let retryCount = 0;
let jade = new JadeClient();
jade.login();


process.on('uncaughtException', (error, origin) => {
	console.error(error);
	console.error(origin);
	console.error("Encountered fatal crash");

	retryCount === maxRetry ? process.exit(1) : retryCount++;

	jade.destroy();
	jade = new JadeClient();
	jade.login();
	console.warn(`Client forcefully restarted, attempts remaining: ${maxRetry-retryCount}`);
});