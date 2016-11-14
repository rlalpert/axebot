module.exports = {
  description: `GIVE AXE YOUR STEAM ID WITH **!register steamidhere** SO I CAN LAUGH AT YOUR PATHETIC GPM`,
  process: function(bot, msg, args) {
    let fs = require('fs');
    let path = require('path');
    let user = msg.author;
    if (!args) {
      msg.reply(`YOU NEED TO GIVE AXE YOUR STEAM ID FOR THAT TO WORK. FOR INSTRUCTIONS, ASK SOMEONE SMARTER.`);
    }
    else {
      let userObject = { "steamid": args };
      let filePath = path.join(__dirname, `../data/${user}.json`);
      fs.writeFile(filePath, JSON.stringify(userObject), (err) => {
        if (err) {
          msg.channel.sendMessage(`SOMETHING ISN'T WORKING!`);
          console.log(`Error -- ${err} -- trying to save ${msg.author}'s Steam ID`);
        }
        else {
          msg.reply(`AXE *SAVES*!`);
        }
      });
    }
  }
};