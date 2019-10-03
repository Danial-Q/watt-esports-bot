const {channelIDs} = require('../config.json');

module.exports = {
	name: 'member',
	description: 'Veriyfing Membership Status',
	guildOnly: true,
	execute(message, args) {
		const member = message.author;
		const hwID = args[0].toUpperCase();

		if (hwID.length === 9 && hwID.startsWith('H')) {
			message.delete();
			message.client.channels.get(channelIDs.membershipVerification).send(member + ': ' + hwID);
		}
		else {
			message.delete();
			message.channel.send(member + ' Incorrect Matriculation Number');
		}
	}
};
