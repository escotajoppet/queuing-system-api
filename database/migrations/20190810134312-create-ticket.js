module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      classification: {
        type: Sequelize.ENUM,
        values: [
          'pwd|senior',
          'requeue',
          'normal',
        ],
      },
      barcode: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
      },
      functionId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tickets');
  },
};
