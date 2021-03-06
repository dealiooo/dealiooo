const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const authenticatePlayer = require('./middlewares/authenticatePlayer');
const authenticateHost = require('./middlewares/authenticateHost');
const { GameLobby: GameLobbyDB } = require('../database/api');
const { MainLobby: MainLobbySockets, GameLobby: GameLobbySockets } = require('./../sockets');

// @deprecated, authentication is not required to view game lobby players
// router.get(
//   '/api/game-lobby/:gameId/info',
//   authenticateUser,
//   (request, response) =>
//     GameLobbyDB.getPlayers(request.params.gameId)
//       .then(result => response.json(result))
//       .catch(error => response.json({ error }))
// );

router.get('/api/game-lobby/:gameId/info', (request, response) =>
  GameLobbyDB.getPlayers(request.params.gameId)
    .then(result => response.json(result))
    .catch(error => response.json({ error })),
);

router.get('/api/game-lobby/:gameId/statuses', authenticateUser, authenticatePlayer, (request, response) =>
  GameLobbyDB.getPlayersStatus(request.params.gameId)
    .then(result => response.json(result))
    .catch(error => response.json({ error })),
);

router.post('/api/game-lobby/:gameId/chat', authenticateUser, authenticatePlayer, (request, response) => {
  const { gameId } = request.params;
  const { username } = response.locals.user;
  const { message } = request.body;
  GameLobbySockets.chat(gameId, {
    username,
    message,
  });
  return response.sendStatus(204);
});

router.post('/api/game-lobby/:gameId/enter', authenticateUser, (request, response) => {
  const { gameId } = request.params;
  const { id } = response.locals.user;
  GameLobbySockets.enterGame(gameId, id);
  return response.sendStatus(204);
});

router.post('/api/game-lobby/:gameId/join', authenticateUser, (request, response) => {
  const { gameId } = request.params;
  const { id, username } = response.locals.user;
  return GameLobbyDB.joinGame(gameId, id)
    .then(result => {
      MainLobbySockets.joinGame(gameId, id, username);
      return response.json(result);
    })
    .catch(error => response.json({ error }));
});

router.post('/api/game-lobby/:gameId/leave', authenticateUser, authenticatePlayer, (request, response) => {
  const { gameId } = request.params;
  const { id, username } = response.locals.user;
  return GameLobbyDB.leaveGame(request.params.gameId, request.user.id)
    .then(result => {
      MainLobbySockets.leaveGame(gameId, id, username);
      GameLobbySockets.leaveGame(gameId, id, username);
      return response.json(result);
    })
    .catch(error => response.json({ error }));
});
router.post(
  '/api/game-lobby/:gameId/start',
  authenticateUser,
  authenticatePlayer,
  authenticateHost,
  (request, response) => {
    const { gameId } = request.params;
    const { id, username } = response.locals.user;
    return GameLobbyDB.getGameReady(gameId)
      .then(result => {
        if (result.ready) {
          return GameLobbyDB.startGame(gameId).then(result => {
            MainLobbySockets.startGame(gameId, id, username);
            GameLobbySockets.startGame(gameId, id, username);
            return response.json({ message: result.status });
          });
        } else {
          return response.json({ message: result.status });
        }
      })
      .catch(error => response.json({ error }));
  },
);

router.post('/api/game-lobby/:gameId/toggle-ready', authenticateUser, authenticatePlayer, (request, response) => {
  const { gameId } = request.params;
  const { id, username } = response.locals.user;
  return GameLobbyDB.togglePlayerReady(gameId, id)
    .then(result => {
      if (result[1].ready) {
        GameLobbySockets.playerReady(gameId, id, username);
      } else {
        GameLobbySockets.playerUnready(gameId, id, username);
      }
      return response.json(result);
    })
    .catch(error => response.json({ error }));
});

module.exports = router;
