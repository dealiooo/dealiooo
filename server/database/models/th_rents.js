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
      values: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
      },
      max_size: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};
