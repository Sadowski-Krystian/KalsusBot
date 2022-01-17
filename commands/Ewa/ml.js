module.exports = {
    name: "wl",
    description: "Wyświetla spis komend",
    //usage: "help",
    execute: async(message, id, client) =>{
        try{
            let user = message.guild.members.cache.get(id);
            console.log(id + "tomote");
            console.log(user.roles);
            user.roles.add(`845678055434879076`);
        }catch(err){
            console.log(err);
        }
        
        
    }
}