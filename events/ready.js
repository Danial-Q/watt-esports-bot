module.exports = (client) => {
	console.log('Ready!');
	client.user.setPresence({
		game: {
			name : 'you.',
			type: 'WATCHING'
		}
	});
};
