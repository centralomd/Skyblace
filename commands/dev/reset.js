const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'start',
	async execute(message, args, client, UserModel, prefix) {
    const req = UserModel.findOne({ user: message.author.id });
    if (!req) return message.channel.send(`${message.author} | You have never started playing yet! Start with \`${prefix}start\`!`);

    UserModel.deleteOne({ user: message.author.id })
    .then(function(){ 
      message.channel.send('Data reset.')
      console.log("Data deleted"); // Success
    }).catch(function(error){ 
      console.log(error); // Failure 
    }); 
	},
};