'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('th_game_user_cards', {
    th_game_id: {
      type: Sequelize.INTEGER,
      references: { model: 'th_games', key: 'id' }
    },
    th_user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'th_users', key: 'id' }
    },
    th_card_id: {
      type: Sequelize.INTEGER,
      references: { model: 'th_cards', key: 'id' }
    },
    field: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });
};
