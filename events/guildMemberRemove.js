const {RichEmbed} = require('discord.js');
const {getDiscordId} = require('../utils/functions.js');
const moment = require('moment');

module.exports = (client, member) => {
	const {adminLogging} = client.config.channelIDs;
	const {user} = member;

	const leaveEmbed = new RichEmbed()
		.setAuthor(getDiscordId(user), user.avatarURL)
		.setColor('#89CFF0')
		.setTitle('RIP User left discord')
		.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

	client.channels.get(adminLogging).send(leaveEmbed);
};
