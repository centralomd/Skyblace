const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'start',
  aliases: ['begin', 'create'],
  async execute(message, args, client, CurrencyShop, Op, allplayer) {
    const target = message.author.id;
    message.channel.send(`Welcome to Skyblace, ${message.author}! Your data is being prepared.`);
    allplayer.addLvl(target, 1);
    allplayer.addXP(target, 0);
    allplayer.addHelmet(target, "None");
    allplayer.addChestplate(target, "None");
    allplayer.addLeggings(target, "None");
    allplayer.addBoots(target, "None");
    allplayer.incTT(target, 0);
  },
};