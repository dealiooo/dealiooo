'use strict';
module.exports = (sequelize, Sequelize) => {
  const games = sequelize.define(
    'th_games',
    {
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
        allowNull: false,
        validate: {
          min: 2,
          max: 5
        }
      }
    },
    {
      timestamps: false
    }
  );
  games.associate = db => {
    games.hasMany(db.th_players, {
      as: 'Players',
      foreignKey: 'th_game_id'
    });
    games.belongsToMany(db.th_users, {
      as: 'Users',
      through: db.th_players,
      foreignKey: 'th_game_id'
    });
  };
  return games;
};
