module.exports = (sequelize, DataTypes) => {
  const window = sequelize.define('window', {
    name: DataTypes.STRING,
    authenticationCode: DataTypes.STRING,
    functionId: DataTypes.INTEGER,
  }, {});
  window.associate = function(models) {
    // associations can be defined here

    window.belongsTo(models.function, {
      foreignKey: 'functionId',
    });
  };
  return window;
};
