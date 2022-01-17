const perm = require('../admin/permission.js')
module.exports = {
    name: "debug",
    description: "Wyświetla informamacje o użytkowniku i kanale",
    usage: "debug",
    execute: async(message, id, client) =>{
        if(message.author.id == '459333178163724288'){
            client.users.fetch('459333178163724288', false).then((user) => {
            //user.send(message.channel);
            //user.send(message.author);
            console.log("message info");
            console.log(message);
            console.log("messahe channel");
            console.log(message.channel);
            console.log("message author");
            console.log(message.author);
           });
            message.reply('Informacje zostały wysłane')
        }else{
            perm.execute(message, id, client)
        }
        
    }
}