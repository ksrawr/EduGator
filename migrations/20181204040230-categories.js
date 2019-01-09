'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'categories',
      {
        name:{
          type: Sequelize.STRING(20),
          primaryKey: true,
          allowNull: false
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};
