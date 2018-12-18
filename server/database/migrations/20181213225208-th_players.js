'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('th_players', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      th_user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_users', key: 'id' }
      },
      th_game_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_games', key: 'id' }
      },
      ready: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      host: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('th_players');
  }
};
