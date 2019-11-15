'use strict';
module.exports = (sequelize, Sequelize) => {
  const logs = sequelize.define(
    'th_logs',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      th_game_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_games', key: 'id' },
      },
      game_flow: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
  logs.associate = db => {
    logs.belongsTo(db.th_games, {
      as: 'Game',
      foreignKey: 'th_game_id',
    });
  };
  return logs;
};
