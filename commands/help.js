const {RichEmbed} = require('discord.js');

// TODO: Make RichEmbed menu OR change how this works

module.exports = {
	name: 'help',
	description: 'Lists all commands, usage and description',
	usage: 'help',
	guildOnly: true,
	execute(message) {
		const {commands, config} = message.client;
		const {prefix, roleIDs} = config;
		const helpEmbed = new RichEmbed()
			.setTitle('Commands Info')
			.setColor('#000080')
			.addField('Below is the full list of commands, with usage', `Prefix for the bot is ${prefix}`)
			.addBlankField();

		for (const command of commands.values()) {
			if (command.modOnly && !message.member.roles.has(roleIDs.mod)) {
				continue;
			}
			command.modOnly ? helpEmbed.addField('IMPORTANT!', 'Only mods can use these commands, non-mods will see no result if they try execute this') : null;
			helpEmbed.addField(`${command.description}`, `\`${prefix}${command.usage}\``)
				.addBlankField();
		}

		helpEmbed.setFooter('Got a suggestion for a command? Let a moderator know!');

		message.author.send(helpEmbed);
		message.react('📧');
	}
};

