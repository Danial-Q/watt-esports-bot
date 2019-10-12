const {RichEmbed} = require('discord.js');
const {bannedWords} = require('../utils/profanities.json');

module.exports = (client, message) => {
	const {prefix, channelIDs, roleIDs} = client.config;

	for (const bannedWord of bannedWords) {
		if (message.content.includes(bannedWord) && !message.author.bot) {
			message.delete();

			const bannedWordUseEmbed = new RichEmbed()
				.setTitle('Banned word used UwU')
				.setColor('#FF0000')
				.addField('User', `${message.author}`)
				.addField('Location', `${message.channel}`)
				.addField('Message', `${message.content}`)
				.setFooter(`${message.createdAt}`);

			client.channels.get(channelIDs.adminLogging).send(bannedWordUseEmbed);

			break;
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content === prefix) {
		message.channel.send('!!');
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	try {
		if (command.guildOnly && message.channel.type !== 'text') {
			message.reply('I can\'t execute that command inside DMs!');
		} else if (command.modOnly && !message.member.roles.has(roleIDs.mod)) {
			return;
		} else {
			command.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
};
