const router = require('express').Router();
const { io } = require('../sockets');
const requireAuthentication = require('../authentication/requireAuthentication');
const db = require('../database');

router.post('/chat/:room_id', requireAuthentication, (request, response) => {
  const { room_id } = request.params;
  const { name } = request.user;
  const { message } = request.body;

  io.emit(`chat:${room_id}`, {
    name,
    message,
    timestamp: moment().format('HH:mm:ss')
  });
  response.sendStatus(204);
});

router.post(
  '/create-game/:game_id',
  requireAuthentication,
  (request, response) => {
    const { game_id } = request.params;

    io.emit('main-lobby', {
      action: 'created',
      game: game_id,
      timestamp: moment().format('HH:mm:ss')
    });
    response.sendStatus(204);
  }
);

router.post(
  '/join-game/:game_id',
  requireAuthentication,
  (request, response) => {
    const { game_id } = request.params;
    const { name } = request.user;

    io.emit('main-lobby', {
      action: 'joined',
      name: name,
      game: game_id,
      timestamp: moment().format('HH:mm:ss')
    });
    response.sendStatus(204);
  }
);

router.post(
  '/leave-game/:game_id',
  requireAuthentication,
  (request, response) => {
    const { game_id } = request.params;
    const { name } = request.user;

    io.emit('main-lobby', {
      action: 'left',
      name: name,
      game: game_id,
      timestamp: moment().format('HH:mm:ss')
    });
    response.sendStatus(204);
  }
);

router.post(
  '/run-game/:game_id',
  requireAuthentication,
  (request, response) => {
    const { game_id } = request.params;

    io.emit('game-lobby', {
      action: 'run',
      game: game_id,
      timestamp: moment().format('HH:mm:ss')
    });
    response.sendStatus(204);
  }
);

router.post(
  '/player-ready/:room_id',
  requireAuthentication,
  (request, response) => {
    const { room_id } = request.params;
    const { id } = request.user;

    io.emit(`chat:${room_id}`, {
      id,
      action: 'ready',
      timestamp: moment().format('HH:mm:ss')
    });

    response.sendStatus(204);
  }
);

router.post(
  '/player-unready/:room_id',
  requireAuthentication,
  (request, response) => {
    const { room_id } = request.params;
    const { id } = request.user;

    io.emit(`chat:${room_id}`, {
      id,
      action: 'unready',
      timestamp: moment().format('HH:mm:ss')
    });

    response.sendStatus(204);
  }
);

router.post(
  '/game/:game_id/card/:game_user_card_id/click',
  requireAuthentication,
  (request, response) => {
    const { game_id, game_user_card_id } = request.params;
    const { id } = request.user;
    // TODO
    response.sendStatus(500);
  }
);

router.post(
  '/game/:game_id/card/:game_user_card_id/move/:new_x/:new_y',
  requireAuthentication,
  (request, response) => {
    const { game_id, game_user_card_id, new_x, new_y } = request.params;
    const { id } = request.user;
    // TODO
    response.sendStatus(500);
  }
);

router.post(
  '/game/:game_id/end_turn',
  requireAuthentication,
  (request, response) => {
    const { game_id, game_user_card_id } = request.params;
    const { id } = request.user;
    // TODO
    response.sendStatus(500);
  }
);

module.exports = router;
