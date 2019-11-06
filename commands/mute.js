const {RichEmbed} = require('discord.js');
const {writeFile} = require('fs');
const mutedUsersList = require('../utils/muted.json');

module.exports = {
	name: 'mute',
	description: 'Mutes a user with a given reason',
	guildOnly: true,
	modOnly: true,
	usage: 'mute <user> <reason>',
	execute(message, args) {
		const {adminLogging} = message.client.config.channelIDs;
		const memberToMute = message.mentions.members.first();
		const reason = args.join(' ').slice('22');

		if (!memberToMute) {
			message.channel.send('Please mention a user to mute!');
			return;
		}

		if (!reason) {
			message.channel.send('Please include a reason');
			return;
		}
		const muteEmbed = new RichEmbed()
			.setTitle('User Mute')
			.setColor('#FF0000')
			.addField('User', `${memberToMute}`, true)
			.addField('Muted by', `${message.author}`, true)
			.addField('Reason', `${reason}`)
			.setFooter(`${message.createdAt}`);


		mutedUsersList.mutedUsers.push(memberToMute.id);
		writeFile('utils/muted.json', JSON.stringify(mutedUsersList), (err) => {
			if (err) {
				throw err;
			}
			message.react('✅');
			message.client.channels.get(adminLogging).send(muteEmbed);
		});
	}
};
