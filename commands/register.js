module.exports = {
  description: `GIVE AXE YOUR STEAM ID WITH **!register steamidhere** SO I CAN LAUGH AT YOUR PATHETIC GPM`,
  process: function(bot, msg, args) {
    let fs = require('fs');
    let path = require('path');
    let user = msg.author;
    let filePath = path.join(__dirname, `../data/${user}.json`);

    if (!args) {
      fs.readFile(filePath, (err, data) => {
        if (err && err.code === 'ENOENT') { 
          msg.reply(`YOU NEED TO GIVE AXE YOUR STEAM ID FOR THAT TO WORK! IF YOU NEED HELP, AS SOMEONE SMARTER`); 
        }
        else if (!err) {
          let userObject = JSON.parse(data);
          if (userObject.steamid) {
            currentId = userObject.steamid;
            msg.reply(`AXE ALREADY REGISTERED YOU WITH ${userObject.steamid}`);
          }
        }
      });
    }
    else {
      let userObject = { "steamid": args };
      
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