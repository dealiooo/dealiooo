const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const authenticatePlayer = require('./middlewares/authenticatePlayer');
const authenticateHost = require('./middlewares/authenticateHost');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { GameLobby: GameLobbyDB } = require('../database/api');
const {
  MainLobby: MainLobbySockets,
  GameLobby: GameLobbySockets
} = require('./../sockets');

router.get(
  '/game-lobby/:gameId',
  authenticateUser,
  authenticatePlayer,
  sendUserIdAndUserName
);

router.get('/game-lobby/:gameId/info', authenticateUser, (request, response) =>
  GameLobbyDB.getUsersNames(request.params.gameId)
    .then(result => response.json({ result }))
    .catch(error => response.json({ error }))
);

router.get(
  '/game-lobby/:gameId/status',
  authenticateUser,
  authenticatePlayer,
  (request, response) =>
    GameLobbyDB.getPlayersStatus(request.params.gameId)
      .then(result => response.json({ result }))
      .catch(error => response.json({ error }))
);

router.post(
  '/game-lobby/:gameId/chat',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id, name } = response.locals.user;
    const { message } = request.body;
    GameLobbySockets.chat(gameId, `[${id}]:${name}:${message}`);
    return response.sendStatus(204);
  }
);

router.post(
  '/game-lobby/:gameId/enter',
  authenticateUser,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    GameLobbySockets.enterGame(gameId, id);
    return response.sendStatus(204);
  }
);

router.post(
  '/game-lobby/:gameId/join',
  authenticateUser,
  (request, response) => {
    const { gameId } = request.params;
    const { id, name } = response.locals.user;
    return GameLobbyDB.joinGame(gameId, id)
      .then(result => {
        MainLobbySockets.joinGame(gameId, id, name);
        return response.json({ result });
      })
      .catch(error => response.json({ error }));
  }
);

router.post(
  '/game-lobby/:gameId/leave',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id, name } = response.locals.user;
    return GameLobbyDB.leaveGame(request.params.gameId, request.user.id)
      .then(result => {
        MainLobbySockets.leaveGame(gameId, id, name);
        GameLobbySockets.leaveGame(gameId, id, name);
        return response.json({ result });
      })
      .catch(error => response.json({ error }));
  }
);
router.post(
  '/game-lobby/:gameId/start',
  authenticateUser,
  authenticatePlayer,
  authenticateHost,
  (request, response) => {
    const { gameId } = request.params;
    const { id, name } = response.locals.user;
    return GameLobbyDB.getGameReady(gameId).then(
      result => {
        if (result) {
          return GameLobbyDB.startGame(gameId).then(result => {
            MainLobbySockets.startGame(gameId, id, name);
            GameLobbySockets.startGame(gameId, id, name);
            return response.json({ result });
          })
        } else {
          return response.json({message:'not all players are ready'});
        }
      }
    ).catch(error => response.json({ error }));
  }
);

router.post(
  '/game-lobby/:gameId/toggle-ready',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id, name } = response.locals.user;
    return GameLobbyDB.togglePlayerReady(gameId, id)
      .then(result => {
        if (result[1].ready) {
          GameLobbySockets.playerReady(gameId, id, name);
        } else {
          GameLobbySockets.playerUnready(gameId, id, name);
        }
        return response.json({ result });
      })
      .catch(error => response.json({ error }));
  }
);

module.exports = router;
