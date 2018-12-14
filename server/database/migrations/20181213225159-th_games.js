'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('th_games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      turn: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      card_played: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      player_count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      current_player: {
        type: Sequelize.INTEGER,
        references: { model: 'th_users', key: 'id' }
      },
      player_cap: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('th_games');
  }
};
