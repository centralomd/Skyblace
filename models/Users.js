module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    helmet: {
      type: DataTypes.STRING,
      defaultValue: "None",
      allowNull: false,
    },
    chestplate: {
      type: DataTypes.STRING,
      defaultValue: "None",
      allowNull: false,
    },
    leggings: {
      type: DataTypes.STRING,
      defaultValue: "None",
      allowNull: false,
    },
    boots: {
      type: DataTypes.STRING,
      defaultValue: "None",
      allowNull: false,
    },
    timeTravel: {
      type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
    },
    startRaid: {
      type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
    }
	}, {
		timestamps: false,
	});
};