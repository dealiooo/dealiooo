const db = require('./models');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

db.th_games.hasMany(db.th_players, {
  as: 'Players',
  foreignKey: 'th_game_id'
});

db.th_players.hasMany(db.th_piles, {
  as: 'Piles',
  foreignKey: 'th_player_id'
});

db.th_piles.hasMany(db.th_pile_cards, {
  as: 'Cards',
  foreignKey: 'th_pile_id'
});

db.th_users.hasMany(db.th_players, {
  as: 'Players',
  foreignKey: 'th_game_id'
});

db.th_games.belongsToMany(db.th_users, {
  as: 'Users',
  through: db.th_players,
  foreignKey: 'th_game_id'
});

db.th_users.belongsToMany(db.th_games, {
  as: 'Games',
  through: db.th_players,
  foreignKey: 'th_user_id'
});

db.insert_user = (username, email, password) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    bcrypt.hash(password, SALT_ROUNDS).then(hash =>
      db.th_users.create({
        name: username,
        email,
        password: hash
      })
    )
  );

db.find_user_by_email = email => db.th_users.findOne({ where: { email } });

db.find_user_by_id = id => db.th_users.findOne({ where: { id } });

db.update_password = (email, new_password) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ =>
      bcrypt
        .hash(new_password, SALT_ROUNDS)
        .then(hash =>
          db.th_users.update({ password: hash }, { where: { email } })
        )
    );

db.find_all_game_lobbies = () => db.th_games.findAll({ where: { turn: 0 } });

db.find_game_by_id = game_id => db.th_games.findOne({ where: { id: game_id } });

const debugOutput = result => {
  console.log(result);
  return result;
};

db.find_all_player_names = game_id =>
  db
    .find_game_by_id(game_id)
    .then(game => game.getUsers({ attributes: ['id', 'name'] }));

db.user_belong_to_game_id = (game_id, user_id) =>
  db.th_players.findAndCountAll({
    where: {
      th_game_id: game_id,
      th_user_id: user_id
    }
  });

db.find_game_lobby_status = game_id =>
  db.th_users.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: db.th_players,
        attributes: ['ready'],
        where: { th_game_id: game_id }
      }
    ]
  });

db.insert_game = user_id =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => db.th_games.create({}))
    .then(game =>
      th_players.create({
        th_game_id: game.id,
        th_user_id: user_id
      })
    );

db.player_size = game_id =>
  db.th_players.findAndCountAll({
    where: { th_game_id: game_id }
  });

db.join_game = (game_id, user_id) =>
  db.player_size(game_id).then(result => {
    if (result.count >= 5) {
      return Promise.reject(new Error('Game lobby is full'));
    } else {
      return db.sequelize.sync({ logging: false }).then(_ =>
        db.th_players.create({
          th_game_id: game_id,
          th_user_id: user_id
        })
      );
    }
  });

db.leave_game = (game_id, user_id) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    db.th_players.destroy({
      where: {
        th_game_id: game_id,
        th_user_id: user_id
      }
    })
  );

db.delete_game = game_id =>
  db.player_size(game_id).then(result => {
    if (result.count) {
      return Promise.reject(new Error('Game is not empty'));
    } else {
      return db.sequelize
        .sync({ logging: false })
        .then(_ => db.th_games.destroy({ where: { id: game_id } }));
    }
  });

db.run_game = game_id =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => db.th_games.update({ turn: 1 }, { where: { id: game_id } }));

db.ready = game_id =>
  db
    .find_all_player_names(game_id)
    .then(results => results.map(result => db.get_ready(game_id, result.id)));

db.get_ready = (game_id, user_id) =>
  db.th_players.findOne({
    attributes: ['ready'],
    where: {
      th_game_id: game_id,
      th_user_id: user_id
    }
  });

db.ready = (game_id, user_id) =>
  db.get_ready(game_id, user_id).then(result =>
    db.sequelize.sync({ logging: false }).then(_ =>
      db.th_players.update(
        { ready: !result.ready },
        {
          where: {
            th_game_id: game_id,
            th_user_id: user_id
          }
        }
      )
    )
  );

db.insert_session = (sid, sess, expire) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    db.session.create({
      sid,
      sess,
      expire
    })
  );

db.delete_session = sid =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => db.session.destroy({ where: { sid } }));

db.find_session_by_sid = sid => db.session.findOne({ where: { sid } });

module.exports = db;
