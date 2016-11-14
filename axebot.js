const Discord = require('discord.js');
const bot = new Discord.Client();
// const DiceRoll = require('roll');
// const responses = require('./responses'); 
// const util = require('./utility_functions');
const secret = require('./secret');
const fs = require('fs');
const path = require('path');
const request = require('request');

const STEAM_DEVKEY = secret.steamDevKey;

const Config = require('./config');


// Reads files in the 'commands' directory
//  and then returns a 'commands' object that
//  is useable by Axebot.
function writeCommands() {
  let commands = {};
  fs.readdir('commands', (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      for (let i = 0; i < files.length; i++) {
        let fileName = path.parse(files[i]).name;
        commands[fileName] = require(`./commands/${fileName}`);
      }
    }
  });
  return commands;
}

const commands = writeCommands();

// const commands = {
//   'matches': {
//     description: `AXE LAUGHS AT YOUR LAST 5 PITIFUL DOTA MATCHES`,
//     process: function(bot, msg, args) {
//       let user = msg.author;
//       fs.readFile(`./data/${user}.json`, (err, data) => {
//         if (err) {
//           if (err.code === 'ENOENT') {
//             msg.reply(`AXE NEEDS YOUR STEAM ID. USE **!register** TO FEEL THE AXE OF *AXE*!`);
//           }
//           else {
//             msg.reply(`THIS ISN'T WORKING FOR AXE!`);
//             console.log(`Error -- ${err} -- trying to get match history for ${user}`);
//           }
//         }
//         else {
//           let info = JSON.parse(data);
//           let steamId = info.steamid;
//           request.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=${secret.steamDevKey}&account_id=${steamId}`, (err, response, body) => {
//               console.log(response.statusCode);
//               if (err) {
//                 console.log(err);
//               }
//               else {
//                 let parsedData = JSON.parse(body);
//                 let results = parsedData.result.matches;
//                 let string = '';
//                 for (let i = 0; i < 5; i++) {
//                   string += `http://www.dotabuff.com/matches/${results[i].match_id}\n`;
//                 }
//                 msg.channel.sendMessage(string);
//               }
//           }); 
//         }
//       });
//     }
//   }
// }

bot.on('ready', () => {
  console.log('AXE IS READY');
});

bot.on('message', msg => {

  if (!msg.author.bot && (msg.content[0] === Config.cmdPrefix)) {
    let command = msg.content.split(' ')[0].substring(1).toLowerCase();
    let args = msg.content.substring(command.length+2);

    console.log(`Processing ${command} command from ${msg.author}.`);

    let cmd = commands[command];

    if (command == 'help') {
      let str = '';
      for (key in commands) {
        str += `**!${key}** -- ${commands[key].description}\n`;
      }
      msg.channel.sendMessage(str);
    }
    else if (cmd) {
      try {
        cmd.process(bot, msg, args);
      }
      catch (e) {
        msg.reply(`*I'm sorry, I can't do that, Dave...*`);
        console.log(`There was an error -- ${e} -- processing ${command} command from ${msg.author}.`);
      }
    }
    else {
      msg.reply(`AXE CAN'T DO THAT! TRY **!help** TO SEE WHAT I CAN DO`);
    }
  }

});

bot.on('error', e => console.error(e));

bot.login(secret.botToken);