// Must user node.js V14.4+
const { User, ServerUser, Pins, Hosts } = require('./genericConst');

// Adds file system from nodejs
const fs = require('fs');

// requires global config file
const { prefix, token } = require('./configs/config.json');

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// This does a purge of users on startup.
// Hopefully this protects data from accidental kicks or bans
client.once('ready', () => {
	const guild = client.guilds.cache.map(guild => guild); // Gets array of guilds this bot is in
	let ArrayServer = [];

	guild.forEach(element => {// Element is a Discord:Guild object
		if (element.available) {

			let serverID = element.id;
			let currentServer = new ServerUser(serverID, element.name);
			element.members.cache.filter(member => !member.user.bot).forEach(member => { // https://stackoverflow.com/questions/65120234/how-to-get-all-non-bot-users-in-discord-js-using-a-discord-bot-in-nodejs
				currentServer.users.push(new User(member.user.id, member.user.username, member.user.discriminator, member.displayName, member._roles));
			});
			ArrayServer.push(currentServer);// Adds new ServerUser object to ArrayServer

			defaultPerServerConfig(serverID);
		}
	});


	// This for-each loop checks and updates the local json
	ArrayServer.forEach(x => { // x is a ServerUser object
		const fileName = `./configs/${x.id}.json`;

		try {
			if (fs.existsSync(fileName)) { // Checks if file exists

				const fileContent = JSON.parse(fs.readFileSync(fileName, 'utf8'));

				if ((fileContent.name == x.name) != true) {// Updates server name
					fileContent.name = x.name;
					update = true;
				}

				const updatedFileContent = new ServerUser(fileContent.id, fileContent.name);

				x.users.forEach(member => {

					function findID(users) {
						return member.id == users.id;
					}

					let currentUser = fileContent.users.find(findID);

					if (currentUser == undefined) { // Adds user to json if not exist
						currentUser = member;
					} else {
						// Updates user name/discriminator/displayName
						if ((currentUser.name == member.name) != true) {
							currentUser.name = member.name;
						}

						if ((currentUser.discriminator == member.discriminator) != true) {
							currentUser.discriminator = member.discriminator;
						}

						if ((currentUser.displayName == member.displayName) != true) {
							currentUser.displayName = member.displayName;
						}

						if (currentUser.roles.length == member.roles.length) {
							for (let i = 0; i < currentUser.length; i++) {
								if (currentUser.roles[i] != member.roles[i]) {
									currentUser.roles[i] = member.roles[i];
								}
							}

						} else {
							currentUser.roles = member.roles;
						}
					}
					updatedFileContent.users.push(currentUser);

				});

				writeToFile(fileName, updatedFileContent);

			} else {
				try {
					writeToFile(fileName, x);
				} catch (err) { }
			}

		} catch (err) { }
	});
});

// login to discord with token
client.login(token);

client.on('message', message => {
	if (message.author.dmChannel == message.channel) return;
	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	const fileName = `./configs/${message.guild.id}.json`;

	if (!client.commands.has(command)) {
		message.channel.send(`**${prefix}${command}** does not exist.`);
		return;
	}

	try {
		client.commands.get(command).execute(prefix, command, args, message, fileName);
	} catch (error) {
		//console.error(error);
		message.reply('Failed to execute command');
	}

	//Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`))
});

// Reapplies the last roles the user had before being kicked
client.on('guildMemberAdd', member => {

	//console.log("adding role");

	const fileName = `./configs/${member.guild.id}.json`;
	const server = JSON.parse(fs.readFileSync(fileName, 'utf8'));

	function checkUser(user) {
		return user.id == member.id;
	}

	const currentUser = server.users.find(checkUser);

	if (currentUser == undefined) return;

	currentUser.roles.forEach(roleID => {

		member.guild.roles.fetch(roleID)
			.then(role => member.roles.add(role))
			.catch(/*console.error*/);

	});
});

// Moves pins from one channel to the other
client.on('channelPinsUpdate', (channel, time) => {
	const config = JSON.parse(fs.readFileSync(`./configs/${channel.guild.id}_config.json`, 'utf8'));
	const pins = Object.assign(new Pins(), config[0]);
	let pinsChannel = pins.pinsChannel; // Where the pins currently are

	const aChannel = channel.guild.channels.resolve(pins.archiveChannel);

	if (aChannel == null) {
		return;
	}

	pinsChannel.forEach(pin => {
		let currentChannel = null;
		if (channel.id == pin) {
			currentChannel = channel;
		}

		if (currentChannel != null) {
			currentChannel.messages.fetchPinned()
				.then(messages => {
					messages.each(m => {
						const currentEmbed = new Discord.MessageEmbed()
							.setColor(m.member.displayHexColor)
							.setTitle(`Jump to Message`)
							.setAuthor(m.author.tag, m.author.displayAvatarURL({ format: 'png', dynamic: true }))
							.setURL(m.url)
							.setTimestamp(m.createdAt)
							.setFooter(`Pinned Message from #${currentChannel.name}`);

						if (m.content.length != 0) {
							currentEmbed.addFields(
								{ name: '\u200B', value: m.content },
							);
						}

						m.attachments.each(a => {
							currentEmbed.attachFiles(a);
						});

						if (m.embeds.length != 0) {
							if (m.embeds[0].image != null) {
								currentEmbed.setImage(m.embeds[0].image.proxyURL);
							} else if (m.embeds[0].thumbnail != null) {
								currentEmbed.setImage(m.embeds[0].thumbnail.proxyURL);
							}
						}

						aChannel.send(currentEmbed);
						m.unpin({ reason: `Archived to ${aChannel.name}` })
							.then()
							.catch()
					});
				})
				.catch();
		}
	});
});

