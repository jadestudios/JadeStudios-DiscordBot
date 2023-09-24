import { Player, Queue, StreamFilters, StreamFiltersName, Utils } from "@jadestudios/discord-music-player";
import { Message } from "discord.js";
import musicWarningMessages from "./util_musicWarningMessages";

/**
 * Adds a song to a queue or starts a queue
 * @param args What to search
 * @param message Message obj
 * @param player Player obj
 * @param suppressMessage true or false
 * @param customContent Anything for Message.channel.send
 * @returns 
 */
export default async function addMusic(args: string[], message: Message, player: Player, suppressMessage: boolean, customContent?: any) {
	if (message.member == null || message.guild == null || message.guild.me == null) return;
	if (musicWarningMessages(args[0], message, suppressMessage)) return;

	let queue = await joinQueue(message, player) as Queue

	if (Utils.regexList.YouTubePlaylist.test(args[0]) || Utils.regexList.SpotifyPlaylist.test(args[0])){
		playPlaylist([args[0]], queue, customContent);
	}else{
		playSong(args, queue, customContent)
	}
}

/**
 * Joins or creates a Queue
 * @param message Message obj
 * @param player Player obj
 * @returns Promise <Queue | undefined> usually not undefined
 */
async function joinQueue(message: Message, player: Player):Promise<Queue|undefined>{
	let queue;
	try {
		queue = player.createQueue(message.guild!.id, {
			data: {
				channel: message.channel
			}
		});
	} catch (error) {
		console.error(error);
	}
	await queue?.join(message.member?.voice.channelId as string).catch(console.error);
	return queue
}

/**
 * Adds a song to a queue
 * @param args What to search
 * @param queue Queue obj
 * @param customContent Anything for Message.channel.send
 * @returns 
 */
async function playSong(args: string[], queue: Queue, customContent?: any) {
	let filters: [string] | undefined;
	if (args.length > 1){
		const filter = args[args.length - 1];
		if (filter in StreamFilters){
			filters = [StreamFilters[filter as StreamFiltersName]];
			args.pop()
		}
	}

	await queue?.play(args.join(" "), {filters: filters ? filters : undefined}).then(song => {
		song.setData({
			content: customContent
		});
	}).catch(console.error);
}

/**
 * Adds a playlist to a queue
 * @param args URL
 * @param queue Queue obj
 * @param customContent Unused
 * @returns 
 */
async function playPlaylist(args: string[], queue: Queue, customContent?: any) {
	await queue.playlist(args.join(" "), {data: {content: customContent}}).catch(console.error);
}