const moment = require('moment');
const {RichEmbed} = require('discord.js');
const {getDiscordId} = require('../utils/functions.js');

module.exports = (client, oldMessage, newMessage) => {
	const {adminLogging} = client.config.channelIDs;
	const user = newMessage.author;

	if (oldMessage.content === newMessage.content) return;
	if (!oldMessage.partial) {
		const editEmbed = new RichEmbed()
			.setAuthor(getDiscordId(user), user.avatarURL)
			.setColor('#0098DB')
			.addField('Message Edit', `[Jump to Message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
			.addField('Before', `${oldMessage.content}`)
			.addField('After', `${newMessage.content}`)
			.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

		client.channels.get(adminLogging).send(editEmbed).catch(console.error);
	}
};
