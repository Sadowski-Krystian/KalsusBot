const non = require("./zerovalue")
const conf = require("../../conf.js")
module.exports = {
    name: "zkczat",
    description: "Wyświetla spis komend",
    //usage: "debug",
    execute: async(message, id, client) =>{
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
                let precentage = value * 0.10
                precentage = parseInt(precentage)
                console.log(precentage);
                let newValue = value + precentage
                console.log(newValue);
                if(newValue < 100000){
                    non.execute(null, null, client)
                }else{
                    internationalNumberFormat = new Intl.NumberFormat('en-US')
                    newValue = internationalNumberFormat.format(newValue)
                    msgSend(newValue)
                }
              })
              .catch(console.error);
           });
        
        function msgSend(val){
            client.channels.fetch(conf.gieldachannel, false).then((channel) => {
                channel.send(`<@&862359981948534854> \n500 nowych wiadomości na <#845678013898293261> \n+10% \nAktualna wartość: ${val}  <:kret:847542505607790693>`)
            })
        }
        
    
    }
}