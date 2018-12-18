const chat = sockets => (gameId, message) =>
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game-lobby:${gameId}:chat`, message)
    );

const enterGame = (globalSockets, sockets) => (gameId, userId) => {
  if (!(gameId in sockets)) {
    sockets.set(gameId, new Map());
  }
  sockets.get(gameId).set(userId, globalSockets.get(userId));
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game-lobby:${gameId}:enter-game`, gameId)
    );
};

const leaveGame = sockets => (gameId, userId, userName) =>
  sockets
    .get(gameId)
    .forEach(client_socket =>
      client_socket.emit(`game-lobby:${gameId}:leave-game`, {
        gameId,
        userId,
        userName
      })
    );

const playerReady = sockets => (gameId, userId, userName) =>
  sockets.get(gameId).forEach(client_socket =>
    client_socket.emit(`game-lobby:${gameId}:player-ready`, {
      gameId,
      userId,
      userName
    })
  );

const playerUnready = sockets => (gameId, userId, userName) =>
  sockets.get(gameId).forEach(client_socket =>
    client_socket.emit(`game-lobby:${gameId}:player-unready`, {
      gameId,
      userId,
      userName
    })
  );

const startGame = sockets => (gameId, userId, userName) =>
  sockets.get(gameId).forEach(client_socket =>
    client_socket.emit(`game-lobby:${gameId}:start-game`, {
      gameId,
      userId,
      userName
    })
  );

module.exports = (globalSockets, sockets) => ({
  chat: chat(sockets),
  enterGame: enterGame(globalSockets, sockets),
  leaveGame: leaveGame(sockets),
  playerReady: playerReady(sockets),
  playerUnready: playerUnready(sockets),
  startGame: startGame(sockets)
});
