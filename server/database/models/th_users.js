'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'th_users',
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};
