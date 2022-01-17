module.exports = {
    name: "zkczat",
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
                let precentage = value * 0.10
                precentage = parseInt(precentage)
                console.log(precentage);
                let newValue = value + precentage
                console.log(newValue);
                newValue = newValue.toLocaleString()
                msgSend(newValue)
              })
              .catch(console.error);
           });
        
        function msgSend(val){
            client.channels.fetch("874017637955424286", false).then((channel) => {
                channel.send(`<@932663662651510914> \n300 nowych wiadomości na <#845678013898293261> \n+10% \nAktualna wartość: ${val}  <:kret:847542505607790693>`)
            })
        }
        
    
    }
}