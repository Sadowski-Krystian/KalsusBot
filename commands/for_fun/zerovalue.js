const conf = require("../../conf.js")
module.exports = {
    name: "zelovalue",
    description: "Wyświetla informamacje o użytkowniku i kanale",
    //usage: "debug",
    execute: async(message, id, client) =>{




        
            client.channels.fetch(conf.gieldachannel, false).then((channel) => {
                channel.send(`<@&862359981948534854> \nWartość kreta spadła do najniższej \nAktualna wartość: 100,000  <:kret:847542505607790693>`)
            })
        
        
    }
}