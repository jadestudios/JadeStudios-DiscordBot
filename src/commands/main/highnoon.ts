import { Message, MessageActionRow, MessageButton } from "discord.js";
import ICommand from "../command";
import { TimezoneHandler } from "../../server/server_TimezoneHandler";

export default class HighNoon implements ICommand {
	public readonly name: string = 'highnoon';
	public readonly description: string = 'Find where it is noon in the world';
	private readonly time = new TimezoneHandler();
	private readonly timeOffsets = [-660, -600, -540, -480, -420, -360,
									-300, -240, -180, -120, -60, 0,
									60, 120, 180, 240, 300, 360, 420,
									480, 540, 600, 660, 720, 780, 840]
	
	public execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): void {

		const date_ob = new Date();
		const hour = date_ob.getHours();
		const currentOffset = (new Date().getTimezoneOffset() / 60);

		let i = 0;
		while (((hour + currentOffset + (this.timeOffsets[i]/ 60)) % 24) != 12) {
			i++;
		}

		const place = this.time.getRandomPlace(this.timeOffsets[i]);
		
		const button = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('LINK')
				.setLabel("Google Maps")
				.setURL(place.url)
		);

		message.channel.send({content: `It's High Noon in:\n${place.placeMessage}`, components: [button]});
	}

	
}