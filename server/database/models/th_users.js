'use strict';
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    'th_users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Username already in use!'
        }
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
  users.associate = db => {
    users.hasMany(db.th_players, {
      as: 'Players',
      foreignKey: 'th_user_id'
    });
    users.belongsToMany(db.th_games, {
      as: 'Games',
      through: db.th_players,
      foreignKey: 'th_user_id'
    });
  };
  return users;
};
