const chat = sockets => message =>
  sockets.forEach(client_socket => {
    client_socket.emit('main-lobby:chat', message);
  });

const createGame = sockets => (gameId, userId, username, roomName, playerCap) =>
  sockets.forEach(client_socket =>
    client_socket.emit('main-lobby:create-game', {
      gameId,
      userId,
      username,
      roomName,
      playerCap,
    }),
  );

const endGame = sockets => (gameId, userId, username) =>
  sockets.forEach(client_socket => client_socket.emit('main-lobby:end-game', { gameId, userId, username }));

const joinGame = sockets => (gameId, userId, username) =>
  sockets.forEach(client_socket => client_socket.emit('main-lobby:join-game', { gameId, userId, username }));

const leaveGame = sockets => (gameId, userId, username) =>
  sockets.forEach(client_socket => client_socket.emit('main-lobby:leave-game', { gameId, userId, username }));

const startGame = sockets => (gameId, userId, username) =>
  sockets.forEach(client_socket => client_socket.emit('main-lobby:start-game', { gameId, userId, username }));

module.exports = sockets => ({
  chat: chat(sockets),
  createGame: createGame(sockets),
  endGame: endGame(sockets),
  joinGame: joinGame(sockets),
  leaveGame: leaveGame(sockets),
  startGame: startGame(sockets),
});
