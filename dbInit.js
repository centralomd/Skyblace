const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);
require('./models/Island')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Wooden Pickaxe', cost: 5 }),
		CurrencyShop.upsert({ name: 'Wooden Sword', cost: 8 }),
    CurrencyShop.upsert({ name: 'Leather Helmet', cost: 10 }),
    CurrencyShop.upsert({ name: 'Leather Chestplate', cost: 14 }),
    CurrencyShop.upsert({ name: 'Leather Leggings', cost: 12 }),
    CurrencyShop.upsert({ name: 'Leather Boots', cost: 11 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);