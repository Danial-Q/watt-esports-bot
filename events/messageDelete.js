const {RichEmbed} = require('discord.js');
const {mutedUsers} = require('../utils/muted.json');
const {getDiscordId} = require('../utils/functions.js');
const moment = require('moment');

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
		.setAuthor(getDiscordId(user), user.avatarURL)
		.setTitle('Message delete')
		.setColor('#0098DB')
		.addField('Location', `${deletedMessage.channel}`)
		.addField('Message', `${deletedMessageContent}`)
		.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

	client.channels.get(adminLogging).send(deleteEmbed);
};
