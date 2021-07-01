class User {
	constructor(id, name, discriminator, nickname, roles) {
		this.id = id;
		this.name = name;
		this.discriminator = discriminator;
		this.displayName = nickname;
		this.attributes = [];
		this.roles = roles;
	}

}

class Attributes {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}

class ServerUser {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.users = [];
	}
}

class Pins {
	constructor(pinsChannel, archiveChannel){
		this.pinsChannel = pinsChannel; // Channel with pins
		this.archiveChannel = archiveChannel; // Channel to put pins to
	}

	setArchive(archive){
		this.archiveChannel = archive;
	}

	setPins(pins){
		this.pinsChannel = pins;
	}
}

class Hosts {
	constructor(hosts){
		this.hosts = hosts;
	}
}

module.exports = { User, Attributes, ServerUser, Pins, Hosts };