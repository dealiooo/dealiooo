const gameEngine = require('./../../game_engine');
const { Game } = require('./../../database/api');

const gameGlobals = new Map();
const runningGames = new Map();

const cancel = sockets => (gameId, userId) => {
  gameEngine.onCancelAction(gameGlobals.get(gameId), userId);
  sockets.get(gameId).forEach((value, key, map) => {
    let data = gameEngine.getVars(gameGlobals.get(gameId), key);
    value.emit(`game:${gameId}:game-update`, data);
  });
};

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
  const forfeitData = gameEngine.onForfeit(gameGlobals.get(gameId), userId);
  if (forfeitData) {
    Game.removePlayer(gameId, userId).then(_ => {
      sockets.get(gameId).forEach((value, key, _) => {
        let data = gameEngine.getVars(gameGlobals.get(gameId), key);
        if (!forfeitData.gameWon) {
          value.emit(`game:${gameId}:game-update`, data);
          value.emit(`game:${gameId}:game-forfeit`, forfeitData);
        } else {
          value.emit(`game:${gameId}:game-forfeit`, forfeitData);
          clearInterval(runningGames.get(gameId));
          runningGames.delete(gameId);
        }
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
  Game.startGame(gameId)
    .then(_ =>
      Game.getUserIdsAndUsernames(gameId).then(users => {
        gameGlobals.set(gameId, gameEngine.start(users));
        sockets.get(gameId).forEach((socket, userId, _) => {
          socket.emit(`game:${gameId}:start-game`, 'game is started');
          runningGames.set(
            gameId,
            setInterval(() => tick(socket, userId, gameId), 1000)
          );
        });
      })
    )
    .catch(error => console.log(error));
};

const loadGame = sockets => gameId => {
  sockets.get(gameId).forEach((socket, userId, _) => {
    socket.emit(`game:${gameId}:start-game`, 'game is started');
    runningGames.set(
      gameId,
      setInterval(() => tick(socket, userId, gameId), 1000)
    );
  });
};

const tick = (socket, userId, gameId) => {
  let data = gameEngine.getVars(gameGlobals.get(gameId), userId);
  socket.emit(`game:${gameId}:game-update`, data);
};

const update = sockets => (gameId, _) => {
  sockets.get(gameId).forEach((value, key, _) => {
    let data = gameEngine.getVars(gameGlobals.get(gameId), key);
    value.emit(`game:${gameId}:game-update`, data);
  });
};

module.exports = (globalSockets, sockets) => ({
  cancel: cancel(sockets),
  chat: chat(sockets),
  click: click(sockets),
  endTurn: endTurn(sockets),
  forfeit: forfeit(sockets),
  join: join(globalSockets, sockets),
  startGame: startGame(sockets),
  loadGame: loadGame(sockets),
  update: update(sockets)
});
