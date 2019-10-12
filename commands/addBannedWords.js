const {writeFile} = require('fs');
const bannedWordList = require('../utils/profanities.json');

module.exports = {
	name: 'banword',
	description: 'Adds a word to the ban list',
	guildOnly: true,
	modOnly: true,
	usage: 'banword <wordToAdd>',
	execute(message, args) {
		const {adminLogging} = message.client.config.channelIDs;
		const wordToAdd = args[0];

		if (args.length !== 1) {
			message.client.channels.get(adminLogging).send('Please add a word to ban!');
			return;
		}

		bannedWordList.bannedWords.push(wordToAdd);
		writeFile('utils/profanities.json', JSON.stringify(bannedWordList), (err) => {
			if (err) {
				throw err;
			}
			message.react('✅');
		});

	}

};
