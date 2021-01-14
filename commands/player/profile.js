const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'profile',
  aliases: ['p'],
  async execute(message, args, client, CurrencyShop, Op, allplayer) {
    const target = message.mentions.users.first() || message.author;
    await message.channel.startTyping();
    //const getRandomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

    const profileembed = new MessageEmbed()
      .setColor("#1ECF81")
      .setAuthor(`Profile`, target.displayAvatarURL({ dynamic: true }))
      .setTitle(`${target.username}`)
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))

    var levelpercent = Math.round((allplayer.getXP(target.id) / (allplayer.getLevel(target.id) * (63 + (allplayer.getLevel(target.id) * 37)))) * 100);

    if (levelpercent < 11 && levelpercent >= 0) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[□□□□□□□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 21 && levelpercent > 10) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■□□□□□□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 31 && levelpercent > 20) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■□□□□□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 41 && levelpercent > 30) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■□□□□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 51 && levelpercent > 40) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■■□□□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 61 && levelpercent > 50) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■■■□□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 71 && levelpercent > 60) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■■■■□□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 81 && levelpercent > 70) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■■■■■□□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 91 && levelpercent > 80) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■■■■■■□□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    } else if (levelpercent < 100 && levelpercent > 90) {
      profileembed.addField(`**Level** ${allplayer.getLevel(target.id)}`, `[■■■■■■■■■□](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
    };

    profileembed.addFields(
      { name: `**STATS**`, value: `<:goldingot:799261582118354944> **Gold**: ${allplayer.getBalance(target.id)}\n<:clockmcst:799263469797900289> **Time Travels**: ${allplayer.getTT(target.id)}` },
      { name: `**ARMOR**`, value: `<:leatherhat:799233429740322836> ${allplayer.getHelmet(target.id)}\n<:leatherchest:799233429690515456> ${allplayer.getChestplate(target.id)}\n<:leatherleg:799233429597192192> ${allplayer.getLeggings(target.id)}\n<:leatherboot:799233429543452683> ${allplayer.getBoots(target.id)}` }
    );

    setTimeout(() => {
      message.channel.stopTyping();
      message.channel.send(profileembed);
    }, 3000);
  },
};