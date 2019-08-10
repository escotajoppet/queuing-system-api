module.exports = (sequelize, DataTypes) => {
  const multistepfunction = sequelize.define('multistepfunction', {
    multistepId: DataTypes.INTEGER,
    functionId: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
  }, {});
  multistepfunction.associate = models => {
    // associations can be defined here
  };
  return multistepfunction;
};
