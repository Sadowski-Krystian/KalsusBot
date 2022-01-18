module.exports = {
    name: "ogloszenia",
    description: "Wyświetla spis komend",
    //usage: "debug",
    execute: async(message, id, client) =>{
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
                let precentage
                let cos
                let rand
                let msg = message.content.toLowerCase()
                if(msg.includes("dzisiaj są urodziny")){
                    precentage = value * 0.05
                    cos = "Urodziny"
                    rand = 0.05
                }else{
                    precentage = value * -0.08
                    cos = "Ogłoszenie"
                    rand = -0.08
                }
                
                precentage = parseInt(precentage)
                console.log(precentage);
                let newValue = value + precentage
                console.log(newValue);
                internationalNumberFormat = new Intl.NumberFormat('en-US')
                newValue = internationalNumberFormat.format(newValue)
                let send = rand * 100
                send = parseInt(send)
                if(send>0){
                    send = "+"+send
                }
                msgSend(newValue, send, cos)
              })
              .catch(console.error);
           });
        
        function msgSend(val, rand, cos){
            client.channels.fetch("874017637955424286", false).then((channel) => {
                channel.send(`<@&862359981948534854> \n${cos} \n${rand}% \nAktualna wartość: ${val}  <:kret:847542505607790693>`)
            })
        }
        
    
    }
}