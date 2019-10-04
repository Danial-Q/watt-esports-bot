const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('../spreadsheetCredentials.json');
const {readFileSync, writeFile} = require ('fs');

module.exports = {
	name: 'member',
	description: 'Veriyfing Membership Status',
	guildOnly: true,
	execute(message, args) {
		const member = message.member;
		const hwID = args[0].toUpperCase();
		const {spreadsheetID, roleIDs} = message.client.config;

		message.delete();
		if (hwID.length === 9 && hwID.startsWith('H')) {
			const spreadsheet = new GoogleSpreadsheet(spreadsheetID);

			spreadsheet.useServiceAccountAuth(credentials, () => {
				spreadsheet.getCells(1, {
					'min-col': 4,
					'max-col': 4,
					'return-empty': false
				}, (err, cells) => {
					let hwIDinSheet = false;

					for (const cell of cells) {
						if (cell.value === hwID) {
							hwIDinSheet = true;
							break;
						}
					}

					if (hwIDinSheet) {
						// TO DO Add discord username with number to corresponding column
						member.addRole(roleIDs.socMember);
					} else {
						const storedHWIDs = readFileSync('storage/hwIDs.json', 'utf8');
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
