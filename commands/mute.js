const {modRole} = require('../config.json');

module.exports = {
	name: 'mute',
	description: 'Muting users',
	guildOnly: true,
	execute(message, args) {
        const modsRole = message.guild.roles.get(modRole);

        console.log(modRole);
        if (message.member.roles.find(modRole)){
            //mutedUser.append(args[0]);
            console.log("It works");
        }
	}
};