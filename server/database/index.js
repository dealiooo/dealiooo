const db = require('./models');
const sessions = require('./models/sessions');
const th_cards_model = require('./models/th_cards');
const th_users_model = require('./models/th_users');
const th_games_model = require('./models/th_games');
const th_game_users_model = require('./models/th_game_users');
const th_game_user_cards_model = require('./models/th_game_user_cards');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const Sessions = sessions(db.sequelize, db.Sequelize);
const Cards = th_cards_model(db.sequelize, db.Sequelize);
const Users = th_users_model(db.sequelize, db.Sequelize);
const Games = th_games_model(db.sequelize, db.Sequelize);
const GameUsers = th_game_users_model(db.sequelize, db.Sequelize);
const GameUserCards = th_game_user_cards_model(db.sequelize, db.Sequelize);

Games.hasOne(GameUsers, { foreignKey: 'th_game_id' });
Users.hasOne(GameUsers, { foreignKey: 'th_user_id' });

Cards.hasOne(GameUserCards, { foreignKey: 'th_card_id' });
Games.hasOne(GameUserCards, { foreignKey: 'th_game_id' });
Users.hasOne(GameUserCards, { foreignKey: 'th_user_id' });

Games.belongsToMany(Users, {
  as: 'Users',
  through: GameUsers,
  foreignKey: 'th_game_id'
});
Games.belongsToMany(Cards, {
  as: 'Cards',
  through: GameUserCards,
  foreignKey: 'th_game_id'
});

Cards.belongsToMany(Games, {
  as: 'Games',
  through: GameUserCards,
  foreignKey: 'th_card_id'
});
Cards.belongsToMany(Users, {
  as: 'Users',
  through: GameUserCards,
  foreignKey: 'th_card_id'
});

Users.belongsToMany(Games, {
  as: 'Games',
  through: GameUsers,
  foreignKey: 'th_user_id'
});
Users.belongsToMany(Cards, {
  as: 'Cards',
  through: GameUserCards,
  foreignKey: 'th_user_id'
});

const _db = {};

_db.insert_user = (username, email, password, callback) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ =>
      bcrypt
        .hash(password, SALT_ROUNDS)
        .then(hash =>
          Users.create({ name: username, email: email, password: hash })
        )
        .then(user => callback(null, user))
    )
    .catch(error => callback(error));

_db.find_user_by_email = (email, callback) =>
  Users.findOne({ where: { email: email } })
    .then(user => callback(null, user))
    .catch(error => callback(error));

_db.find_user_by_id = (id, callback) =>
  Users.findOne({ where: { id: id } })
    .then(user => callback(null, user))
    .catch(error => callback(error));

_db.update_password = (email, new_password, callback) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    bcrypt.hash(new_password, 10, (error, hash) => {
      if (error) {
        throw new Error(error);
      } else {
        Users.update(
          {
            password: hash
          },
          {
            where: {
              email: email
            }
          }
        )
          .then(user => callback(null, user))
          .catch(error => callback(error));
      }
    })
  );

_db.find_all_game_lobbies = callback =>
  Games.findAll({ where: { turn: 0 } })
    .then(open_games => callback(null, open_games))
    .catch(error => callback(error));

_db.find_game_by_id = (game_id, callback) =>
  Games.findOne({ where: { id: game_id } })
    .then(game => callback(null, game))
    .catch(error => callback(error));

_db.find_all_game_user_names = (game_id, callback) =>
  _db.find_game_by_id(game_id, (error, game) => {
    if (error) {
      callback(error);
    }
    game
      .getUsers({ attributes: ['name'] })
      .then(users => callback(null, users))
      .catch(error => callback(error));
  });

_db.insert_game = (user_id, callback) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => Games.create({}))
    .then(game =>
      GameUsers.create({
        th_game_id: game.id,
        th_user_id: user_id
      })
    )
    .then(game_user => callback(null, game_user))
    .catch(error => callback(error));

_db.join_game = (game_id, user_id, callback) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ =>
      GameUsers.findAndCountAll({
        where: {
          th_game_id: game_id
        }
      })
    )
    .then(result => {
      if (result.count < 5) {
        GameUsers.create({
          th_game_id: game_id,
          th_user_id: user_id
        }).then(game_user => callback(null, game_user));
      } else {
        callback(Promise.reject(new Error('Game is at full capacity')));
      }
    })
    .catch(error => callback(error));

_db.delete_game = (game_id, callback) =>
  callback(Promise.reject(new Error('TODO')));

_db.ready = (game_id, callback) => callback(Promise.reject(new Error('TODO')));

_db.ready = (user_id, game_id, callback) =>
  callback(Promise.reject(new Error('TODO')));

_db.insert_session = (session_id, sess, expire, callback) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ =>
      Sessions.create({
        sid: session_id,
        sess: sess,
        expire: expire
      })
    )
    .then(session => callback(null, session))
    .catch(error => callback(error));

_db.find_session_by_sid = (session_id, callback) =>
  Sessions.findOne({ where: { sid: session_id } })
    .then(session => callback(null, session))
    .catch(error => callback(error));

/*
delete_game( game_id )
Promise // if delete succeeded
Error // if delete failed

ready( user_id, game_id )
Promise // if update ( user_id.ready = !user_id.ready ) succeeded
Error // if update ( user_id.ready = !user_id.ready ) failed

ready( game_id )
Promise // if all players are ready
Error // if not all players are ready

*/

module.exports = _db;
