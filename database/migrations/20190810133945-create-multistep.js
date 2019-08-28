module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('multisteps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
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
          'ALTER TABLE multisteps ' +
          'ADD CONSTRAINT multisteps_unique ' +
          'UNIQUE (name)'
        );
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('multisteps');
  },
};
