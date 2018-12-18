const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const authenticatePlayer = require('./middlewares/authenticatePlayer');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { Game } = require('../database/api');

router.get(
  '/game/:game_id',
  authenticateUser,
  authenticatePlayer,
  sendUserIdAndUserName
);

module.exports = router;
