const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');

const checkPassword = function(user, password) {
  bcrypt.compare(password, user.password).then(isEqual => {
    if (isEqual) {
      return user;
    }
    return Promise.reject(new Error('Invalid credentials.'));
  });
};

const verifyCallback = (username, password, done) =>
  db.find_user_by_email(username, (error, user) => {
    if (error) {
      done(null, false, error.message);
    } else if (user) {
      checkPassword(user, password)
        .then(user => done(null, user))
        .catch(error => done(null, false, error.message));
    } else {
      done(null, false, { message: 'incorrect username' });
    }
  });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) =>
  db.find_user_by_id(id, (error, user) => {
    if (error) {
      done(error, {});
    } else {
      done(null, user);
    }
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    verifyCallback
  )
);

const authSettings = {
  successRedirect: '/main-lobby',
  failureRedirect: '/'
};

module.exports = {
  passport,
  authenticate: passport.authenticate('local', authSettings)
};
