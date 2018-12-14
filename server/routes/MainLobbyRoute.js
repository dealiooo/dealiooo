const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const send_user_id_and_user_name = require('./middlewares/send_user_id_and_user_name');
const { MainLobby } = require('../database/api');

router.get('/main-lobby', requireAuthentication, send_user_id_and_user_name);

router.post('/main-lobby', requireAuthentication, (request, response) =>
  MainLobby.find_all_game_lobbies()
    .then(result => response.json({ result }))
    .catch(error => response.json({ error }))
);

router.post(
  '/main-lobby/create-game',
  requireAuthentication,
  (request, response) =>
    MainLobby.insert_game(request.user.id, 2)
      .then(result => response.json({ result }))
      .catch(error => {
        console.log(error);
        return response.json({ error });
      })
);

module.exports = router;
