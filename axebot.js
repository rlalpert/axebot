const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = require('./token');

const magicAxeBallAnswers = require('./magicAxeBallAnswers');

const Config = {
  cmdPrefix: '!'
};

const commands = {
  'test': {
    description: 'DO YOU WANT TO KNOW IF I\'M WORKING OR NOT?!',
    process: function(bot, msg, args) {
      msg.channel.sendMessage('**OF COURSE** AXE PASSES THE TEST!');
    }
  },
  'axe': {
    description: 'AXE ME A QUESTION',
    process: function(bot, msg, args) {
      let num = Math.floor(Math.random()*magicAxeBallAnswers.length);

      if (msg.content.split(' ').length > 1) {
        msg.channel.sendMessage(magicAxeBallAnswers[num]);
      }
      else {
        msg.reply('YOU DIDN\'T AXE A QUESTION, *FOOL*');
      }
    }
  },
  'dota': {
    description: 'LET ME TELL YOU ABOUT DOTA2',
    process: function(bot, msg, args) {
      msg.channel.sendMessage('DOTA IS A SHITTY GAME FOR ASSHOLES');
    }
  }
}

bot.on('ready', () => {
  console.log('AXE IS READY');
});

bot.on('message', msg => {

  if (!msg.author.bot && (msg.content[0] === Config.cmdPrefix)) {
    let command = msg.content.split(' ')[0].substring(1);
    let args = msg.content.substring(command.length+2);

    console.log(`Processing ${command} command from ${msg.author}.`);

    let cmd = commands[command];

    if (command == 'help') {
      for (key in commands) {
        let str = `**!${key}** -- ${commands[key].description}`;
        msg.channel.sendMessage(str);
      }
    }
    else if (cmd) {
      cmd.process(bot, msg, args);
    }
    else {
      msg.reply('AXE CAN\'T DO THAT!');
    }
  }

});

bot.on('error', e => console.error(e));

bot.login(TOKEN);