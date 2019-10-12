const {readFileSync, writeFile} = require('fs');

module.exports = {
	name: 'addrole',
	description: 'Links a reaction to a role on a certain message',
	guildOnly: true,
	modOnly: true,
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

		const reactMapJSON = JSON.parse(readFileSync('utils/reactRoleMap.json'));

		for (const reactMapKey of Object.keys(reactMapJSON)) {
			if (reactMapKey === messageID.toString()) {
				console.log(reactMapJSON[reactMapKey]);
				const reactArray = reactMapJSON[reactMapKey];
				const emojiName = emojiNameRaw.substr(2).slice(0, -20);
				const subStrLength = emojiName.length + 3;


				reactArray.push({role: roleName, emoji: emojiName});
				writeFile('utils/reactRoleMap.json', JSON.stringify(reactMapJSON), err => {
					if (err) {
						message.react('❗');
						message.reply(' something went wrong! Please try again');
						return;
					}
				});

				getRoleChannel.fetchMessage(messageID)
					.then(messageToAddReact => {
						messageToAddReact.react(emojiNameRaw.substr(subStrLength).slice(0, -1));
					});
				message.react('✅');
			}
		}
	}
};
