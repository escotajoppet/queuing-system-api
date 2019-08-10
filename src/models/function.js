module.exports = (sequelize, DataTypes) => {
  const functionMod = sequelize.define('function', {
    name: DataTypes.STRING,
  }, {});

  functionMod.associate = models => {
    // associations can be defined herec
    functionMod.hasMany(models.window, {
      foreignKey: 'functionId',
    });

    functionMod.belongsToMany(models.multistep, {
      through: 'multistepfunctions',
      foreignKey: 'functionId',
      unique: false,
      foreignKeyConstraint: true,
      constraint: false,
    });

    functionMod.hasMany(models.ticket, {
      foreignKey: 'functionId',
    });
  };

  return functionMod;
};
