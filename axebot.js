const Discord = require('discord.js');
const bot = new Discord.Client();
const DiceRoll = require('roll');
const responses = require('./responses');
const util = require('./utility_functions');

const roll = new DiceRoll();

const TOKEN = require('./token');

const Config = {
  cmdPrefix: '!',
  rollDefault: '1d10'
};

const commands = {
  'test': {
    description: `DO YOU WANT TO KNOW IF I'M WORKING OR NOT?!`,
    process: function(bot, msg, args) {
      msg.channel.sendMessage('**OF COURSE** AXE PASSES THE TEST!');
    }
  },
  'axe': {
    description: `AXE ME A QUESTION`,
    process: function(bot, msg, args) {
      let magicAxeBallAnswers = responses.magicAxeBallAnswers;
      let num = util.randomNumber(magicAxeBallAnswers.length);

      if (msg.content.split(' ').length > 1) {
        msg.channel.sendMessage(magicAxeBallAnswers[num]);
      }
      else {
        msg.reply(`YOU DIDN'T AXE A QUESTION, *FOOL*`);
      }
    }
  },
  'dota': {
    description: `LET ME TELL YOU ABOUT DOTA2`,
    process: function(bot, msg, args) {
      msg.channel.sendMessage('DOTA IS A SHITTY GAME FOR ASSHOLES');
    }
  },
  'roll': {
    description: `AXE CAN ROLL DND STYLE DICE FOR YOU. **THIS IS BELOW AXE'S DIGNITY!**`,
    process: function(bot, msg, args) {
      let rollArgs = args.toLowerCase().split(' ');
      let normalizedRoll = '';
      let theseFucksAreTryingToCrashMe = false;

      rollArgs.forEach((arg) => {
        if (arg.length > 7) {
          theseFucksAreTryingToCrashMe = true;
          return;
        }
        normalizedRoll+=arg;
      });

      if (!theseFucksAreTryingToCrashMe) {
        if (!args) {
          msg.reply(`YOU ROLLED ${roll.roll(Config.rollDefault).result} OUT OF ${Config.rollDefault}`);
        }
        else if (!roll.validate(normalizedRoll)) {
          msg.reply(`**${args.toUpperCase()}** ISN'T SOMETHING YOU CAN ROLL, FANCYMAN!`);
        }
        else {
          let finishedRoll = roll.roll(normalizedRoll);
          let resultsArray = finishedRoll.rolled;
          if (finishedRoll.rolled.length < 500) {
            msg.reply(`YOU ROLLED ${finishedRoll.result} - *(${resultsArray})*`);
          } 
          else {
            msg.reply(`YOU ROLLED ${finishedRoll.result} - *AXE CAN'T SHOW THAT MANY ROLLS!*`);
          }
        } 
      }
      else {
        msg.reply(`ARE YOU *TRYING* TO BREAK THE AXE OF **AXE**!?`);
      }
    }
  }
}

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