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

module.exports = router;
