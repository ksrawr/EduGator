'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable(
      'approved_posts',
      {
        post_id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        status:{
          type: Sequelize.STRING(10)
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
    return queryInterface.dropTable('approved_posts');
  }
};
