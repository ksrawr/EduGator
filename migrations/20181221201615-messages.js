'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'messages',
      {
        message_id:{
          type: Sequelize.STRING(20),
          primaryKey: true,
        },
        sender:{
          type: Sequelize.STRING(40),
          references:{
            model:'users',
            key:'email'
          }
        },
        reciever:{
          type: Sequelize.STRING(40),
          references:{
            model:'users',
            key:'email'
          }
        },
        message:{
          type: Sequelize.STRING,
        },
        created_at:{
          type: Sequelize.TIME,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        }
      }

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');
  }
};
