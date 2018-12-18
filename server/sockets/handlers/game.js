const join = sockets => (gameId, userId, socket) => {
  if (!(gameId in sockets)) {
    sockets[gameId] = {};
  }
  sockets[gameId][userId] = socket;
};

const endTurn = sockets => (gameId, userId, socket) => {};

const startGame = sockets => gameId => {};

const forfeit = sockets => gameId => {};

const endGame = sockets => gameId => {};

module.exports = sockets => ({
  join: join(sockets)
});
