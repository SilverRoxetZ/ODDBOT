const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async() => {
    console.log(`Bot is ready! ${bot.user.username}`);

    try {
        let link = await bot.generateInvite(["ADMINSTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This is the motherfucker's info")
        .setColor("#9B59B6")
        .addField("Discord name & tag", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Created At", message.author.createdAt)
    
        message.channel.sendEmbed(embed);
        return;
}
if(command === `${prefix}mute`) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Yutz i don't have permission");

let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!toMute) return message.channel.sendMessage("Yutz who should i mute?")

if(toMute.id === message.author.id) return message.channel.sendMessage("yutz you cannot mute yourself!");
if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("Yutz this person has a higher role");

let role = message.guild.roles.find(r => r.name === "OB Muted");
if(!role) {
    try {
        role = await message.guild.createRole({
            name:"OB Muted",
            color: "#000000",
            permissions: []
        });
        
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
            });
        });
     } catch(e) {
            console.log(e.stack);
        }

        }
    
 if(toMute.roles.has(role.id)) return message.channel.sendMessage("dis guy is already muted");

await toMute.addRole(role);
message.channel.sendMessage("Ok they are muted yutz!");


 return;

}

if(command === `${prefix}unmute`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Yutz i don't have permission");
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Yutz who should i unmute?")
    
    let role = message.guild.roles.find(r => r.name === "OB Muted");
   
        
     if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This guy isn't even muted yutz");
    
    await toMute.removeRole(role);
    message.channel.sendMessage("Ok they are unmuted yutz!");
    
    
     return;
    }
 
    if (message === prefix + 'Fuck') {
        message.channel.send('Nigga')
    }
if (message.channel.id ===  '347506937015042058') {
    if (isNaN(message.content)) {
        message.delete()
        message.channel.sendMessage('Hell no :)')
    }
}

if (message === ('testswear')) {
    message.delete();
    message.channel.sendMessage('Do not swear!')
}
});

bot.on('guildMemberAdd', member => {
    console.log('user' + member.user.username + 'has joined')
    console.log(member)
    member.guild.channels.get('347502036692107265').send('**' + member.user.username + '**. has joined this server!');
});


bot.on('guildMemberRemove', member => {
    member.guild.channels.get('347502036692107265').send('**' + member.user.username + '**, has left the server BAI BAI!');
});
bot.login(botSettings.token);