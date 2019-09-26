const {modRole} = require('../config.json');

module.exports = {
	name: 'mute',
	description: 'Muting users',
	guildOnly: true,
	execute(message, args) {
        var fs = require('fs');


        if (message.member.roles.has(modRole)){

            const mutedJSONString = fs.readFileSync('muted.json','utf8');
            console.log("String: "+mutedJSONString);

            var mutedJSON = JSON.parse(mutedJSONString);
            mutedJSON = mutedJSON.table
            console.log("Keys = ",Object.keys(mutedJSON[0]));


            args[0] = args[0].replace('<','');
            args[0] = args[0].replace('>','');
            args[0] = args[0].replace('@','');
            
            
            

            if(args.length > 1){
                
                i = 0;
                console.log("Length: "+Object.keys(mutedJSON).length, "\ni: " + i)
                while(Object.keys(mutedJSON).length>i){
                    console.log("user: " + mutedJSON[i].user, "\nargs[0]: " +args[0])
                    if(args[0] == mutedJSON[i].user){
                        message.reply("User already muted");
                        return;
                    }
                    i++
                }

                const reason = args.splice(1).join(" ");
                console.log(reason);

                var d = new Date();
                time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " " +  d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() 

                mutedJSON.push({user: args[0], reason: reason, by: message.author.id, when: time});
            }else{
                message.reply("Please include a reason")
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