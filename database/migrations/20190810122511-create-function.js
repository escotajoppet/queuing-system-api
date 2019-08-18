module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('functions', {
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
      .then(function() {
        return queryInterface.sequelize.query(
          'ALTER TABLE functions ' +
          'ADD CONSTRAINT functions_unique ' +
          'UNIQUE (name)'
        );
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('functions');
  },
};
