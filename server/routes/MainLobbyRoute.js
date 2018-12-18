const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { MainLobby } = require('../database/api');

router.get('/main-lobby', authenticateUser, sendUserIdAndUserName);

router.post('/main-lobby', authenticateUser, (_, response) =>
  MainLobby.find_all_game_lobbies()
    .then(result => response.json({ result }))
    .catch(error => response.json({ error }))
);

router.post('/main-lobby/create-game', authenticateUser, (request, response) =>
  MainLobby.insert_game(request.user.id, 2)
    .then(result => response.json({ result }))
    .catch(error => {
      console.log(error);
      return response.json({ error });
    })
);

module.exports = router;
