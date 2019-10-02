const {RichEmbed} = require('discord.js');
const {channelIDs} = require('../config.json');

module.exports = {
	name: 'report',
	description: 'Reports a mentioned user with a reason',
	execute(message, args) {
		const user = message.mentions.users.first();
		const reason = args.join(' ').slice('22');

		if (!user) {
			return message.channel.send('Please mention a user to report');
		}

		if(!reason) {
			return message.channel.send('Please give a reason');
		}

		const reportEmbed = new RichEmbed()
			.setTitle('Report')
			.setColor('#FF0000')
			.addField('Reported User', `${user}`)
			.addField('Reason', `${reason}`)
			.addField('Channel', `${message.channel}`)
			.addField('Reported by', `${message.author}`)
			.setFooter(`${message.createdAt}`);

		message.delete();
		message.author.send('Your report has been submitted!');
		return message.client.channels.get(channelIDs.adminLogging).send(reportEmbed);
	}
};
