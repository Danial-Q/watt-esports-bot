const {RichEmbed} = require('discord.js');

module.exports = (client, deletedMessage) => {
	const {adminLogging} = client.config.channelIDs;
	const deletedMessageContent = deletedMessage.content;
	const user = deletedMessage.author;

	if (user.bot) return;

	const deleteEmbed = new RichEmbed()
		.setTitle('Message delete')
		.setColor('#89CFF0')
		.addField('User', `${user}`)
		.addField('Location', `${deletedMessage.channel}`)
		.addField('Message', `${deletedMessageContent}`)
		.setFooter(`${deletedMessage.createdAt}`);

	client.channels.get(adminLogging).send(deleteEmbed);
};
