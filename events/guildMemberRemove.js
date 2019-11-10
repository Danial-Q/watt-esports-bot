const moment = require('moment');
const {RichEmbed} = require('discord.js');
const {getDiscordId} = require('../utils/functions.js');

module.exports = (client, member) => {
	const {adminLogging} = client.config.channelIDs;
	const {user} = member;
	const leaveEmbed = new RichEmbed()
		.setAuthor(getDiscordId(user), user.avatarURL)
		.setColor('#0098DB')
		.setTitle('RIP User left discord')
		.setFooter(moment().format('h:mm a, Do MMMM YYYY'));

	client.channels.get(adminLogging).send(leaveEmbed);
};
