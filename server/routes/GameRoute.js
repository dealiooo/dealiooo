const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const userBelongsToGameId = require('./middlewares/user_belongs_to_game_id');
const send_user_id_and_user_name = require('./middlewares/send_user_id_and_user_name');
const { Game } = require('../database/api');

router.get(
  '/game/:game_id',
  requireAuthentication,
  userBelongsToGameId,
  send_user_id_and_user_name
);

module.exports = router;
