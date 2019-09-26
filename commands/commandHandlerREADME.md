# Command Handler

**NOTE** - This is only used in the `message` event of discord.js. If adding functionality to another event, or without the prefix please follow [this](../events/eventHandlerREADME.md).

This handles all commands that prefixed with the defined prefix in your `config.json` file.

To add a new command, follow these steps: 

1. Create a new file under the `commands` directory (Descriptive names are the best!)
2. Add the following in the file and edit accordingly :
```
module.exports = {
	name: 'The triggerword of the command',
	description: 'Short description of what the command does',
    guildOnly : true // Boolean, is not necessary depending on the command
	execute(message, args) {
		// code goes here
	},
```
