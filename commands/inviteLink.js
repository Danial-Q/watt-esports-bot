const {inviteLink} = require('../config.json');

module.exports = {
	name: 'link',
	description: 'Provides discord invite link',
	execute(message) {
		message.channel.send(inviteLink);
	},
};
