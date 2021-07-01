module.exports = {
	name: 'highnoon',
	description: 'Find where it is noon in the world',
	execute(prefix, command, args, message, fileName) {
		
		const fs = require('fs');
		const seedrandom = require('seedrandom');

		const date_ob = new Date();
		const hour = date_ob.getHours();
		const rng = seedrandom(Math.random(), { entropy: true });
		const currentOffset = (new Date().getTimezoneOffset() / 60);
		const tzi = JSON.parse(fs.readFileSync('./configs/timezones_compact.json', 'utf8'));
		

		let i = 0;
		let time = tzi[i];
		while (((hour + currentOffset + (time.offsetInMinutes / 60)) % 24) != 12) {
			i++;
			time = tzi[i];
		}
		const selectedPlace = time.places[Math.round(rng() * (time.places.length - 1))];

		const tziPlaceTemp = selectedPlace.split('\n');
		let tziCity = tziPlaceTemp[0].split(' ');
		tziCity.shift();
		tziCity.pop();

		let tziCountry = tziPlaceTemp[1].split(' ');
		tziCountry.shift();
		tziCountry.pop();
		
		message.channel.send(`It's High Noon in:\n${selectedPlace}\n**Maps:** https://www.google.com/maps/search/${tziCity}+${tziCountry}`);

	},
};