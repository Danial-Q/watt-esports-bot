module.exports = (client, member) => {
	const {roleIDs, channelIDs} = client.config;
	const joinRole = member.guild.roles.get(roleIDs.joinRole);

	member.addRole(joinRole);
	member.send(`Hey there! Welcome to Watt eSports! If you're a fresher please contact a moderator ASAP letting them know, otherwise take a read of <#${channelIDs.welcomeChannel}> and enjoy!`);
};
