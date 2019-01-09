'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'admin',
    {
      admin_id:{
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      email:{
        type: Sequelize.STRING(40),
        allowNull: false
      },
      username:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      }
    }
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admin');
  }
};
