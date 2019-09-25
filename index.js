import {readdirSync} from 'fs';
import {Client, Collection} from 'discord.js';
import {token, prefix, joiningRole, channelIDs} from './config.json';
const client = new Client();

client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
		game: {
			name : 'you.',
			type: 'WATCHING'
		}
	});
});

client.on('message', message => {
	
	var i = 0;
	var mutedUsers;
	//var mutedUsers = [138021005821083650,168403260619620353];
	//working muting, mutes whoever is in the mutedUsers array

	while(mutedUsers.length>i){
		if (message.author.id==mutedUsers[i]) {
			message.delete();
		}
		i++
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	//!
	//>!!

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
		}
		else {
			command.execute(message, args);
		}
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.on('guildMemberAdd', member => {
	try {
		const joinRole = member.guild.roles.get(joiningRole);

		member.addRole(joinRole);
		member.send(`Hey there! Welcome to Watt eSports! If you're a fresher please contact a moderator ASAP letting them know, otherwise take a read of <#${channelIDs.welcomeChannel}> and enjoy!`);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(token);