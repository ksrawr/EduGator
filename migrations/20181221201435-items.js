'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'items',
    {
      post_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email:{
        type: Sequelize.STRING(40),
        allowNull: false,
        references:{
          model: 'users',
          key: 'email'
        },
      },
      name:{
        type: Sequelize.STRING(40),
        allowNull: false
      },
      category:{
        type: Sequelize.STRING(20),
        allowNull: false,
        references:{
          model: 'categories',
          key: 'name'
        },
      },
      description:{
        type: Sequelize.STRING,
        allowNull: true
      },
      price:{
        type: Sequelize.DECIMAL(8, 2),
        //sets decimal num to 8 long 2 digits after decimal
        allowNull: true
      },
      condition:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      image_path:{
        type: Sequelize.TEXT,
        allownull: false
      },
      created_at:{
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      thumbnail:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      approval_status:{
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'pending'
      }
    }
  )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('items');
  }
};
