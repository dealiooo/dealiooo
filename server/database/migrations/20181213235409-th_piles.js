'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('th_piles', {
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
          'property_set'
        ]
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('th_piles');
  }
};
