const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'inv',
	async execute(message, args, client, UserModel, prefix) {
    const umodel = UserModel.findOne({ id: message.author.id });
      if (!umodel) return message.channel.send(`${message.author} | You have never started playing yet! Start with \`${prefix}start\`!`);

      const inventory = new MessageEmbed()
        .setAuthor(`Skyblace`, client.user.avatarURL())
        .setTitle('Your Inventory')
        .setDescription(`${umodel.money}`)
        .setTimestamp()
      return message.channel.send(inventory);
	},
};