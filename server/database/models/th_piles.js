'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'th_piles',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      th_player_id: {
        type: Sequelize.INTEGER,
        references: { model: 'th_players', key: 'id' }
      },
      type: {
        type: Sequelize.ENUM,
        values: [
          'action',
          'bank',
          'building',
          'deck',
          'discard',
          'hand',
          'property_set',
          'card_played_log'
        ]
      }
    },
    {
      timestamps: false
    }
  );
};
