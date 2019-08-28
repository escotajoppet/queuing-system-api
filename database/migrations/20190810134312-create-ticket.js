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
          'priority',
          'requeue',
          'normal',
        ],
      },
      prefix: {
        type: Sequelize.ENUM,
        values: ['P', 'R', 'N'],
      },
      barcode: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.INTEGER,
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
    })
      .then(_ => {
        return queryInterface.sequelize.query(
          'ALTER TABLE tickets ' +
          'ADD CONSTRAINT ticketss_unique ' +
          'UNIQUE (barcode)'
        );
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tickets');
  },
};
