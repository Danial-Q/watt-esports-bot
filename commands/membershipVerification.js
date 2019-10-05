const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('../spreadsheetCredentials.json');
const { readFileSync, writeFile } = require('fs');

module.exports = {
	name: 'member',
	description: 'Veriyfing Membership Status',
	guildOnly: true,
	execute(message, args) {
		const member = message.member;
		const hwID = args[0].toUpperCase();
		const { spreadsheetID, roleIDs } = message.client.config;

		message.delete();
		if (hwID.length === 9 && hwID.startsWith('H')) {
			const spreadsheet = new GoogleSpreadsheet(spreadsheetID);

			spreadsheet.useServiceAccountAuth(credentials, () => {
				spreadsheet.getRows(1, (err, rows) => {
					let hwIDInSheet = false;

					for (const row of rows) {
						if (row.matriculationnumber === hwID) {
							hwIDInSheet = true;
							row.discordname = member.user.username + '#' + member.user.discriminator;
							row.updated = 'Yes';
							row.save();
							member.addRole(roleIDs.socMember);
							break;
						}
					}

					if (!hwIDInSheet) {
						const storedHWIDs = readFileSync('storage/hwIds.json', 'utf8');
						const storedHWIDsJSON = JSON.parse(storedHWIDs);

						storedHWIDsJSON.hwID = member.id;
						writeFile('storage/hwIds.json', JSON.stringify(storedHWIDsJSON), (err) => {
							if (err) {
								throw err;
							}
							console.log('Added ID to local storage');
						});
					}
				});
			});
		} else {
			message.channel.send(member + ' Incorrect Matriculation Number');
		}
	}
};
