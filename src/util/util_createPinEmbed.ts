import { EmbedAuthorData, EmbedFooterData, Message, MessageEmbed } from "discord.js";

export default function createPinEmbed(m: Message<boolean>, channelName: string): MessageEmbed {
	const authData = {} as EmbedAuthorData;
	authData.name = m.author.tag;
	authData.iconURL = m.author.displayAvatarURL({ format: 'png', dynamic: true });
	const footer = {} as EmbedFooterData;
	footer.text = `Pinned Message from #${channelName}`;

	const currentEmbed = new MessageEmbed()
		.setColor('#66CCFF')
		.setTitle(`Jump to Message`)
		.setAuthor(authData)
		.setURL(m.url)
		.setTimestamp(m.createdAt)
		.setFooter(footer);

	if (m.content.length != 0 && m.content.length < 1024) { //Embed limit is 1024 chars
		currentEmbed.addFields(
			{ name: '\u200B', value: m.content },
		);
	}

	if (m.embeds.length != 0) {
		if (m.embeds[0].image != null) {
			currentEmbed.setImage(m.embeds[0].image.proxyURL ? m.embeds[0].image.proxyURL : 'https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/404.jpg');
		} else if (m.embeds[0].thumbnail != null) {
			currentEmbed.setImage(m.embeds[0].thumbnail.proxyURL ? m.embeds[0].thumbnail.proxyURL : 'https://raw.githubusercontent.com/jadestudios/JadeStudios-DiscordBot/main/image/404.jpg');
		}
	}

	return currentEmbed;
}