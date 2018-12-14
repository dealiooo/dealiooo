'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'th_players',
    {
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
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};