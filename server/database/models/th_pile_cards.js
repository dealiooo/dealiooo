'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'th_pile_cards',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      th_pile_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_piles', key: 'id' }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};