// Creates necessary per guild files
client.on("guildCreate", function (guild) {

	let serverID = guild.id;
	let currentServer = new ServerUser(serverID, guild.name);
	guild.members.cache.filter(member => !member.user.bot).forEach(member => {
		currentServer.users.push(new User(member.user.id, member.user.username, member.user.discriminator, member.displayName, member._roles));
	});

	defaultPerServerConfig(serverID);
	const fileName = `./configs/${guild.id}.json`;

	try {
		writeToFile(fileName, currentServer);
	} catch (err) { }

});

// Deletes files related to a guild
client.on("guildDelete", function (guild) {
	const fileName = `./configs/${guild.id}.json`;
	const fileName2 = `./configs/${guild.id}_config.json`;

	fs.rmSync(fileName);
	fs.rmSync(fileName2);
});

// updates user object in guild file
client.on("guildMemberUpdate", function (oldMember, newMember) {
	const member = newMember;
	const fileName = `./configs/${member.guild.id}.json`;
	const server = JSON.parse(fs.readFileSync(fileName, 'utf8'));

	function findID(users) {
		return member.id == users.id;
	}

	const currentUser = server.users.find(findID);

	currentUser.name = member.user.username;
	currentUser.discriminator = member.user.discriminator;
	currentUser.displayName = member.displayName;
	currentUser.roles = member._roles;

	writeToFile(fileName, server);
});

// Removes channel from config if it was used for pinning
client.on("channelDelete", function (channel) {
	const config = JSON.parse(fs.readFileSync(`./configs/${channel.guild.id}_config.json`, 'utf8'));
	const pins = Object.assign(new Pins(), config[0]);
	let pinsChannel = pins.pinsChannel; // Where the pins currently are

	if (channel.id == pins.archiveChannel) {
		pins.setArchive('');
	} else {
		for (let i = 0; i < pinsChannel.length; i++) {
			if (channel.id == pinsChannel[i]) {
				pinsChannel.splice(i, 1);
				i--;
			}
		}
	}
	config[0] = pins;
	writeToFile(`./configs/${channel.guild.id}_config.json`, config);
});

// updates the guild name in the file
client.on("guildUpdate", function (oldGuild, newGuild) {

	const guild = newGuild;

	if ((oldGuild.name == newGuild.name) != true) {// Updates server name
		const fileName = `./configs/${guild.id}.json`;
		const server = JSON.parse(fs.readFileSync(fileName, 'utf8'));

		server.name = newGuild.name;
		writeToFile(fileName, server);
	}
});


// https://usefulangle.com/post/187/nodejs-get-date-time
// function getDate() {
// 	const date_ob = new Date();
// 	const date = ('0' + date_ob.getDate()).slice(-2);
// 	const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
// 	const year = date_ob.getFullYear();
// 	const hours = date_ob.getHours();
// 	const minutes = date_ob.getMinutes();
// 	const seconds = date_ob.getSeconds();

// 	const overAll = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds + ' ~ ';
// 	return overAll;

// }

// function getWhiteSpace() {
// 	let whiteSpace = '';

// 	for (let i = 0; i < getDate().length; i++) {
// 		whiteSpace = whiteSpace + ' ';
// 	}
// 	return whiteSpace;
// }

/**
 * Writes data to file at fileName
 * @param {string} fileName location of the file
 * @param {*} data any data
 */
function writeToFile(fileName, data) {
	const updatedFileContent = JSON.stringify(data, null, 4);
	fs.writeFileSync(fileName, updatedFileContent, 'utf8');
}

/**
 * Creates a config if there is not one for the server
 * @param {string} id serverID 
 */
function defaultPerServerConfig(id) {
	const fileName = `./configs/${id}_config.json`;

	if (!(fs.existsSync(fileName))) {
		//console.log(getDate() + fileName + ' does not exist - Creating now');
		let defaultConfig = [];
		defaultConfig.push(new Pins([], ''));
		defaultConfig.push(new Hosts(['www.google.com', 'www.yahoo.com']));
		writeToFile(fileName, defaultConfig);
	}
}