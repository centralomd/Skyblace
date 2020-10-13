const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'gen',
	async execute(message, args, client, UserModel, prefix) {
    const req = UserModel.findOne({ id: message.author.id });
    if (!req) return message.channel.send(`${message.author} | You have never started playing yet! Start with \`${prefix}start\`!`);

    const items = ['stone', 'gravel', 'coal', 'iron', 'gold', 'redstone', 'lapis', 'diamond']

    const r1 = items[Math.floor(Math.random() * items.length)];
    const r2 = items[Math.floor(Math.random() * items.length)];
    const r3 = items[Math.floor(Math.random() * items.length)];

    UserModel.findOne({ user: message.author.id }, (err, umodel) => {
      if (err) console.log(err);

      umodel.money = umodel.money + 200
      umodel.save().catch(err => console.log(err));
    })
    //UserModel.findOneAndUpdate({ id: message.author.id }, { $inc: { inventory: { r2: 1 } } });
    //UserModel.findOneAndUpdate({ id: message.author.id }, { $inc: { inventory: { r3: 1 } } });

    const get = new MessageEmbed()
      .setAuthor(`Skyblace`, client.user.avatarURL())
      .setTitle('Generator')
      .setDescription(`You received: \n \n ${r1} \n ${r2} \n ${r3}`)
      .setTimestamp()
    //return message.channel.send(get);
	},
};