if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const routes = require('./server/routes');
const sockets = require('./server/sockets');

const { passport } = require('./server/authentication/passport');

const app = express();
const bodyParser = require('body-parser');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('cookie-parser')());
app.use(require('./server/database/config/session'));
app.use(passport.initialize());
app.use(passport.session());

app.sockets = sockets;
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(routes);

module.exports = app;
