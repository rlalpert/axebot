const Discord = require('discord.js');
const bot = new Discord.Client();
const DiceRoll = require('roll');
const responses = require('./responses');
const util = require('./utility_functions');
const secret = require('./secret');
const CleverBotObj = require('cleverbot.io');
const fs = require('fs');
const path = require('path');
const request = require('request');

const TOKEN = secret.botToken;
const STEAM_DEVKEY = secret.steamDevKey;
const cleverbot = new CleverBotObj(secret.cleverBotUser, secret.cleverBotApiKey);

const Config = {
  cmdPrefix: '!',
  rollDefault: '1d10',
  cleverbotNick: 'divinethrows'
};

cleverbot.setNick(Config.cleverbotNick);

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
//   'axe': {
//     description: `AXE ME A QUESTION`,
//     process: function(bot, msg, args) {
//       let magicAxeBallAnswers = responses.magicAxeBallAnswers;
//       let i = util.randomNumber(magicAxeBallAnswers.length);

//       if (msg.content.split(' ').length > 1) {
//         msg.channel.sendMessage(magicAxeBallAnswers[i]);
//       }
//       else {
//         msg.reply(`YOU DIDN'T AXE A QUESTION, *FOOL*`);
//       }
//     }
//   },
//   'dota': {
//     description: `LET ME TELL YOU ABOUT DOTA2`,
//     process: function(bot, msg, args) {
//       let dotaFeelings = responses.dotaFeelings;
//       let i = util.randomNumber(dotaFeelings.length);
//       msg.channel.sendMessage(dotaFeelings[i]);
//     }
//   },
//   'roll': {
//     description: `AXE CAN ROLL DND STYLE DICE FOR YOU. **THIS IS BELOW AXE'S DIGNITY!**`,
//     process: function(bot, msg, args) {
//       let roll = new DiceRoll();
//       let rollArgs = args.toLowerCase().split(' ');
//       let normalizedRoll = '';
//       let theseFucksAreTryingToCrashMe = false;

//       rollArgs.forEach((arg) => {
//         if (arg.length > 7) {
//           theseFucksAreTryingToCrashMe = true;
//           return;
//         }
//         normalizedRoll+=arg;
//       });

//       if (!theseFucksAreTryingToCrashMe) {
//         if (!args) {
//           msg.reply(`YOU ROLLED ${roll.roll(Config.rollDefault).result} OUT OF ${Config.rollDefault}`);
//         }
//         else if (!roll.validate(normalizedRoll)) {
//           msg.reply(`**${args.toUpperCase()}** ISN'T SOMETHING YOU CAN ROLL, FANCYMAN!`);
//         }
//         else {
//           let finishedRoll = roll.roll(normalizedRoll);
//           let resultsArray = finishedRoll.rolled;
//           if (finishedRoll.rolled.length < 500) {
//             msg.reply(`YOU ROLLED ${finishedRoll.result} - *(${resultsArray})*`);
//           } 
//           else {
//             msg.reply(`YOU ROLLED ${finishedRoll.result} - *AXE CAN'T SHOW THAT MANY ROLLS!*`);
//           }
//         } 
//       }
//       else {
//         msg.reply(`ARE YOU *TRYING* TO BREAK THE AXE OF **AXE**!?`);
//       }
//     }
//   },
//   'emojis': {
//     description: `LIST SERVER EMOJIS`,
//     process: function(bot, msg, args) {
//       let emojis = bot.emojis;
//       let list = '';
//       emojis.forEach((emoji) => {
//         list += `${emoji} -- ${emoji.id}\n`;
//       });
//       msg.channel.sendMessage(list);
//     }
//   },
//   'clever': {
//     description: `AXE IS SKYNET - TEST PHASE IS BUGGY`,
//     process: function(bot, msg, args) {
//       cleverbot.create((err, divinethrows) => {
//         cleverbot.ask(args, (err, response) => {
//           if (!err) {
//             msg.reply(response.toUpperCase());
//           }
//           else {
//             console.log(`Error -- ${err} -- encountered when trying to use Cleverbot.`);
//             msg.reply(`AXE IS HAVING DIFFICULT EMOTIONAL PROBLEMS RIGHT NOW PLEASE TRY SOMETHING ELSE`);
//           }
//         });
//       });
//     }
//   },
//   'register': {
//     description: `GIVE AXE YOUR STEAM ID WITH **!register steamidhere** SO I CAN LAUGH AT YOUR PUNY, TRUMPISH GPM`,
//     process: function(bot, msg, args) {
//       let user = msg.author;
//       if (!args) {
//         msg.reply(`YOU NEED TO GIVE AXE YOUR STEAM ID FOR THAT TO WORK. FOR INSTRUCTIONS, ASK SOMEONE SMARTER.`);
//       }
//       else {
//         let userObject = { "steamid": args };
//         fs.writeFile(`./data/${user}.json`, JSON.stringify(userObject), (err) => {
//           if (err) {
//             msg.channel.sendMessage(`SOMETHING ISN'T WORKING!`);
//             console.log(`Error -- ${err} -- trying to save ${msg.author}'s Steam ID`);
//           }
//           else {
//             msg.reply(`AXE *SAVES*!`);
//           }
//         });
//       }
//     }
//   },
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

bot.login(TOKEN);