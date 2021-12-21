import { Player } from 'discord-music-player';
import { Client, Intents } from 'discord.js';
import { token } from './configs/config.json';
import registerEvents from './events/event_index';

const client = new Client({
	intents:[
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MEMBERS, 
		Intents.FLAGS.GUILD_VOICE_STATES, 
		Intents.FLAGS.GUILD_MESSAGES, 
		Intents.FLAGS.DIRECT_MESSAGES, 
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_PRESENCES]
});

const player = new Player(client, {
	leaveOnEnd: false,
	leaveOnStop: true,
	leaveOnEmpty: true,
	deafenOnJoin: true,
	timeout: 35000,
});

//Registers all events
registerEvents(client, player);

client.login(token);
