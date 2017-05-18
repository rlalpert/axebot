module.exports = {
  description: `AXE LAUGHS AT YOUR LAST 5 PITIFUL DOTA MATCHES`,
  process: function(bot, msg, args) {
    let path = require('path');
    let fs = require('fs');
    let request = require('request');
    let convertor = require('steam-id-convertor');
    let steamDevKey = require('../secret').steamDevKey;

    let user = setUser();

    function setUser() {
      let arr = args.split(' ');
      if (!args) {
        return msg.author;
      }
      else { 
        console.log(`Attempting to get match history for ${arr[0]}`);
        return arr[0]; 
      }
    }

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
        try {
          request.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=${steamDevKey}&account_id=${steamId}&matches_requested=5`, (err, response, body) => {
              console.log(`Steam response - ${response.statusCode}`);
              if (err) {
                console.log(err);
              }
              else if (response.statusCode === 200) {
                let parsedData = JSON.parse(body);
                let results = parsedData.result.matches;
                let steamId32 = convertor.to32(steamId);

                for (let i = 0; i < results.length; i++) {
                  try {
                    let match = results[i].match_id;

                    request.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=${match}&key=${steamDevKey}`, (e, res, data) => {
                      if (e) { console.log(e) }
                      else if (response.statusCode === 200) {
                        let matchDetails = JSON.parse(data);
                        let winner = '';
                        let playerDetails;
                        let playerTeam = '';
                        let playerWin = '';

                        function getPlayerDetails() {
                          matchDetails.result.players.forEach((player) => {
                            if (parseInt(player.account_id) === parseInt(steamId32)) {
                              playerDetails = player;
                              // console.log(typeof playerDetails.player_slot);
                            }
                          });

                        }
                        getPlayerDetails();
                        // console.log(playerDetails.account_id);
                          if (matchDetails.result.radiant_win) { 
                            winner = 'Radiant';
                          }
                          else {
                            winner = 'Dire';
                          }

                          if (playerDetails.player_slot.toString().length === 3) {
                            playerTeam = 'Dire'
                          }
                          else {
                            playerTeam = 'Radiant'
                          }

                          if (winner === playerTeam) {
                            playerWin = 'Victory!';
                          }
                          else {
                            playerWin = 'DEFAT';
                          }

                        msg.channel.sendMessage(`<http://www.dotabuff.com/matches/${match}> -- **${playerWin}**`);

                      }
                      else {
                        msg.reply(`COULDN'T FINISH GETTING YOUR MATCHES. GABEN SHOULD FEAR THE AXE OF AXE!`);
                        return;
                      }
                    });
                  }
                  catch (e) {
                    msg.reply(`AXE COULDN'T GET YOUR MATCHES!`);
                    console.log(`Encountered error -- ${e} -- when attempting to retrieve matches for ${msg.author}`);
                  }
                }
              }
              else {
                msg.reply(`AXE CAN'T GET YOUR MATCHES RIGHT NOW!`);
              }
          }); 
        }
        catch (e) {
          msg.reply(`AXE COULDN'T GET YOUR MATCHES!`);
          console.log(`Encountered error -- ${e} -- when attempting to retrieve matches for ${msg.author}`);
        }
      }
    });
  }
}