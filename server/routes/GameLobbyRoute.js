const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const authenticatePlayer = require('./middlewares/authenticatePlayer');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { GameLobby } = require('../database/api');

router.get(
  '/game-lobby/:game_id',
  authenticateUser,
  authenticatePlayer,
  sendUserIdAndUserName
);

router.get('/game-lobby/:game_id/info', authenticateUser, (request, response) =>
  GameLobby.find_all_player_names(request.params.game_id)
    .then(result => response.json({ result }))
    .catch(error => response.json({ error }))
);

router.get(
  '/game-lobby/:game_id/status',
  authenticateUser,
  authenticatePlayer,
  (request, response) =>
    GameLobby.find_game_lobby_status(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/join',
  authenticateUser,
  (request, response) =>
    GameLobby.join_game(request.params.game_id, request.user.id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/leave',
  authenticateUser,
  authenticatePlayer,
  (request, response) =>
    GameLobby.leave_game(request.params.game_id, request.user.id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/run',
  authenticateUser,
  authenticatePlayer,
  (request, response) =>
    GameLobby.run_game(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/delete',
  authenticateUser,
  (request, response) =>
    GameLobby.delete_game(request.params.game_id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:game_id/ready',
  authenticateUser,
  authenticatePlayer,
  (request, response) =>
    GameLobby.player_ready(request.params.game_id, request.user.id)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

module.exports = router;
