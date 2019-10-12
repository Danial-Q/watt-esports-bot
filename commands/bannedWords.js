const {readFileSync, writeFile} = require('fs');

module.exports = {
	name: 'banword',
	description: 'Adds a word to the ban list',
	guildOnly: true,
	modOnly: true,
	usage: 'banword <wordToAdd> OR banword list',
	execute(message, args) {
		const {adminLogging} = message.client.config.channelIDs;
		const wordToAdd = args[0];

		if (args.length !== 1) {
			message.client.channels.get(adminLogging).send('Please add a word to ban!');
			return;
		}

		const profanitiesString = readFileSync('utils/profanities.json', 'utf8');
		const profanitiesJSON = JSON.parse(profanitiesString);

		if (args[0] === 'list') {
			message.client.channels.get(adminLogging).send(profanitiesJSON.bannedWords.join());
			return;
		}


		profanitiesJSON.bannedWords.push(wordToAdd);
		writeFile('utils/profanities.json', JSON.stringify(profanitiesJSON), (err) => {
			if (err) {
				throw err;
			}
			message.react('✅');
		});

	}

};
