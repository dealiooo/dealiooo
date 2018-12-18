const gameEngine = require('./../../game_engine');
const { Game } = require('./../../database/api');

const gameGlobals = {};

const chat = sockets => (gameId, message) =>
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game:${gameId}:chat`, message)
    );

const click = sockets => (gameId, userId, clickInput) => {
  gameEngine.input(gameGlobals.get(gameId), clickInput, userId);
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(
        `game:${gameId}:player-action`,
        `userId:${userId} click ${clickInput}.`
      )
    );
};

const endTurn = sockets => (gameId, userId) => {
  gameEngine.on_end_turn(gameGlobals.get(gameId), userId);
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(
        `game:${gameId}:player-action`,
        `userId:${userId} tried to end turn.`
      )
    );
};

const forfeit = sockets => (gameId, userId) => {
  if (gameEngine.on_leave_game(gameGlobals.get(gameId), userId)) {
    Game.removePlayer(gameId, userId).then(_ =>
      sockets
        .get(gameId)
        .forEach(client_socket =>
          client_socket.emit(
            `game:${gameId}:player-action`,
            `userId:${userId} has left the game.`
          )
        )
    );
  }
};

const join = (globalSockets, sockets) => (gameId, userId) => {
  if (!(gameId in sockets)) {
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
    gameGlobals.set(gameId, gameEngine.start(userIds));
    sockets
      .get(gameId)
      .forEach(client_socket =>
        client_socket.emit(`game:${gameId}:start-game`, 'game is started')
      );
  });
};

const update = sockets => (gameId, userId) => {
  let data = gameEngine.getVars(gameGlobals.get(gameId), userId);
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game:${gameId}:game-update`, data)
    );
  if (data.winner) {
    gameGlobals.delete(gameId);
  }
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
