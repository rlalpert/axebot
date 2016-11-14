module.exports = {
  description: `LET ME TELL YOU ABOUT DOTA2`,
  process: function(bot, msg, args) {
    let dotaFeelings = require('../responses').dotaFeelings;
    let i = require('../utility_functions').randomNumber(dotaFeelings.length);
    msg.channel.sendMessage(dotaFeelings[i]);
  }
}