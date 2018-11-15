'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'test_games',
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
      }
    },
    {
      timestamps: false
    }
  );
};
