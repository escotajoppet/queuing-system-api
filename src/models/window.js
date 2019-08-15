const uuidv1 = require('uuid/v1');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const window = sequelize.define('window', {
    name: DataTypes.STRING,
    authenticationCode: DataTypes.STRING,
    functionId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: [
        'pending',
        'approved',
        'rejected',
      ],
    },
  }, {
    hooks: {
      async beforeCreate(instance) {
        const Window = sequelize.models.window;
        const count = await Window.count({
          where: {
            [Op.and]: {
              name: instance.name,
              status: {
                [Op.or]: ['approved'],
              },
            },
          },
        });

        if (count > 0)
          throw new Sequelize.BaseError(
            `Window name '${instance.name}' is taken`
          );

        instance.authenticationCode = uuidv1();
        instance.status = 'pending';
      },
    },
  });
  window.associate = function(models) {
    // associations can be defined here

    window.belongsTo(models.function, {
      foreignKey: 'functionId',
    });
  };
  return window;
};
