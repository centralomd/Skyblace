module.exports = (sequelize, DataTypes) => {
	return sequelize.define('islands', {
		island_id: {
			type: DataTypes.STRING,
			primaryKey: true,
    },
    tier: {
      type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false, 
    },
    portalShop: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    portalPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    gotRaided: {
      type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
    },
    mineLevel: {
      type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
    },
    chopLevel: {
      type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
    },
    mobLevel: {
      type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
    }
	}, {
		timestamps: false,
	});
};