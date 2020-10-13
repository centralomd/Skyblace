const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'start',
	async execute(message, args, client, UserModel, prefix) {
    const req = UserModel.findOne({ user: message.author.id });
    if (!req) {
      const md = new UserModel({
        user: message.author.id
      });
      await md.save().catch(err => console.log('DATABASE SAVING ERROR: ' + err))
  
      const welcome = new MessageEmbed()
        .setAuthor(`Skyblace`, client.user.avatarURL())
        .setTitle('Welcome to Skyblace!')
        .setDescription(
          `Skyblace is a Survival game where you get random items from a generator chest, build, fight, and defend your everything. \n To start gaining items, use \`${prefix}gen\`.`
        )
        .setTimestamp()
      return message.channel.send(welcome);
    };

    /*const items = {
      stone: 0,
      gravel: 0,
      coal: 0,
      iron: 0,
      gold: 0,
      redstone: 0,
      lapis: 0,
      diamond: 0
    }*/
	},
};