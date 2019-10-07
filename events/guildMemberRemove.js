const {RichEmbed} = require('discord.js');

module.exports = (client, member) => {
	const {adminLogging} = client.config.channelIDs;
	const {user} = member;

	const leaveEmbed = new RichEmbed()
		.setColor('#89CFF0')
		.addField('User left', `${user}`)
		.setFooter('RIP');

	client.channels.get(adminLogging).send(leaveEmbed);
};
