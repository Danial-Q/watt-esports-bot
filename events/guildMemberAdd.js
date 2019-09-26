module.exports = (client, member) => {
	const {joiningRole, channelIDs} = client.config;
	const joinRole = member.guild.roles.get(joiningRole);

	member.addRole(joinRole);
	member.send(`Hey there! Welcome to Watt eSports! If you're a fresher please contact a moderator ASAP letting them know, otherwise take a read of <#${channelIDs.welcomeChannel}> and enjoy!`);
};
