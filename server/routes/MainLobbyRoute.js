const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const db = require('../database');

router.get('/main-lobby', requireAuthentication);

router.post('/main-lobby', requireAuthentication, (request, response) =>
  db.find_all_game_lobbies((error, result) => {
    if (error) {
      response.json({ error });
    } else {
      response.json({ result });
    }
  })
);

router.get(
  '/main-lobby/create-game',
  requireAuthentication,
  (request, response) =>
    db.insert_game(request.user.id, (error, game_user) => {
      if (error) {
        response.json({ error });
      } else {
        response.json({ game_user });
      }
    })
);

module.exports = router;
