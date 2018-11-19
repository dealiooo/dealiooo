const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const db = require('../database');

router.get('/main-lobby', requireAuthentication, (request, response) => {
  db.find_all_game_lobbies()
    .then(result => response.json({ result }))
    .catch(error => response.json({ error }));
});

router.get(
  '/main-lobby/create-game',
  requireAuthentication,
  (request, response) => {
    db.insert_game(request.user.id)
      .then(game_user => response.json({ game_user }))
      .catch(error => response.json({ error }));
  }
);

module.exports = router;
