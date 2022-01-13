module.exports = {
    name: "help",
    description: "Wyświetla spis komend",
    usage: "help",
    execute: async(message, args, client) =>{
        let msg = ""
            for(const command of client.commands){
                let usg = command[1].usage
                let description = command[1].description
                
                if(usg != undefined){
                    msg += usg+": "+description+"\n"
                }
                

            }
            message.channel.send(msg)
    }
}