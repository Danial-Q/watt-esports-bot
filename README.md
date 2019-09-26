# Watt Esports Discord Bot

### The bot for the Heriot Watt Esports society discord server.

## Implementation Details
* [Command Handler](commands/commandHandlerREADME.md) 
* [Event Handler](events/eventHandlerREADME.md)

## Branch Naming Convention

`feat/featureName` - New features  
`fix/fixName` - Bug fixes  
`refactor/refactorName` - Refactoring code  
`dep/dependancyName` - Dependancy Work  

## config.json example

```{
    "token": "Bot Token here",
    "prefix" : "Chosen Prefix",
    "inviteLink" : "Discord perm invite link here"
    "joiningRole" : "Role ID to give on Join",
    "channelIDs" : {
        "membershipVerification" : "Membership Verification Channel ID",
        "welcomeChannel" : "Welcome Channel ID"
    }
}
```
