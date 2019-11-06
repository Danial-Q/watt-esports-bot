const {RichEmbed} = require('discord.js');
const {mutedUsers} = require('../utils/muted.json');

module.exports = (client, deletedMessage) => {
	const {adminLogging} = client.config.channelIDs;
	const deletedMessageContent = deletedMessage.content;
	const user = deletedMessage.author;

	if (user.bot) return;

	for (const mutedUser of mutedUsers) {
		if (user.id === mutedUser) {
			return;
		}
	}

	const deleteEmbed = new RichEmbed()
		.setTitle('Message delete')
		.setColor('#89CFF0')
		.addField('User', `${user}`, true)
		.addField('Location', `${deletedMessage.channel}`, true)
		.addField('Message', `${deletedMessageContent}`)
		.setFooter(`${deletedMessage.createdAt}`);

	client.channels.get(adminLogging).send(deleteEmbed);
};
