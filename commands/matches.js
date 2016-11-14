module.exports = {
  description: `AXE LAUGHS AT YOUR LAST 5 PITIFUL DOTA MATCHES`,
  process: function(bot, msg, args) {
    let path = require('path');
    let fs = require('fs');
    let request = require('request');
    let steamDevKey = require('../secret').steamDevKey;

    let user = msg.author;

    let filePath = path.join(__dirname, `../data/${user}.json`);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          msg.reply(`AXE NEEDS YOUR STEAM ID. USE **!register** TO FEEL THE AXE OF *AXE*!`);
        }
        else {
          msg.reply(`THIS ISN'T WORKING FOR AXE!`);
          console.log(`Error -- ${err} -- trying to get match history for ${user}`);
        }
      }
      else {
        let info = JSON.parse(data);
        let steamId = info.steamid;
        request.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=${steamDevKey}&account_id=${steamId}`, (err, response, body) => {
            console.log(`Steam response - ${response.statusCode}`);
            if (err) {
              console.log(err);
            }
            else {
              let parsedData = JSON.parse(body);
              let results = parsedData.result.matches;
              let string = '';
              for (let i = 0; i < 5; i++) {
                string += `http://www.dotabuff.com/matches/${results[i].match_id}\n`;
              }
              msg.channel.sendMessage(string);
            }
        }); 
      }
    });
  }
}