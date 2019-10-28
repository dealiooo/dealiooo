const express_session = require('express-session');
const PgSession = require('connect-pg-simple')(express_session);

const session = express_session({
  store: new PgSession({ tableName: 'sessions' }),
  secret: 'me is a secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
});

module.exports = session;
