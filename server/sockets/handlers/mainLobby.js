const chat = sockets => message =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:chat', message)
  );

const createGame = sockets => (gameId, userId, userName, roomName, playerCap) =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:create-game', {
      gameId,
      userId,
      userName,
      roomName,
      playerCap
    })
  );

const endGame = sockets => (gameId, userId, userName) =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:end-game', { gameId, userId, userName })
  );

const joinGame = sockets => (gameId, userId, userName) =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:join-game', { gameId, userId, userName })
  );

const leaveGame = sockets => (gameId, userId, userName) =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:leave-game', { gameId, userId, userName })
  );

const startGame = sockets => (gameId, userId, userName) =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:start-game', { gameId, userId, userName })
  );

module.exports = sockets => ({
  chat: chat(sockets),
  createGame: createGame(sockets),
  endGame: endGame(sockets),
  joinGame: joinGame(sockets),
  leaveGame: leaveGame(sockets),
  startGame: startGame(sockets)
});
