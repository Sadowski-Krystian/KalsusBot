const Discord = require("discord.js")
const fs = require("fs");
const {DisTube} = require('distube')
var cron = require("cron");
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

const prefix = "'"

client.once('ready', ()=>{
    console.log("bot jest aktywny");
    client.user.setActivity("'help", {type: "LISTENING"})
})

client.msgcountczat = 0




const restrictPings = ['459333178163724288']

client.on('messageCreate', async message =>{
    let msg = message.content.toLowerCase()
        if((!msg.startsWith(prefix) )){
            
            if(message.author.bot){
                return
            }
            if(message.author.id == "486965162130276395" && msg == "nub"){
                exe(message, message.author.id, "wl")
                console.log("bonżur");
            }
            if(message.channelId == "845678013898293261"){
                client.msgcountczat ++;
                setTimeout(nonActivity, 7200000 );
                if(client.msgcountczat == 300){
                    console.log("zlicza wiadomości");
                    client.msgcountczat = 0
                    exe(message, null, "zkczat")
                }
            }
            
        
        return
        }else{
            const args = msg.slice(prefix.length).trim().split(/ +/)
            const commandName = args.shift().toLowerCase();
            exe(message, args, commandName)
        }
    
    
    
    
    
    


})
let job1 = new cron.CronJob('00 00 12 * * *', nonActivity);
job1.start()
function nonActivity(){
    let d = new Date();
    let hour = d.getHours()
    if(hour>=12){
        console.log(hour);
        exe(null, null, "brakczat")
        setTimeout(nonActivity, 7200000)
    }else{
        console.log("jest po 00");
    }
    
}
function exe(message, args, commandName){
        
    if(!client.commands.has(commandName) && message.content != '<@!919935716379734047>'){
        console.log(client.commands);
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


function daily(){
    exe(null, null, "daily")
}
function weekly(){
    exe(null, null, "weekly")
}

let dziennelos = new cron.CronJob('00 00 12 * * *', daily);
dziennelos.start()
let tydzlosowanie = new cron.CronJob('00 00 00 * * sun', weekly);
tydzlosowanie.start()

client.login(process.env.TOKEN)