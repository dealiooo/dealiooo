const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { MainLobby: MainLobbyDB } = require('../database/api');
const { MainLobby: MainLobbySockets } = require('../sockets');

router.get('/api/main-lobby', authenticateUser, sendUserIdAndUserName);

router.post('/api/main-lobby', authenticateUser, (_, response) =>
  MainLobbyDB.findRunningGames(response.locals.user.id)
    .then(runningGames =>
      MainLobbyDB.findStartedGames(response.locals.user.id).then(startedGames =>
        MainLobbyDB.findOpenLobbies().then(openLobbies =>
          response.json({
            result: runningGames.concat(startedGames).concat(openLobbies)
          })
        )
      )
    )
    .catch(error => response.json({ error }))
);

router.post('/api/main-lobby/chat', authenticateUser, (request, response) => {
  const { username } = response.locals.user;
  const { message } = request.body;
  MainLobbySockets.chat(`${username}: ${message}`);
  response.sendStatus(204);
});

router.post(
  '/api/main-lobby/create-game',
  authenticateUser,
  (request, response) =>
    MainLobbyDB.insertGame(
      request.user.id,
      request.body.roomName,
      request.body.playerCapacity
    )
      .then(result => {
        const { id, username } = response.locals.user;
        MainLobbySockets.createGame(
          result.id,
          id,
          username,
          result.room_name,
          result.player_cap
        );
        return response.json(result);
      })
      .catch(error => response.json({ error }))
);

module.exports = router;
