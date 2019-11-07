const {RichEmbed} = require('discord.js');
const {getDiscordId} = require('../utils/functions.js');
const moment = require('moment');

module.exports = (client, oldMessage, newMessage) => {
	const {adminLogging} = client.config.channelIDs;
	const oldMessageContent = oldMessage.content;
	const newMessageContent = newMessage.content;
	const user = newMessage.author;

	if (user.bot) return;

	const editEmbed = new RichEmbed()
		.setAuthor(getDiscordId(user), user.avatarURL)
		.setTitle('Message edit')
		.setColor('#0098DB')
		.addField('Location', `${newMessage.channel}`)
		.addField('Before', `${oldMessageContent}`)
		.addField('After', `${newMessageContent}`)
		.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

	client.channels.get(adminLogging).send(editEmbed);
};
