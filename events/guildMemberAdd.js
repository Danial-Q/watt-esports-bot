module.exports = (client, member) => {
	const {roleIDs, channelIDs} = client.config;
	const gamesRole = member.guild.roles.get(roleIDs.games);
	const miscRole = member.guild.roles.get(roleIDs.misc);

	member.addRole(gamesRole);
	member.addRole(miscRole);
	member.send(`Hey there! Welcome to Watt eSports! If you're a fresher please contact a moderator ASAP letting them know, otherwise take a read of <#${channelIDs.welcome}> and enjoy!`);
};
