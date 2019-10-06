const {memberToggle, lfgToggle} = require('../utils/reactRoleMaping');

module.exports = (client, reaction, user) => {
	const {messageIDs, guildID} = client.config;

	if (reaction.message.id === messageIDs.memberToggle) {
		for (const option of memberToggle) {
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

	if (reaction.message.id === messageIDs.lfgToggle) {
		for (const option of lfgToggle) {
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
