const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = require('./token');

bot.on('ready', () => {
  console.log('AXE IS READY');
});

const magicAxeBallAnswers = [
  'YES, AXE KILLS YOU!',
  'AXE-ACTLY!',
  'YOU MIGHT HAVE BEEN A FANCYMAN IN HEAVEN, BUT DOWN HERE YOU ARE NOTHING NEXT TO AXE!',
  'AXE THINKS SO!',
  'HAH HAH HAH!',
  'AS AXE SEES IT, YES!',
  'AXE THINKS IT\'S LIKELY!',
  'AXE HAS NO TIME FOR SUCH NONSENSE',
  'YES',
  'MY AXE POINTS TO **YES**',
  'AXE IS HAZY! TRY AGAIN!',
  'AXE ME THAT LATER!',
  'AXE CAN\'T TELL YOU THAT!',
  'WHEN THE TIME IS RIGHT!',
  'SHITTY WIZARD!',
  'YOU GET NOTHING!',
  'NO!',
  'NOT THIS TIME!',
  'YOU FOUGHT BADLY - DIED WORSE!',
  'CUT AND RUN!'
];

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
    let num = Math.floor(Math.random()*magicAxeBallAnswers.length);

    if (msg.content.split(' ').length > 1) {
      msg.channel.sendMessage(magicAxeBallAnswers[num]);
    }
    else {
      msg.reply('YOU DIDN\'T AXE A QUESTION, *FOOL*');
    }
  }

});

bot.on('error', e => console.error(e));

bot.login(TOKEN);