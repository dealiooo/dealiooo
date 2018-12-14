'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'session',
    {
      sid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      sess: {
        type: Sequelize.JSON,
        allowNull: false
      },
      expire: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};
