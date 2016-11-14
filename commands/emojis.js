module.exports = {
  description: `LIST SERVER EMOJIS`,
  process: function(bot, msg, args) {
    let emojis = bot.emojis;
    let list = '';
    emojis.forEach((emoji) => {
      list += `${emoji} -- ${emoji.id}\n`;
    });
    msg.channel.sendMessage(list);
  }
}