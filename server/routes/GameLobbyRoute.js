const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const userBelongsToGameId = require('./middlewares/user_belongs_to_game_id');
const send_user_id_and_user_name = require('./middlewares/send_user_id_and_user_name');
const { GameLobby } = require('../database/api');

router.get(
  '/game-lobby/:game_id',
  requireAuthentication,
  userBelongsToGameId,
  send_user_id_and_user_name
);

router.get(
  '/game-lobby/:game_id/info',
  requireAuthentication,
  (request, response) =>
    GameLobby.find_all_player_names(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.get(
  '/game-lobby/:game_id/status',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    GameLobby.find_game_lobby_status(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/join',
  requireAuthentication,
  (request, response) =>
    GameLobby.join_game(request.params.game_id, request.user.id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/leave',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    GameLobby.leave_game(request.params.game_id, request.user.id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/run',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    GameLobby.run_game(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/delete',
  requireAuthentication,
  (request, response) =>
    GameLobby.delete_game(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/ready',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    GameLobby.player_ready(request.params.game_id, request.user.id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

module.exports = router;
