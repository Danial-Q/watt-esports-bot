const {messageMap} = require('../utils/reactRoleMaping');

module.exports = {
	name: 'addrole',
	description: 'Links a reaction to a role on a certain message',
	guildOnly: true,
	modOnly: true,
	usage: 'addrole <emote> <rolename> <messageID>',
	execute(message, args) {
		const {roleIDs, guildID, channelIDs} = message.client.config;
		const guildObj = message.client.guilds.get(guildID);
		const getRoleChannel = guildObj.channels.get(channelIDs.getRole);
		const emojiNameRaw = args[0];
		const roleName = args[1];
		const messageID = args[2];

		if (message.member.roles.has(roleIDs.modRole)) {
			return;
		}

		if (!emojiNameRaw || !roleName || !messageID) {
			message.channel.send('Oops! Try again with `addrole <emoji> <roleName> <messageID>`');
			return;
		}

		for (const messageMapOption of messageMap) {
			if (messageMapOption.messageID === messageID.toString()) {
				const emojiName = emojiNameRaw.substr(2).slice(0, -20);
				const subStrLength = emojiName.length + 3;

				getRoleChannel.fetchMessage(messageID)
					.then(messageToAddReact => {
						messageToAddReact.react(emojiNameRaw.substr(subStrLength).slice(0, -1));
					});
				messageMapOption.reactMap.push({role: roleName, emoji: emojiName});
				console.log(messageMapOption.reactMap);
				message.react('✅');
				// Doesn't persist through bot restart. Implement persistance or manually add to arrays.
				message.author.send(`Sucessfully linked "${roleName}" to "${emojiName}". Please DM someone who manages the bot with this info to ensure it persists!`);
			}
		}
	}
};
