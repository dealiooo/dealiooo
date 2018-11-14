'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('th_cards', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    type: {
      type: Sequelize.ENUM('money', 'property', 'property-wildcard', 'action'),
      allowNull: false
    }
  });
};
