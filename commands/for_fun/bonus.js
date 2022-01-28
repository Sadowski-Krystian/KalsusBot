const perm = require('../admin/permission.js')
const non = require("./zerovalue")
const conf = require("../../conf.js")
module.exports = {
    name: "bonus",
    description: "bonusowe losowanie złotego kreta",
    usage: "bonus <value>",
    execute: async(message, args, client) =>{
        let zlchannel = client.channels.cache.get(conf.gieldachannel);
        let authorid = message.author.id
        let mymember = message.guild.members.cache.get(authorid)
        if(!mymember.permissionsIn(zlchannel).has("SEND_MESSAGES")){
            perm.execute(message, message.author.id, client)
            return 
        }
        let usage = "bonus <value>"
        if(args.length <1){
            message.channel.send(`Niepoprawne użycie komendy \n${usage}`)
            return
        }else{
            if(args[0] > 99){
                message.channel.send("lonowanie nie może być większe od 99")
                return
            }else if(args[0] <= 0){
                message.channel.send("nie można losować ujemnych lub zerowych wartości")
                return
            }
            client.channels.fetch(conf.gieldachannel, false).then((channel) => {
                channel.messages.fetch({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first();
                    let content = lastMessage.content
                    let valueString = content.substring(content.indexOf(":"), content.lastIndexOf("<"));
                    let value = valueString.replace( /^\D+/g, '');
                    value = value.replace(/,/g, '')
                    value = value.replace(/\s/g, '')
                    console.log(value);
                    value = parseInt(value)
                    let num = args[0] * 2
                    let rand = Math.floor(Math.random() * num) - args[0]
                    rand = rand/100
                    let precentage = value * rand
                    precentage = parseInt(precentage)
                    console.log(precentage);
                    let newValue = value + precentage
                    console.log(newValue);
                    if(newValue < 100000){
                        non.execute(null, null, client)
                    }else{
                        internationalNumberFormat = new Intl.NumberFormat('en-US')
                        newValue = internationalNumberFormat.format(newValue)
                        let send = rand * 100
                        send = parseInt(send)
                        if(send>0){
                            send = "+"+send
                        }
                        msgSend(newValue, send)
                    }
                  })
                  .catch(console.error);
               });
        }
        
        
        function msgSend(val, rand){
            client.channels.fetch(conf.gieldachannel, false).then((channel) => {
                channel.send(`<@&862359981948534854> \nBonusowe losowanie \n${rand}% \nAktualna wartość: ${val}  <:kret:847542505607790693>`)
            })
        }
        
    
    }
}