const gameEngine = require('./../../game_engine');
const { Game } = require('./../../database/api');

const gameGlobals = {};

const chat = sockets => (gameId, message) =>
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game:${gameId}:chat`, message)
    );

const click = sockets => (gameId, playerId, clickInput) => {
  gameEngine.input(gameGlobals.get(gameId), clickInput, playerId);
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(
        `game:${gameId}:player-action`,
        `playerId:${playerId} click ${clickInput}.`
      )
    );
};

const endTurn = sockets => (gameId, playerId) => {
  gameEngine.on_end_turn(gameGlobals.get(gameId), playerId);
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(
        `game:${gameId}:player-action`,
        `playerId:${playerId} tried to end turn.`
      )
    );
};

const forfeit = sockets => (gameId, playerId) => {
  if (gameEngine.on_leave_game(gameGlobals.get(gameId), playerId)) {
    Game.removePlayer(playerId).then(_ =>
      sockets
        .get(gameId)
        .forEach(client_socket =>
          client_socket.emit(
            `game:${gameId}:player-action`,
            `playerId:${playerId} has left the game.`
          )
        )
    );
  }
};

const join = (globalSockets, sockets) => (gameId, userId, playerId) => {
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
        `playerId:${playerId} has joined the room.`
      )
    );
};

const startGame = sockets => gameId => {
  Game.getPlayerIds(gameId).then(playerIds => {
    gameGlobals.set(gameId, gameEngine.start(playerIds));
    sockets
      .get(gameId)
      .forEach(client_socket =>
        client_socket.emit(`game:${gameId}:start-game`, 'game is started')
      );
  });
};

const update = sockets => (gameId, playerId) => {
  let data = gameEngine.getVars(gameGlobals.get(gameId), playerId);
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
