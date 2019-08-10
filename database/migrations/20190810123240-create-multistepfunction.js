module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('multistepfunctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      multistepId: {
        type: Sequelize.INTEGER,
      },
      functionId: {
        type: Sequelize.INTEGER,
      },
      order: {
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
    return queryInterface.dropTable('multistepfunctions');
  },
};
