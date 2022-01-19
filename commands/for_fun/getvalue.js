const non = require("./zerovalue")
module.exports = {
    name: "debug",
    description: "Wyświetla informamacje o użytkowniku i kanale",
    usage: "debug",
    execute: async(message, id, client) =>{
        var newValue
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
                sellKret(value, id)
                let precentage = value * -0.05
                precentage = parseInt(precentage)
                console.log(precentage);
                newValue = value + precentage
                if(newValue < 100000){
                    non.execute(null, null, client)
                }else{
                    console.log(newValue);
                    internationalNumberFormat = new Intl.NumberFormat('en-US')
                    newValue = internationalNumberFormat.format(newValue)
                }
                
              })
              .catch(console.error);
           });
           return(newValue)
        
    }
}