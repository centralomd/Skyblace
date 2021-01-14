const fs = require('fs');
const Discord = require('discord.js');
const prefix = 'sb '
const { walk } = require('walk');
const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const allplayer = new Discord.Collection();

client.commands = new Collection();
client.categories = new Collection();

const walker = walk('./commands');

walker.on('file', function (root, stats, next) {
  if (!stats.name.endsWith('.js')) return;
  const category = resolve(root)
    .split('\\')
    .slice(-1)[0];
  if (!client.categories.has(category)) {
    client.categories.set(category, []);
  }

  let props = require(`${resolve(root)}/${stats.name}`);
  let commandName = stats.name.split('.')[0];
  console.log(`Attempting to load command ${commandName}`);

  client.commands.set(commandName, props);

  client.categories.set(category, [
    ...client.categories.get(category),
    commandName
  ]);

  next();
});

Reflect.defineProperty(allplayer, 'add', {
  /* eslint-disable-next-line func-name-matching */
  value: async function add(id, amount) {
    const user = allplayer.get(id);
    if (user) {
      user.balance += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, balance: amount });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'addLvl', {
  /* eslint-disable-next-line func-name-matching */
  value: async function addLvl(id, amount) {
    const user = allplayer.get(id);
    if (user) {
      user.level += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, level: amount });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'addXP', {
  /* eslint-disable-next-line func-name-matching */
  value: async function addXP(id, amount) {
    const user = allplayer.get(id);
    if (user) {
      user.xp += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, xp: amount });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'addHelmet', {
  /* eslint-disable-next-line func-name-matching */
  value: async function addHelmet(id, type) {
    const user = allplayer.get(id);
    if (user) {
      user.helmet += String(type);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, helmet: type });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'addChestplate', {
  /* eslint-disable-next-line func-name-matching */
  value: async function addChestplate(id, type) {
    const user = allplayer.get(id);
    if (user) {
      user.chestplate += String(type);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, chestplate: type });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'addLeggings', {
  /* eslint-disable-next-line func-name-matching */
  value: async function addLeggings(id, type) {
    const user = allplayer.get(id);
    if (user) {
      user.leggings += String(type);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, leggings: type });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'addBoots', {
  /* eslint-disable-next-line func-name-matching */
  value: async function addBoots(id, type) {
    const user = allplayer.get(id);
    if (user) {
      user.boots += String(type);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, boots: type });
    allplayer.set(id, newUser);
    return newUser;
  },
});

// to increase timetravel level
Reflect.defineProperty(allplayer, 'incTT', {
  /* eslint-disable-next-line func-name-matching */
  value: async function incTT(id, amount) {
    const user = allplayer.get(id);
    if (user) {
      user.timeTravel += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, timeTravel: amount });
    allplayer.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(allplayer, 'getTT', {
  /* eslint-disable-next-line func-name-matching */
  value: function getTT(id) {
    const user = allplayer.get(id);
    return user ? user.timeTravel : 0;
  },
});

Reflect.defineProperty(allplayer, 'getBalance', {
  /* eslint-disable-next-line func-name-matching */
  value: function getBalance(id) {
    const user = allplayer.get(id);
    return user ? user.balance : 0;
  },
});

Reflect.defineProperty(allplayer, 'getLevel', {
  /* eslint-disable-next-line func-name-matching */
  value: function getLevel(id) {
    const user = allplayer.get(id);
    return user ? user.level : 0;
  },
})

Reflect.defineProperty(allplayer, 'getXP', {
  /* eslint-disable-next-line func-name-matching */
  value: function getXP(id) {
    const user = allplayer.get(id);
    return user ? user.xp : 0;
  },
})

Reflect.defineProperty(allplayer, 'getHelmet', {
  /* eslint-disable-next-line func-name-matching */
  value: function getHelmet(id) {
    const user = allplayer.get(id);
    return user ? user.helmet : 0;
  },
})

Reflect.defineProperty(allplayer, 'getChestplate', {
  /* eslint-disable-next-line func-name-matching */
  value: function getChesplate(id) {
    const user = allplayer.get(id);
    return user ? user.chesplate : 0;
  },
})

Reflect.defineProperty(allplayer, 'getLeggings', {
  /* eslint-disable-next-line func-name-matching */
  value: function getLeggings(id) {
    const user = allplayer.get(id);
    return user ? user.leggings : 0;
  },
})

Reflect.defineProperty(allplayer, 'getBoots', {
  /* eslint-disable-next-line func-name-matching */
  value: function getBoots(id) {
    const user = allplayer.get(id);
    return user ? user.boots : 0;
  },
})

client.once('ready', async () => {
  const storedBalances = await Users.findAll();
  storedBalances.forEach(b => allplayer.set(b.user_id, b));

  console.log(`${client.user.username} is online and running! With:\n Username: ${client.user.username}`)

  setInterval(() => {
    client.user.setPresence({ activity: { name: `sb help`, type: "Watching" }, status: 'online' })
  }, 60000);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }
  if (message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  try {
    const ust = allplayer.get(message.author.id);

    if (!ust) return message.channel.send("New to Skyblace? `sb start` to create your island.");

    command.execute(message, args, client, CurrencyShop, Op, allplayer);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// FOR LATER
/*const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);*/

// login to Discord with your app's token
client.login("NzIwNjMyODk0MDYxNTQzNDM0.XuIzrg.YO1RbBDKkJUwYI02j2wnJ9RsOmM");