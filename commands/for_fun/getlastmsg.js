const { Client } = require('unb-api');
const client = new Client(process.env.UNBTOKEN);

const guildID = '845678013898293258';
module.exports = {
    name: "addmoney",
    description: "Wyświetla informamacje o użytkowniku i kanale",
    //usage: "debug",
    execute: async(message, id, val) =>{

        message.channel.messages.fetch(id)
        .then(messages => {
            console.log(messages.author.id);
            client.editUserBalance(guildID, messages.author.id, { cash: 0, bank: val });
        })
        .catch(console.error);


        
        
    }
}