const Discord = require('discord.js');
const secret = require('./secret');
const utility = require('./utility');
const fs = require('fs');
const request = require('request');

const bot = new Discord.Client();
const Config = require('./config');

const commands = utility.writeCommands();

bot.on('ready', () => {
  console.log('AXE IS READY');
  // sendRedditPosts();        // uncomment if you want to post on startup
  setInterval(sendRedditPosts, 1000 * 60 * 60 * 24);
});

bot.on('message', (msg) => parseMessages(msg));

bot.on('error', e => console.error(e));

bot.login(secret.botToken);

function sendRedditPosts() {
  postReddit('cute_animals', 'aww', 5, false);
  postReddit('dota', 'dota2', 3, true);
  postReddit('butts_and_dragons', 'dnd', 3, true);
}

function postReddit(postChannel, subReddit, postLimit, permalink) { // set permalink to TRUE to link to reddit post
  let channel = bot.channels.find('name', postChannel);
  try {
    channel.sendMessage(`AXE CALLS TODAY'S TOP ${postLimit} FROM R/${subReddit.toUpperCase()} TO BATTLE:`);
    request.get(`https://www.reddit.com/r/${subReddit}/top.json?limit=${postLimit}&t=day`, (err, response, body) => {
      if (err) { console.log (err); }
      else {
        let parsedData = JSON.parse(body);
        parsedData.data.children.forEach((post) => {
          if (!permalink)
            channel.sendMessage(`${post.data.url}`);
          else
            channel.sendMessage(`https://www.reddit.com${post.data.permalink}`);
        });
      }
    });
  }
  catch (e) {
    console.log(`There was an error ${e} posting to ${postChannel}`);
  }
}

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
  }
}