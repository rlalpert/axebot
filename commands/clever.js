module.exports = {
  description: `AXE IS SKYNET - TEST PHASE IS BUGGY`,
  process: function(bot, msg, args) {
    let secret = require('../secret');
    let CleverBotObj = require('cleverbot.io');
    let cleverbot = new CleverBotObj(secret.cleverBotUser, secret.cleverBotApiKey);
    cleverbot.setNick(require('../config').cleverbotNick);

    cleverbot.create((err, divinethrows) => {
      cleverbot.ask(args, (err, response) => {
        if (!err) {
          msg.reply(response.toUpperCase());
        }
        else {
          console.log(`Error -- ${err} -- encountered when trying to use Cleverbot.`);
          msg.reply(`AXE IS HAVING DIFFICULT EMOTIONAL PROBLEMS RIGHT NOW PLEASE TRY SOMETHING ELSE`);
        }
      });
    });
  }
};