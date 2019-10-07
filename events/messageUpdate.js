const {RichEmbed} = require('discord.js');

module.exports = (client, oldMessage, newMessage) => {
	const {adminLogging} = client.config.channelIDs;
	const oldMessageContent = oldMessage.content;
	const newMessageContent = newMessage.content;
	const user = newMessage.author;

	if (user.bot) return;

	const editEmbed = new RichEmbed()
		.setTitle('Message edit')
		.setColor('#89CFF0')
		.addField('User', `${user}`)
		.addField('Location', `${newMessage.channel}`)
		.addField('Before', `${oldMessageContent}`)
		.addField('After', `${newMessageContent}`)
		.setFooter(`${newMessage.createdAt}`);

	client.channels.get(adminLogging).send(editEmbed);
};
