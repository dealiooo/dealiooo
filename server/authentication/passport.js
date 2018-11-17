const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');

const checkPassword = function(user, password) {
  bcrypt.compare(password, user.dataValues.password).then(isEqual => {
    if (isEqual) {
      return user;
    }
    return Promise.reject(new Error('Invalid credentials.'));
  });
};

const verifyCallback = (username, password, done) => {
  console.log(' verify ');
  db.find_user_by_email(username)
    .then(user => {
      if (user) {
        return checkPassword(user, password).then(user => done(null, user));
      } else {
        return done(null, false, { message: 'incorrect username' });
      }
    })
    .catch(error => done(null, false, error.message));
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((_id, done) => {
  db.find_user_by_id(_id)
    .then(user => done(null, user))
    .catch(error => done(error, {}));
});

passport.use(new LocalStrategy(verifyCallback));

const authSettings = {
  successRedirect: '/main-lobby',
  failureRedirect: '/'
};

module.exports = {
  passport,
  authenticate: passport.authenticate('local', authSettings)
};