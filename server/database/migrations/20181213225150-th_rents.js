'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('th_rents', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('th_rents');
  }
};
