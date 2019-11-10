const moment = require('moment');
const {RichEmbed} = require('discord.js');
const {getDiscordId} = require('../utils/functions.js');

module.exports = (client, oldMessage, newMessage) => {
	const {adminLogging} = client.config.channelIDs;
	const oldMessageContent = oldMessage.content;
	const newMessageContent = newMessage.content;
	const user = newMessage.author;
	const editEmbed = new RichEmbed()
		.setAuthor(getDiscordId(user), user.avatarURL)
		.setTitle('Message edit')
		.setColor('#0098DB')
		.addField('Location', `${newMessage.channel}`)
		.addField('Before', `${oldMessageContent}`)
		.addField('After', `${newMessageContent}`)
		.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

	if (user.bot) return;

	client.channels.get(adminLogging).send(editEmbed);
};
