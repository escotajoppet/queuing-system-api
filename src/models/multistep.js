module.exports = (sequelize, DataTypes) => {
  const multistep = sequelize.define('multistep', {
    name: DataTypes.STRING,
  }, {});
  multistep.associate = models => {
    // associations can be defined here

    multistep.belongsToMany(models.function, {
      through: 'multistepfunctions',
      foreignKey: 'multistepId',
      unique: false,
      foreignKeyConstraint: true,
      constraint: false,
    });
  };
  return multistep;
};
