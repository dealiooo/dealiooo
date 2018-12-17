'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'th_cards',
    {
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
        allowNull: false,
        validate: {
          min: 0
        }
      },
      type: {
        type: Sequelize.ENUM,
        values: [
          'action',
          'building',
          'money',
          'property',
          'property_wildcard',
          'rent',
          'rent_wildcard'
        ],
        allowNull: false
      },
      main_color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      colors: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: null
      }
    },
    {
      timestamps: false
    }
  );
};
