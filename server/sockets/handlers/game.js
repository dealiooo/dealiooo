const gameEngine = require('./../../game_engine');
const { Game } = require('./../../database/api');

const gameGlobals = new Map();

const chat = sockets => (gameId, message) =>
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game:${gameId}:chat`, message)
    );

const click = sockets => (gameId, userId, clickInput) => {
  gameEngine.input(gameGlobals.get(gameId), clickInput, userId);

  sockets.get(gameId).forEach((value, key, map) => {
    let data = gameEngine.getVars(gameGlobals.get(gameId), key);
    value.emit(`game:${gameId}:game-update`, data);
  });
};

const endTurn = sockets => (gameId, userId) => {
  gameEngine.onEndTurn(gameGlobals.get(gameId), userId);
  sockets.get(gameId).forEach((value, key, map) => {
    let data = gameEngine.getVars(gameGlobals.get(gameId), key);
    value.emit(`game:${gameId}:game-update`, data);
  });
};

const forfeit = sockets => (gameId, userId) => {
  if (gameEngine.onLeaveGame(gameGlobals.get(gameId), userId)) {
    Game.removePlayer(gameId, userId).then(_ => {
      sockets.get(gameId).forEach((value, key, map) => {
        let data = gameEngine.getVars(gameGlobals.get(gameId), key);
        value.emit(`game:${gameId}:game-update`, data);
        value.emit(
          `game:${gameId}:game-forfeit`,
          `${userId} has left the game`
        );
      });
    });
  }
};

const join = (globalSockets, sockets) => (gameId, userId) => {
  if (undefined === sockets.get(gameId)) {
    sockets.set(gameId, new Map());
    gameGlobals.set(gameId, null);
  }
  sockets.get(gameId).set(userId, globalSockets.get(userId));
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(
        `game:${gameId}:chat`,
        `userId:${userId} has joined the room.`
      )
    );
};

const startGame = sockets => gameId => {
  Game.getUserIds(gameId).then(userIds => {
    gameGlobals.set(gameId, gameEngine.start(userIds.map(userId => userId.id)));
    sockets
      .get(gameId)
      .forEach(client_socket =>
        client_socket.emit(`game:${gameId}:start-game`, 'game is started')
      );
  });
};

const update = sockets => (gameId, userId) => {
  sockets.get(gameId).forEach((value, key, map) => {
    let data = gameEngine.getVars(gameGlobals.get(gameId), key);
    value.emit(`game:${gameId}:game-update`, data);
  });
};

module.exports = (globalSockets, sockets) => ({
  chat: chat(sockets),
  click: click(sockets),
  endTurn: endTurn(sockets),
  forfeit: forfeit(sockets),
  join: join(globalSockets, sockets),
  startGame: startGame(sockets),
  update: update(sockets)
});
