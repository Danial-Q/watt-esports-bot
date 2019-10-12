module.exports = {
	name: 'link',
	description: 'Provides discord invite link',
	usage: 'link',
	execute(message) {
		const {inviteLink} = message.client.config;

		message.channel.send(inviteLink);
	},
};
