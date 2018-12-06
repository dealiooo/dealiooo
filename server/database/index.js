const db = require('./models');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

db.th_games.hasOne(db.th_game_users, { foreignKey: 'th_game_id' });
db.th_users.hasOne(db.th_game_users, { foreignKey: 'th_user_id' });

db.th_cards.hasOne(db.th_game_user_cards, { foreignKey: 'th_card_id' });
db.th_games.hasOne(db.th_game_user_cards, { foreignKey: 'th_game_id' });
db.th_users.hasOne(db.th_game_user_cards, { foreignKey: 'th_user_id' });

db.th_games.belongsToMany(db.th_users, {
  as: 'Users',
  through: db.th_game_users,
  foreignKey: 'th_game_id'
});
db.th_games.belongsToMany(db.th_cards, {
  as: 'Cards',
  through: db.th_game_user_cards,
  foreignKey: 'th_game_id'
});

db.th_cards.belongsToMany(db.th_games, {
  as: 'Games',
  through: db.th_game_user_cards,
  foreignKey: 'th_card_id'
});
db.th_cards.belongsToMany(db.th_users, {
  as: 'Users',
  through: db.th_game_user_cards,
  foreignKey: 'th_card_id'
});

db.th_users.belongsToMany(db.th_games, {
  as: 'Games',
  through: db.th_game_users,
  foreignKey: 'th_user_id'
});
db.th_users.belongsToMany(db.th_cards, {
  as: 'Cards',
  through: db.th_game_user_cards,
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

db.find_all_game_user_names = game_id =>
  db
    .find_game_by_id(game_id)
    .then(game => game.getUsers({ attributes: ['id', 'name'] }));

db.user_belong_to_game_id = (game_id, user_id) =>
  db.th_game_users.findAndCountAll({
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
        model: db.th_game_users,
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
      th_game_users.create({
        th_game_id: game.id,
        th_user_id: user_id
      })
    );

db.game_user_size = game_id =>
  db.th_game_users.findAndCountAll({
    where: { th_game_id: game_id }
  });

db.join_game = (game_id, user_id) =>
  db.game_user_size(game_id).then(result => {
    if (result.count >= 5) {
      return Promise.reject(new Error('Game lobby is full'));
    } else {
      return db.sequelize.sync({ logging: false }).then(_ =>
        db.th_game_users.create({
          th_game_id: game_id,
          th_user_id: user_id
        })
      );
    }
  });

db.leave_game = (game_id, user_id) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    db.th_game_users.destroy({
      where: {
        th_game_id: game_id,
        th_user_id: user_id
      }
    })
  );

db.delete_game = game_id =>
  db.game_user_size(game_id).then(result => {
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
    .find_all_game_user_names(game_id)
    .then(results => results.map(result => db.get_ready(game_id, result.id)));

db.get_ready = (game_id, user_id) =>
  db.th_game_users.findOne({
    attributes: ['ready'],
    where: {
      th_game_id: game_id,
      th_user_id: user_id
    }
  });

db.ready = (game_id, user_id) =>
  db.get_ready(game_id, user_id).then(result =>
    db.sequelize.sync({ logging: false }).then(_ =>
      db.th_game_users.update(
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
    db.sessions.create({
      sid,
      sess,
      expire
    })
  );

db.delete_session = sid =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => db.sessions.destroy({ where: { sid } }));

db.find_session_by_sid = sid => db.sessions.findOne({ where: { sid } });

module.exports = db;
