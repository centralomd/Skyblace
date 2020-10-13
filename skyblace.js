// Packaging
const Discord = require('discord.js');
const walk = require('walk'); 
const fs = require("fs");
const UserModel = require('./models/user');
const { resolve } = require("path");
const { connect } = require('mongoose');

// Setup Stuffs
const client = new Discord.Client();
const prefix = 's;'
const mongoPath = 'mongodb+srv://centralomd:R1egyk19efIrKBBS@cluster0.f50iq.mongodb.net/Skyblace?retryWrites=true&w=majority';

// Setup
client.commands = new Discord.Collection();
client.categories = new Discord.Collection();

const walker = walk.walk("./commands");

walker.on("file", function (root, stats, next) {
  if (!stats.name.endsWith(".js")) return;
  const category = resolve(root).split("\\").slice(-1)[0];
  if (!client.categories.has(category)) {
    client.categories.set(category, []);
  }

  let props = require(`${resolve(root)}/${stats.name}`);
  let commandName = stats.name.split(".")[0];
  console.log(`Attempting to load command ${commandName}`);

  client.commands.set(commandName, props);

  client.categories.set(category, [
    ...client.categories.get(category),
    commandName,
  ]);

  next();
});

client.once('ready', async () => {
  console.log(`${client.user.username} is online and running! With:\n Username: ${client.user.username}`)
  client.user.setPresence({ activity: { name: `${client.users.cache.size} users | BETA v0`, type: "WATCHING" }, status: 'online' })
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    if (message.channel.type === 'dm') return;

    try {
        command.execute(message, args, client, UserModel, prefix);
    } catch (error) {
        console.error(error);
        console.log(`Execution of Command (${commandName}) has failed at ${new Date().getTime()} with the error: \n ${error} \n Executed by ${message.author.tag} with ID of ${message.author.id}.`)
    
        const executionfailure = new MessageEmbed()
          .setColor('#FC352C')
          .setTitle('Error')
          .setDescription('Bug Found.')
          .addFields(
            { name: '\u200b', value: `\u200b` },
            { name: 'Command Ran', value: `${commandName}` },
            { name: 'Error Info', value: `${error}` },
            { name: 'Executed At', value: `${new Date().getTime()}` },
            { name: 'Executer', value: `${message.author.tag}` },
          )
          .setTimestamp()
    
        message.channel.send(executionfailure);
    }
});

connect(mongoPath, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, connection) => {
  if (err) return console.log(`MONGODB DATABASE CONNECTION ERROR: \n \n ${err}`);
  console.log('202: MONGODB DATABASE SUCCESSFULLY CONNECTED.')
});
client.login('NzIwNjMyODk0MDYxNTQzNDM0.XuIzrg.fIIO4xh3RYD7DiSS9uE8-u-uGhk');