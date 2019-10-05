module.exports = (client, message) => {
	const {prefix} = client.config;

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
		} else {
			command.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
};
