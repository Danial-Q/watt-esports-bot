const {RichEmbed} = require('discord.js');

module.exports = {
	name: 'report',
	description: 'Reports a mentioned user with a reason',
	execute(message, args) {
		const user = message.mentions.users.first();
		const reason = args.join(' ').slice('22');
		const {channelIDs} = message.client.config;

		if (!user) {
			message.channel.send('Please mention a user to report');
			return;
		}

		if (!reason) {
			message.channel.send('Please give a reason');
			return;
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
		message.client.channels.get(channelIDs.adminLogging).send(reportEmbed);
	}
};
