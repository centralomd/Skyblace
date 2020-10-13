const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'test',
	async execute(message, args, client, UserModel, prefix) {
    const req = UserModel.findOne({ id: message.author.id });
    if (!req) return message.channel.send(`${message.author} | You have never started playing yet! Start with \`${prefix}start\`!`);
  
    console.log(req);
    console.log(req.money)
	},
};