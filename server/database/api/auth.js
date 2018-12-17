const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const insert_user = db => (username, email, password) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    bcrypt.hash(password, SALT_ROUNDS).then(hash =>
      db.th_users.create({
        name: username,
        email,
        password: hash
      })
    )
  );

const find_user_by_email = db => email =>
  db.th_users.findOne({ where: { email } });

const find_user_by_id = db => id => db.th_users.findOne({ where: { id } });

const update_password = db => (email, new_password) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ =>
      bcrypt
        .hash(new_password, SALT_ROUNDS)
        .then(hash =>
          db.th_users.update({ password: hash }, { where: { email } })
        )
    );

const insert_session = db => (sid, sess, expire) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    db.session.create({
      sid,
      sess,
      expire
    })
  );

const delete_session = db => sid =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => db.session.destroy({ where: { sid } }));

const find_session_by_sid = db => sid => db.session.findOne({ where: { sid } });

const user_belong_to_game_id = db => (game_id, user_id) =>
  db.th_players.findAndCountAll({
    where: {
      th_game_id: game_id,
      th_user_id: user_id
    }
  });

module.exports = db => ({
  insert_user: insert_user(db),
  find_user_by_email: find_user_by_email(db),
  find_user_by_id: find_user_by_id(db),
  update_password: update_password(db),
  insert_session: insert_session(db),
  delete_session: delete_session(db),
  find_session_by_sid: find_session_by_sid(db),
  user_belong_to_game_id: user_belong_to_game_id(db)
});
