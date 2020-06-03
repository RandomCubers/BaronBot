const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () =>{
    console.log('This bot is online!') 

    bot.user.setActivity('idle') // Set bot to idle status
})

client.on('message', message =>{

    //Variables
    var sender = message.author; //The person who sent the message
    var msg = message.content.toLowerCase(); //Takes the message and makes it all upercase
    var msg_length = message.content.length; //Takes the length of the message
    var msg_length_mod = msg.slice(1,msg_length); // Removes the first character of the string
    var exclamation_pos = msg_length_mod.indexOf('!'); //Finds the index of the first exclamation point of msg_length_mod
    var last_exclamation_pos = msg.lastIndexOf('!'); //Finds the index of the last exclamation point of msg
    var prefix = ['Bad!']; //Prefix for this bot
    var bot_prefix = ['!', '-','<@']; //Bot Prefixes
    var exclamation_point = 'true'; // Exclamation point tester
    var prefix_exclamation_point = []; //List for exclamation points in bot prefixes
    var mention = message.mentions.users.first(); //Searches for the first @mentions in a message 


    for (var i in bot_prefix) { //Searches through the bot_prefixes
        if (bot_prefix[i].indexOf('!') != -1) { //Locates the last exclamation point in bot_prefixes
            prefix_exclamation_point.push(bot_prefix[i].lastIndexOf('!')); //If there is a ! add the index to prefix_exclamation_point
        } else {
            prefix_exclamation_point.push('0'); //If there is no instance of ! after the first character add '0' to prefix_exclamation_point
        }
    }

    //Ingores Bot Messages and Other Bot Pings
    if (message.author.bot) return; // Cancels the rest of the "listening event"
    
    for (var i in bot_prefix) {
        if (msg_length != 1) {
            if (last_exclamation_pos == prefix_exclamation_point[i]) {
                if (msg.startsWith(bot_prefix[i])) {
                    exclamation_point = 'false';
                    return;
                }
            }
        }
    }
    // Declares the blacklisted exclamation point
    let blacklisted = ['!','¡', '！']
    
    //Checks and remove the exclamation point
    let foundInText = false;

    if (exclamation_pos != -1) foundInText = true;

    for (var i in blacklisted) {
        if (msg.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (mention != null) return;

    if (foundInText) {
        message.delete();
    }

});

client.login(process.env.token); 