const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () =>{
    console.log('This bot is online!') 

    client.user.setActivity('with A BanHammer') // Set bot to idle status
})

client.on('message', message =>{

    //Variables
    var sender = message.author; //The person who sent the message
    var msg = message.content.toLowerCase(); //Takes the message and makes it all upercase
    var msg_length = message.content.length; //Takes the length of the message
    var msg_length_mod = msg.slice(1,msg_length); // Removes the first character of the string
    var exclamation_pos = msg_length_mod.indexOf('!'); //Finds the index of the first exclamation point of msg_length_mod
    var last_exclamation_pos = msg.lastIndexOf('!'); //Finds the index of the last exclamation point of msg
    var exclamation_point = 'true'; // Exclamation point tester
    var prefix_exclamation_point = []; //List for exclamation points in bot prefixes
    var mention = message.mentions.users.first(); //Searches for the first @mentions in a message 
    var bot_prefix = ['!', '-','<@']; //Bot Prefixes
    var prefix = 'mb!' // Prefix for bot

    if (msg.startsWith(prefix + ' ping')) { //Responds to command when prefix is used with ping
        message.reply('Hi, Moderation_bot is online!') //Responds with "Hi, Moderation_bot is online!" when prefix with "ping" is used
    }

    if (msg.startsWith(prefix + ' kick ')) { //Checks if message starts with prefix and has "kick"
        if (sender.hasPermission('ADMINISTRATOR')) {//Checks if the author has admin
            var member = msg.mentions.members.first(); //Creates a variable that saves the first mention in message
            member.kick().then(() => { //Kicks the first mention and then the code below activites
                if (sender != member) { //Checks if the user kicked is not the author
                    msg.channel.send(member.displayName + ' has successfully been kicked by ' + sender) //If successful messages the user "has been successfully kicked"
                }
            }).catch(e => { //If it falls the code below activates
                msg.channel.send("An error occured") //Messages the kick has been unsuccessful and an error has occured
            });
        }
    }

    if (msg.startsWith(prefix + ' ban ')) { //Checks if message contains the prefix and "ban" to activate the rest of the code
        if (sender.hasPermission('ADMINISTRATOR')) { //checks if the author is an admin    
            var member = msg.mentions.members.first(); //Creates a variable for the first mention in a message if prefix + "ban" is used
            var mc = msg.content.split(" ")[2]; 
            member.ban(mc).then(() => { //Bans the first mention and then the rest of the code below activates
                if (sender != member) { //Checks if the user banned is not the author
                    msg.channel.send(member.displayName + ' has successfully been hit with the Ban Hammer by ' + sender + 'for ' + mc + ' days') //Message if the ban has been successful with the message user "has been successfully hit by the ban hammer by " author
                }
            }).catch(e => { //Catches the instance a ban fails
                msg.channel.send('An error occured') //Messages if the ban has been unsuccessful with "An error occured"
            });
        }
    }

    if (msg.startsWith(prefix + ' purge')) { //checks if message starts with prefix and "purge" if so the code below activites
        if (sender.hasPermission('ADMINISTRATOR')) { //Checks if the author is an admin
            var mc = msg.content.split(" ")[1]; 
            msg.channel.bulkDelete(mc); //Deletes message by the number from mc
        }
    }

    if (msg.startsWith(prefix + ' setprefix')) { //Checks if the message starts with prefix and "setprefix" if so the code below will commence
        if (sender.hasPermission('ADMINISTRATOR')) { //Checks if the authro is an admin
            var new_prefix = msg.content.split(" ")[1];
            prefix = new_prefix;
        }
    }

    if (msg.startsWith(prefix + ' help')) { //Checks if the message starts with prefix and "help" if so code below continues
        let embed = new Discord.MessageEmbed()

        embed.setTitle('Commands')
        embed.setAuthor('Moderation Bot')
        embed.setColor('#3EEAEE')
        embed.setDescription(prefix + ' help: Find the commands this bot uses \n' + prefix + ' kick "user": Kicks the "user" \n' + prefix + ' ban "user" "# of days": Bans the "user" for "# of days" \n' + prefix + ' purge "# of lines": Deletes "# of lines" from the most recent messages \n' + prefix + ' ping: Receive a message from the Moderation Bot :) \n' + prefix + ' setprefix: Changes the prefix this bot uses')
        embed.setFooter('Powered By Admin Magic')

        message.channel.send(embed)
    }

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
    if (foundInText == false) {
        if (mention != null) return;
    }

    if (process.env.maintain == 'on') {
        if (foundInText) {
            message.delete();
        }
    }

});

client.login(process.env.token); 