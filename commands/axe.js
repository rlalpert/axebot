module.exports = {
  description: `AXE ME A QUESTION`,
  process: function(bot, msg, args) {
    let magicAxeBallAnswers = require('../responses').magicAxeBallAnswers;
    let i = require('../utility').randomNumber(magicAxeBallAnswers.length);

    if (msg.content.split(' ').length > 1) {
      msg.channel.sendMessage(magicAxeBallAnswers[i]);
    }
    else {
      msg.reply(`YOU DIDN'T AXE A QUESTION, *FOOL*`);
    }
  }
};