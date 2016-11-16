const Discord = require('discord.js');
const secret = require('./secret');
const utility = require('./utility');
const fs = require('fs');

const bot = new Discord.Client();
const Config = require('./config');

const commands = utility.writeCommands();

bot.on('ready', () => {
  console.log('AXE IS READY');
});

const markovListener = fs.createWriteStream('./data/markov.txt', {flags: 'a'});

bot.on('message', (msg) => parseMessages(msg));

bot.on('error', e => console.error(e));

bot.login(secret.botToken);

function parseMessages(msg) {
  if (!msg.author.bot) {
    if (msg.content[0] === Config.cmdPrefix) {
      let command = msg.content.split(' ')[0].substring(1).toLowerCase();
      let args = msg.content.substring(command.length+2);

      console.log(`Processing ${command} command from ${msg.author}.`);

      let cmd = commands[command];

      if (command == 'help') {
        let str = '';
        for (key in commands) {
          str += `**${Config.cmdPrefix}${key}** -- ${commands[key].description}\n`;
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
    else {
      markovListener.write(`${msg.content}\n`);
    }
  }
}