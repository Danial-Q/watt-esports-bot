module.exports = (client) => {
	const {channelIDs, guildID, messageIDs} = client.config;
	const guildObj = client.guilds.get(guildID);
	const welcomeChannel = guildObj.channels.get(channelIDs.welcome);

	client.user.setPresence({
		game: {
			name: 'you.',
			type: 'WATCHING'
		}
	});
	// Without this first reaction add and remove to the message doesn't register, whcih doesn't trigger giving roles
	console.log('Initialising all reaction messages...');

	welcomeChannel.fetchMessage(messageIDs.memberTypeSelect)
		.then(() => {
			console.log('Welcome message initialised!');
			console.log('Ready!');
		});

};
