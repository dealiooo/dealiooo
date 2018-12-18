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
      status: {
        type: Sequelize.ENUM,
        values: ['open', 'started', 'ended'],
        allowNull: false
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
