const router = require('express').Router();
const authenticateUser = require('./middlewares/authenticateUser');
const authenticatePlayer = require('./middlewares/authenticatePlayer');
const authenticateHost = require('./middlewares/authenticateHost');
const sendUserIdUserNameAndHostStatus = require('./middlewares/sendUserIdUserNameAndHostStatus');
const { Game } = require('../sockets');

router.get(
  '/game/:gameId',
  authenticateUser,
  authenticatePlayer,
  sendUserIdUserNameAndHostStatus
);

router.post(
  '/game/:gameId/chat',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id, name } = response.locals.user;
    const { message } = request.body;
    Game.chat(gameId, `[${id}]:${name}:${message}`);
    response.sendStatus(204);
  }
);

router.post(
  '/game/:gameId/click',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    const { clickInput } = request.body;
    Game.click(gameId, id, clickInput);
    response.sendStatus(204);
  }
);

router.post(
  '/game/:gameId/endTurn',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    Game.endTurn(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/game/:gameId/forfeit',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    Game.forfeit(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/game/:gameId/join',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    Game.join(gameId, id);
    response.sendStatus(204);
  }
);

router.post(
  '/game/:gameId/startGame',
  authenticateUser,
  authenticatePlayer,
  authenticateHost,
  (request, response) => {
    const { gameId } = request.params;
    Game.startGame(gameId);
    response.sendStatus(204);
  }
);

router.post(
  '/game/:gameId/update',
  authenticateUser,
  authenticatePlayer,
  (request, response) => {
    const { gameId } = request.params;
    const { id } = response.locals.user;
    Game.update(gameId, id);
    response.sendStatus(204);
  }
);

module.exports = router;
