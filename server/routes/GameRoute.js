const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const authenticatePlayer = require('./middlewares/authenticatePlayer');
const authenticateHost = require('./middlewares/authenticateHost');
const sendUserIdUserNameAndHostStatus = require('./middlewares/sendUserIdUserNameAndHostStatus');
const { Game: GameSockets } = require('../sockets');
const { Game: GameDB, Log: LogDB } = require('../database/api');

router.get(
  '/api/game/:gameId',
  authenticateUser,
  authenticatePlayer,
  sendUserIdUserNameAndHostStatus
);

router.get(
  '/api/game/:gameId/status',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    GameDB.getStatus(gameId)
      .then(result => response.json({ result }))
      .catch(error => {
        return response.json({ error });
      });
  }
);

router.post(
  '/api/game/:gameId/cancel',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    GameSockets.cancel(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/chat',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { username } = response.locals.user;
    const { message } = request.body;
    const formattedMessage = `${username}: ${message}`;
    LogDB.insertChatLog(gameId, formattedMessage).then(_ => {
      GameSockets.chat(gameId, formattedMessage);
      response.sendStatus(204);
    });
  }
);

router.get(
  '/api/game/:gameId/chat',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    LogDB.getChatLogs(gameId).then(log => {
      response.json(log);
    });
  }
);

router.post(
  '/api/game/:gameId/click',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    const { clickInput } = request.body;
    GameSockets.click(gameId, id, clickInput);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/endTurn',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    GameSockets.endTurn(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/forfeit',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    GameSockets.forfeit(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/join',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    GameSockets.join(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/startGame',
  authenticateUser,
  authenticatePlayer,
  authenticateHost,
  (request, response) => {
    const { gameId } = request.params;
    GameSockets.startGame(gameId);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/loadGame',
  authenticateUser,
  authenticatePlayer,
  authenticateHost,
  (request, response) => {
    const { gameId } = request.params;
    GameSockets.loadGame(gameId);
    response.sendStatus(204);
  }
);

router.post(
  '/api/game/:gameId/update',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    GameSockets.update(gameId, id);
    response.sendStatus(204);
  }
);

module.exports = router;
