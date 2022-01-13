const Discord = require("discord.js")
const fs = require("fs");
const conf = require("./conf.js")
const {DisTube} = require('distube')
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
client.perm = ['459333178163724288']

client.distube = new DisTube(client, {
    leaveOnFinish: true,

})
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders){
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))

    for(const file of commandFiles){
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command);
    }
}

const prefix = "k"

client.once('ready', ()=>{
    console.log("bot jest aktywny");
    client.user.setActivity("khelp", {type: "LISTENING"})
})






const restrictPings = ['459333178163724288']

client.on('messageCreate', async message =>{
    let msg = message.content.toLowerCase()
        if((!msg.startsWith(prefix) )){
            if(message.author.bot){
                return
            }
            
        
        return
        }else{
            const args = msg.slice(prefix.length).trim().split(/ +/)
            const commandName = args.shift().toLowerCase();
            exe(message, args, commandName)
        }
    
    
    
    
    
    


})
function exe(message, args, commandName){
        
    if(!client.commands.has(commandName) && message.content != '<@!919935716379734047>'){
        console.log("brak komendy lub brak pingu");
        console.log(message.content);
        return
    }

    const command = client.commands.get(commandName)
    
    try{
        command.execute(message, args, client)
        
    }catch(err){
        console.log(err);
        message.reply('ta komenda nie działa')
        
    }
}


client.login("OTMxMjk1MDQ4MzY3MjQzMjg0.YeCWGg.m8clJVfJsfMySI_QXe1UmAQr3qs")