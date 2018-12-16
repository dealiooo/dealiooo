'use strict';
module.exports = (sequelize, Sequelize) => {
  const piles = sequelize.define(
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
  piles.associate = db => {
    piles.hasMany(db.th_pile_cards, {
      as: 'Cards',
      foreignKey: 'th_pile_id'
    });
    piles.belongsTo(db.th_players, {
      as: 'Player',
      foreignKey: 'th_player_id'
    });
  };
  return piles;
};
