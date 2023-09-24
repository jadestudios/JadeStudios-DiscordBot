import { EmbedAuthorData, Message, MessageEmbed } from "discord.js";
import IWord from "../word";
import ICommand from "../../commands/command";


export class HiltonWordOne implements IWord {
	public readonly name: string = 'room';
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
        const m = [
            `Your room isn't available. Yell at Expedia or something`,
            `No man, your room is not free`,
            `Look man, go get a room`,
            `Sorry, we're all booked out`,
            `You did WHAT in your room?`
        ]
        message.channel.send(m[Math.floor(Math.random() * (m.length - 1))])
	}
}
export class HiltonWordTwo implements IWord {
	public readonly name: string = 'guest';
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
        message.channel.send(`I'm a platinum member btw`)
	}
}
export class HiltonWordThree implements IWord {
	public readonly name: string = 'water';
	public async execute(message: Message<boolean>, misc?: any): Promise<void> {
        message.channel.send(`Where are my 2 free waters???`)
	}
}

export class HiltonCommand implements ICommand {
	public readonly name: string = 'hilton';
	public readonly description: string = 'Hilton Honors TM Menu';
	public async execute(prefix: string, command: string, message: Message<boolean>, args: string[], misc?: any): Promise<void> {
        const auth = {} as EmbedAuthorData;
        auth.name = "Hilton Honors";
        auth.iconURL = "https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/HH.jpg";
        const currentEmbed = new MessageEmbed()
            .setColor('#FFFFFF')
            .setAuthor(auth)
            .setThumbnail(auth.iconURL)
            .setDescription(`We'd be honored to have you. (Plus, it's free)\n[Join Hilton Honors](https://www.hilton.com/en/hilton-honors/) `)
            .addFields(
                {name: 'The benefits start the moment you join', value:'✧ Earn and Use Points\n✧ Exclusive App Features\n✧ Elite-level Benefits\n✧ Lowest Price\n✧ Free Wifi'}
            )
        message.channel.send({ embeds: [currentEmbed]})

    }
} 