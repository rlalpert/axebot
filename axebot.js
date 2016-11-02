const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = require('./token');

bot.on('ready', () => {
  console.log('AXE IS READY');
});

const responseObject = {
  'test': 'FEEL THE AXE OF AXE!',
  'help': 'AXE CAN\'T HELP **YOU**!',
  'dota': 'DOTA IS A SHITTY GAME FOR ASSHOLES',
  'commands': '**!ask** - AXE ME A QUESTION!'
};

bot.on('message', msg => {

  let prefix = '!';

  if (!msg.content.startsWith('!')) return;
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefix + 'test')) {
    msg.reply('FEEL THE AXE OF AXE!');
  }

  else if (msg.content.startsWith(prefix + 'help')) {
    msg.reply('AXE CAN\'T HELP YOU!');
  }

  else if (msg.content.startsWith(prefix + 'dota')) {
    msg.channel.sendMessage('DOTA IS A SHITTY GAME FOR ASSHOLES');
  }

  else if (msg.content.startsWith(prefix + 'commands')) {
    msg.channel.sendMessage('**!ask** -- AXE ME A QUESTION!');
  }

  else if (msg.content.startsWith(prefix + 'ask')) {
    msg.channel.sendMessage('AXE CAN\'T DO THAT YET!!!');
  }
  
});

bot.on('error', e => console.error(e));

bot.login(TOKEN);