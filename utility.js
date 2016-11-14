module.exports = {
  // Generate a random number within a given range
  randomNumber: function(range) {
    return Math.floor(Math.random()*range);
  },
  // Reads files in the 'commands' directory
  //  and then returns a 'commands' object that
  //  is useable by Axebot.
  writeCommands: function() {
    let path = require('path');
    let fs = require('fs');
    let commands = {};

    fs.readdir('commands', (err, files) => {
      if (err) {
        console.log(err);
      }
      else {
        for (let i = 0; i < files.length; i++) {
          let fileName = path.parse(files[i]).name;
          commands[fileName] = require(`./commands/${fileName}`);
        }
      }
    });
    return commands;
  }
};