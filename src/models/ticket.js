const { status } = require('@helpers/http.js');
const { QueuingError } = require('@helpers/error.js');

module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    classification: {
      type: DataTypes.ENUM,
      values: [
        'priority',
        'requeue',
        'normal',
      ],
    },
    prefix: DataTypes.STRING,
    barcode: DataTypes.STRING,
    number: DataTypes.INTEGER,
    functionId: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['barcode'],
      },
    ],
  }, {
    hooks: {
      async beforeSave(instance) {
        switch (instance.classification) {
          case 'priority':
            instance.prefix = 'P';

            break;
          case 'requeue':
            instance.prefix = 'R';

            break;
          case 'normal':
            instance.prefix = 'N';

            break;
          default:
            throw new QueuingError(
              'models::ticket:beforeSave()',
              'Invalid classification',
              status.BAD_REQUEST
            );
        }

        const max = await sequelize.models.ticket.max('number', {
          where: {
            prefix: instance.prefix,
          },
        });

        instance.number = isNaN(max) ? 1 : max + 1;
      },
    },
  });

  ticket.associate = models => {
    // associations can be defined here

    ticket.belongsTo(models.function, {
      foreignKey: 'functionId',
    });
  };
  return ticket;
};
