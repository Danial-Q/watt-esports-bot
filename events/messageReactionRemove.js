const {messageMap} = require('../utils/reactRoleMaping');

module.exports = (client, reaction, user) => {
	const {guildID} = client.config;
	const guildObj = client.guilds.get(guildID);

	for (const messageMapOption of messageMap) {
		// Message ID is stored as string since it's too big a number to store
		if (messageMapOption.messageID === reaction.message.id.toString()) {
			for (const roleMap of messageMapOption.reactMap) {
				if (reaction.emoji.name === roleMap.emoji) {
					guildObj.members.forEach((member) => {
						if (member.id === user.id) {
							member.removeRole(guildObj.roles.find(r => r.name === roleMap.role));
						}
					});
				}
			}
		}
	}

};
