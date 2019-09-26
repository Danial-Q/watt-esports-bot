module.exports = {
	name: 'link',
	description: 'Provides discord invite link',
	execute(message) {
		message.channel.send('https://discord.gg/JwJcHgX');
	},
};
