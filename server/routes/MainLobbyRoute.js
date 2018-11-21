const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const send_user_id_and_user_name = require('./middlewares/send_user_id_and_user_name');
const db = require('../database');

router.get('/main-lobby', requireAuthentication, send_user_id_and_user_name);

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
