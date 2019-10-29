const cors = require('cors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const routes = require('./server/routes');
const session = require('./server/database/config/session');
const sockets = require('./server/sockets');
const { passport } = require('./server/authentication/passport');

const app = express();
app.use(cors());
app.sockets = sockets;
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session);
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;
