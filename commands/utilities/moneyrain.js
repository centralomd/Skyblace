const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'moneyrain',
  aliases: ['mnr', 'mrb'],
  async execute(message, args, client, CurrencyShop, Op, allplayer) {
    allplayer.add(message.author.id, 40000);
    message.channel.send("OMG! Gold is falling out of the sky! You got 40,000 gold. <:goldingot:799261582118354944>");
  },
};