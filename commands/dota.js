module.exports = {
  description: `LET ME TELL YOU ABOUT DOTA2`,
  process: function(bot, msg, args) {
    let dotaFeelings = require('../responses').dotaFeelings;
    let i = require('../utility').randomNumber(dotaFeelings.length);
    msg.channel.sendMessage(dotaFeelings[i]);
  }
};