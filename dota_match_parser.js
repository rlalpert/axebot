module.exports = function(steamId, msg) {
  let request = require('request');
  let secret = require('./secret');

  let string = '';

  function getMatches() {
    request.get(`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=${secret.steamDevKey}&account_id=${steamId}`, (err, response, body) => {
        if (err) {
          console.log(err);
        }
        else {
          let parsedData = JSON.parse(body);
          let results = parsedData.result.matches;
          for (let i = 0; i < 5; i++) {
            string += results[i].match_id + '\n';
            console.log(`${results[i].match_id}`);
          }
        }
    });   
  }

  getMatches();
  return string;

};