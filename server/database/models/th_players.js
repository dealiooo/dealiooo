'use strict';
module.exports = (sequelize, Sequelize) => {
  const players = sequelize.define(
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
  players.associate = db => {
    players.hasMany(db.th_piles, {
      as: 'Piles',
      foreignKey: 'th_player_id'
    });
    players.belongsTo(db.th_games, {
      as: 'Game',
      foreignKey: 'th_game_id'
    });
    players.belongsTo(db.th_users, {
      as: 'User',
      foreignKey: 'th_user_id'
    });
  };
  return players;
};
