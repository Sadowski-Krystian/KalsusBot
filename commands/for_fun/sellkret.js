
const non = require("./zerovalue")
const get = require("./getlastmsg")
module.exports = {
    name: "sellkret",
    description: "Wyświetla spis komend",
    //usage: "debug",
    execute: async(message, id, client) =>{
        var previousMessage
            
        client.channels.fetch("874017637955424286", false).then((channel) => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();
                let content = lastMessage.content
                let valueString = content.substring(content.indexOf(":"), content.lastIndexOf("<"));
                let value = valueString.replace( /^\D+/g, '');
                value = value.replace(/,/g, '')
                value = value.replace(/\s/g, '')
                console.log(value);
                value = parseInt(value)
                message.channel.messages.fetch({limit: 2})
                    .then(messageMappings => {
                    let messages = Array.from(messageMappings.keys());
                    previousMessage = messages[1];
                    get.execute(message, previousMessage, value)
                
                })
                .catch(error => console.log(error))
                //sellKret(value, previousMessage.author.id)
                let precentage = value * -0.05
                precentage = parseInt(precentage)
                console.log(precentage);
                let newValue = value + precentage
                if(newValue < 100000){
                    non.execute(null, null, client)
                }else{
                    console.log(newValue);
                    internationalNumberFormat = new Intl.NumberFormat('en-US')
                    newValue = internationalNumberFormat.format(newValue)
                
                    msgSend(newValue)
                }
                
              })
              .catch(console.error);
           });
           
        
        function msgSend(val){
            client.channels.fetch("874017637955424286", false).then((channel) => {
                channel.send(`<@&862359981948534854> \nSprzedaż złotego kreta \n-5% \nAktualna wartość: ${val}  <:kret:847542505607790693>`)
            })
        }
        function sellKret(val, id){
           
        }
        
    
    }
}