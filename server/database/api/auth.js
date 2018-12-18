const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const insertUser = db => (name, email, hash_me) =>
  bcrypt.hash(hash_me, SALT_ROUNDS).then(password =>
    db.th_users.create({
      name,
      email,
      password
    })
  );

const findUserByEmail = db => email =>
  db.th_users.findOne({ where: { email } });

const findUserById = db => id => db.th_users.findOne({ where: { id } });

const updatePassword = db => (email, new_password) =>
  bcrypt
    .hash(new_password, SALT_ROUNDS)
    .then(hash => db.th_users.update({ password: hash }, { where: { email } }));

const insertSession = db => (sid, sess, expire) =>
  db.session.create({
    sid,
    sess,
    expire
  });

const deleteSession = db => sid => db.session.destroy({ where: { sid } });

const findSessionBySid = db => sid => db.session.findOne({ where: { sid } });

const findPlayer = db => (th_game_id, th_user_id) =>
  db.th_players.findOne({
    where: {
      th_game_id,
      th_user_id
    }
  });

module.exports = db => ({
  insertUser: insertUser(db),
  findUserByEmail: findUserByEmail(db),
  findUserById: findUserById(db),
  updatePassword: updatePassword(db),
  insertSession: insertSession(db),
  deleteSession: deleteSession(db),
  findSessionById: findSessionBySid(db),
  findPlayer: findPlayer(db)
});
