module.exports = {
    name: "diened",
    description: "Brak Permisji",
    //usage: "pfp",
    execute: async(message, args, client) =>{
        message.channel.send("Nie masz permisji")
    }
}