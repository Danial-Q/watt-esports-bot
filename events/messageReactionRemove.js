const {memberTypeSelect} = require('../utils/reactRoleMaping');

module.exports = (client, reaction, user) => {
	const {messageIDs, guildID} = client.config;

	if (reaction.message.id === messageIDs.memberTypeSelect) {
		for (const option of memberTypeSelect) {
			if (reaction.emoji.name === option.emoji) {
				const guildObj = client.guilds.get(guildID);

				guildObj.members.forEach((member) => {
					if (member.id === user.id) {
						member.removeRole(guildObj.roles.find(r => r.name === option.role));
					}
				});
			}
		}
	}
};
