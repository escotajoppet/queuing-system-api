module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    classification: {
      type: DataTypes.ENUM,
      values: [
        'pwd|senior',
        'requeue',
        'normal',
      ],
    },
    barcode: DataTypes.STRING,
    number: DataTypes.STRING,
    functionId: DataTypes.INTEGER,
  }, {});
  ticket.associate = models => {
    // associations can be defined here

    ticket.belongsTo(models.function, {
      foreignKey: 'functionId',
    });
  };
  return ticket;
};
