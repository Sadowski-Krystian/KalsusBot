const Discord = require("discord.js")
const fs = require("fs");
const {DisTube} = require('distube')
var cron = require("cron");
const async = require("hbs/lib/async");
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
client.wscount = 0
var timeout
var timeoutdzien

const restrictPings = ['459333178163724288']

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    console.log("member update");
    if(oldMember.roles.cache.size < newMember.roles.cache.size) {
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                console.log(role);
            }
        });
    }
})

client.on('guildScheduledEvent', async guildScheduledEvent => {
    exe(null, null, "event")
})


client.on('messageCreate', async message =>{
    let msg = message.content.toLowerCase()
        if((!msg.startsWith(prefix) )){
            
            if(message.author.bot){
                if(message.content.includes("has been banned.") || message.content.includes("has been temp-banned")){
                    exe(message, null, "memberban")
                }else if(message.content.includes('Twoje krety niedługo znajdą się w Twoim banku')){
                    exe(message, message.author.id, "sellkret")
                   
                    
                }
                if(message.channelId == "845695093784051732" && msg.includes("dzisiaj są urodziny")){
                    exe(message, null, "urodziny")
                }
                return
            }
            if(message.author.id == "486965162130276395" && msg == "cośczegonigdynienapiszesz"){
                exe(message, message.author.id, "wl")
                console.log("bonżur");
            }
            if(message.channelId == "845678013898293261"){
                try{
                   clearTimeout(timeout)
                   clearTimeout(timeoutdzien) 
                }catch(err){
                    console.log(err);
                }
                client.msgcountczat ++;
                timeout = setTimeout(nonActivity, 1800000 );
                if(client.msgcountczat == 500){
                    console.log("zlicza wiadomości");
                    client.msgcountczat = 0
                    exe(message, null, "zkczat")
                }
            }
            if(message.channelId == "845695093784051732"){
                exe(message, null, "ogloszenia")
            }
            if(message.channelId == "847820472791597086" && msg.includes('<@&848154751723110410>')){
                exe(message, null, "konkurs")
            }
            if(message.channelId == "926145953541537843" || message.channelId == "921499736320647249"){
                client.wscount ++
                if(client.wscount == 10){
                    console.log("zlicza wiadomości");
                    client.wscount = 0
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
    if(hour>12){
        client.msgcountczat = 0
        console.log(hour);
        exe(null, null, "brakczat")
        console.log("czat nieaktywny");
        timeout = setTimeout(nonActivity, 1800000)
        console.log(timeout + "Nieliczenie wiadomosci");
    }else if(hour == 12){
        console.log("job started");
        timeoutdzien = setTimeout(nonActivity, 1800000)
        console.log(timeoutdzien + "Started");
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
let dziennelos = new cron.CronJob('00 00 11 * * *', daily);
dziennelos.start()
let tydzlosowanie = new cron.CronJob('00 00 00 * * sun', weekly);
tydzlosowanie.start()
let newmonth = new cron.CronJob('00 00 00 1 * *', monthly);
newmonth.start()

function daily(){
    exe(null, null, "daily")
    console.log("daily");
}
function weekly(){
    exe(null, null, "weekly")
    console.log("weakly");
}
function monthly(){
    exe(null, null, "monthly")
    console.log("monthly");
}



client.login(process.env.TOKEN)