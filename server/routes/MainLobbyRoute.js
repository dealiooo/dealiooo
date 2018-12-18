const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { MainLobby: MainLobbyDB } = require('../database/api');
const { MainLobby: MainLobbySockets } = require('../sockets');

router.get('/main-lobby', authenticateUser, sendUserIdAndUserName);

router.post('/main-lobby', authenticateUser, (_, response) =>
  MainLobbyDB.findStartedGames(response.locals.user.id)
    .then(startedGames =>
      MainLobbyDB.findOpenLobbies().then(openLobbies =>
        response.json({ result: startedGames.concat(openLobbies) })
      )
    )
    .then(error => response.json({ error }))
);

router.post('/main-lobby/chat', authenticateUser, (request, response) => {
  const { id, name } = response.locals.user;
  const { message } = request.body;
  MainLobbySockets.chat(`[${id}]:${name}:${message}`);
  response.sendStatus(204);
});

router.post('/main-lobby/create-game', authenticateUser, (request, response) =>
  MainLobbyDB.insertGame(request.user.id, request.body.playerCapacity)
    .then(result => {
      const { id, name } = response.locals.user;
      MainLobbySockets.createGame(result.id, id, name, result.player_cap);
      return response.json({ result });
    })
    .catch(error => response.json({ error }))
);

module.exports = router;
