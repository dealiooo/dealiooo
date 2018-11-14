'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('th_game_users', {
      th_game_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_games', key: 'id' }
      },
      th_user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_users', key: 'id' }
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      cards_played: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      ready: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('th_game_users');
  }
};
