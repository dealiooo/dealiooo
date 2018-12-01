const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const userBelongsToGameId = require('./middlewares/user_belongs_to_game_id');
const send_user_id_and_user_name = require('./middlewares/send_user_id_and_user_name');
const db = require('../database');

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
    db.find_all_game_user_names(request.params.game_id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

router.get(
  '/game-lobby/:game_id/status',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    db.find_game_lobby_status(request.params.game_id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

router.post(
  '/game-lobby/:game_id/join',
  requireAuthentication,
  (request, response) =>
    db.join_game(request.params.game_id, request.user.id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

router.post(
  '/game-lobby/:game_id/leave',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    db.leave_game(request.params.game_id, request.user.id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

router.post(
  '/game-lobby/:game_id/run',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    db.run_game(request.params.game_id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

router.post(
  '/game-lobby/:game_id/delete',
  requireAuthentication,
  (request, response) =>
    db.delete_game(request.params.game_id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

router.post(
  '/game-lobby/:game_id/ready',
  requireAuthentication,
  userBelongsToGameId,
  (request, response) =>
    db.ready(request.params.game_id, request.user.id, (error, result) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ result });
      }
    })
);

module.exports = router;
