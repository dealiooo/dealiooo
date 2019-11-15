'use strict';
module.exports = (sequelize, Sequelize) => {
  const games = sequelize.define(
    'th_games',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['open', 'started', 'running', 'ended'],
        allowNull: false,
      },
      room_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      player_cap: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 2,
          max: 4,
        },
      },
    },
    {
      timestamps: false,
    },
  );
  games.associate = db => {
    games.hasMany(db.th_players, {
      as: 'Players',
      foreignKey: 'th_game_id',
    });
    games.hasMany(db.th_logs, {
      as: 'Logs',
      foreignKey: 'th_game_id',
    });
    games.belongsToMany(db.th_users, {
      as: 'Users',
      through: db.th_players,
      foreignKey: 'th_game_id',
    });
  };
  return games;
};
