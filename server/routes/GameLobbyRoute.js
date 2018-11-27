const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const db = require('../database');

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

router.post(
  '/game-lobby/:game_id/join',
  requireAuthentication,
  (request, response) =>
    db.join_game(request.params.game_id, request.id, (error, result) => {
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

module.exports = router;
