const {modRole} = require('../config.json');

module.exports = {
	name: 'unmute',
	description: 'Muting users',
	guildOnly: true,
	execute(message, args) {
        var fs = require('fs');


        if (message.member.roles.has(modRole)){

            const mutedJSONString = fs.readFileSync('muted.json','utf8');
            console.log("String: " + mutedJSONString);

            var mutedJSON = JSON.parse(mutedJSONString);
            console.log("String: " + mutedJSON);
            console.log("Keys = ",Object.keys(mutedJSON[0]));

            person = args[0]
            args[0] = args[0].replace('<','');
            args[0] = args[0].replace('>','');
            args[0] = args[0].replace('@','');
            
            if(args.length == 1){
                userExists = false;
                i = 0;
                console.log("Length: "+Object.keys(mutedJSON).length, "\ni: " + i)
                while(Object.keys(mutedJSON).length>i){
                    console.log("user: " + mutedJSON[i].user, "\nargs[0]: " +args[0])
                    if(args[0] == mutedJSON[i].user){
                        message.reply("Unmuted " + person);
                        j = i;
                        userExists = true;
                    }
                    i++
                }

                if(!userExists) {
                    message.reply(person + " wasn't muted in the first place.");
                    return;
                }

                console.log(mutedJSON[j]);

                mutedJSON.splice(j, 1)

                console.log(mutedJSON[j]);


                
            }else{
                message.reply("Too few or too many arguments");
                return;
            }
           
            fs.writeFile ("muted.json", JSON.stringify(mutedJSON), function(err) {
                if (err) throw err;
                console.log('complete');
                }
            );

            console.log(args[0]);
            console.log("It works", args[0]);
        }
	}
};