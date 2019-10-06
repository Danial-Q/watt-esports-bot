# Watt Esports Discord Bot

### The bot for the Heriot Watt Esports society discord server.

## Implementation Details

### Command Handler

**NOTE** - This is only used in the `message` event of discord.js. If adding functionality to another event, or without the prefix, please look at [event handler](#event-handler).

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


### Event Handler
Each discord.js event has been split into it's own file

To add a new event, create a file in the `/events/` directory, and this **HAS** to be named the exact same as as discord.js event, passing on the correct arguments ([Docs here](https://discord.js.org/#/docs/main/stable/class/Client))

**NOTE** The first argument regardless of event will **ALWAYS** be `Client`

If the event already exists, you can do into the corresponding file and add the functionality into that file.

## Branch Naming Convention

`feat/featureName` - New features  
`fix/fixName` - Bug fixes  
`refactor/refactorName` - Refactoring code  
`dep/dependancyName` - Dependancy Work  

## config.json example

```{
    "token": "Bot token here",
    "prefix": "Selected prefix",
    "inviteLink": "Permanent discord invite link",
    "channelIDs": { // Channel IDs
        "adminLogging": "Admin log ID",
        "welcome": "Welcome ID",
		"getRole": "Get Role ID"
    },
	"guildID" : "Guild ID",
	"messageIDs": {
		"memberToggle": "Member Toggle ID",
		"lfgToggle": "LFG Toggle ID"
	},
    "roleIDs": { // Role IDs
        "games": "Games Label ID",
		"hwMember": "HW Members ID",
		"member": "Members ID",
		"lfg": "LFG ID",
		"noLfg: "No LFG ID",
        "misc": "Misc Label ID",
        "socMember": "Soc Member ID"
    },
    "spreadsheetID": "Spreadsheet ID",
    "spreadsheetConfig": {
        Spreadsheet Auth Obj here
    }
}
```

