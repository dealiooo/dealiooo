const db = require('./models');
const th_cards_model = require('./models/th_cards');
const th_users_model = require('./models/th_users');
const th_games_model = require('./models/th_games');
const th_game_users_model = require('./models/th_game_users');
const th_game_user_cards_model = require('./models/th_game_user_cards');

const Cards = th_cards_model(db.sequelize, db.Sequelize);
const Users = th_users_model(db.sequelize, db.Sequelize);
const Games = th_games_model(db.sequelize, db.Sequelize);
const GameUsers = th_game_users_model(db.sequelize, db.Sequelize);
const GameUserCards = th_game_user_cards_model(db.sequelize, db.Sequelize);

const _db = {};

_db.Cards = Cards;
_db.Users = Users;
_db.Games = Games;
_db.GameUsers = GameUsers;
_db.GameUserCards = GameUserCards;

_db.insert_user = function(_username, _email, _password) {
  return db.sequelize
    .sync({
      logging: false
    })
    .then(() => {
      return _db.Users.create({
        name: _username,
        email: _email,
        password: _password
      })
        .then(_ => {
          return _.dataValues.name;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    });
};

_db.update_password = function(_email, _new_password) {
  return db.sequelize
    .sync({
      logging: false
    })
    .then(() => {
      return _db.Users.update(
        {
          password: _new_password
        },
        {
          where: {
            email: _email
          }
        }
      )
        .then(_ => {
          return true;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    });
};

_db.insert_game = function(_user_id) {
  return db.sequelize
    .sync({
      logging: false
    })
    .then(() => {
      return _db.Games.create({})
        .then(_ => {
          _db.GameUsers.create({
            th_game_id: _.dataValues.id,
            th_user_id: _user_id
          });
        })
        .then(_ => {
          return _.dataValues.th_game_id;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    });
};

_db.join_game = function(_game_id, _user_id) {
  return db.sequelize
    .sync({
      logging: false
    })
    .then(() => {
      return _db.GameUsers.findAndCountAll({
        where: {
          th_game_id: _game_id
        }
      })
        .then(result => {
          if (result.count < 5) {
            _db.GameUsers.create({
              th_game_id: _game_id,
              th_user_id: _user_id
            }).then(_ => {
              return true;
            });
          } else {
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    });
};

_db.delete_game = function(_game_id) {
  // TODO
  return false;
};

_db.ready = function(_game_id) {
  // TODO
  return false;
};

_db.ready = function(_user_id, game_id) {
  // TODO
  return false;
};

/*

delete_game( game_id )
True // if delete succeeded
False // if delete failed

ready( user_id, game_id )
True // if update ( user_id.ready = !user_id.ready ) succeeded
False // if update ( user_id.ready = !user_id.ready ) failed

ready( game_id )
True // if all players are ready
False // if not all players are ready

*/

module.exports = _db;
