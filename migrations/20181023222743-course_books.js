'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'course_books',
    {
      post_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true //serial type in postgresql
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
      course:{
        type: Sequelize.STRING(10),
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
      approval_status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }
  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('course_books');
  }
}
