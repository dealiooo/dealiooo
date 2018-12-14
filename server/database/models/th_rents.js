'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'th_rents',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      set: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};
