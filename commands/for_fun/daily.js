module.exports = {
    name: "daily",
    description: "Wyświetla spis komend",
    //usage: "debug",
    execute: async(message, id, client) =>{
        client.channels.fetch("874017637955424286", false).then((channel) => {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();
                let content = lastMessage.content
                let valueString = content.substring(content.indexOf(":"), content.lastIndexOf("<"));
                let value = valueString.replace( /^\D+/g, '');
                value = value.replace(/\s/g, '')
                console.log(value);
                value = parseInt(value)
                let rand = Math.floor(Math.random() * 50) -25
                rand = rand/100
                let precentage = value * rand
                precentage = parseInt(precentage)
                console.log(precentage);
                let newValue = value + precentage
                console.log(newValue);
                newValue = newValue.toLocaleString()
                let send = rand * 100
                send = parseInt(send)
                if(send>0){
                    send = "+"+send
                }
                msgSend(newValue, send)
              })
              .catch(console.error);
           });
        
        function msgSend(val, rand){
            client.channels.fetch("845687256671846430", false).then((channel) => {
                channel.send(` \nDzienne losowanie \n${rand}% \nAktualna wartość: ${val}  <:kret:847542505607790693>`)
            })
        }
        
    
    }
}