const io = require('socket.io')();
const session = require('../database/config/session');
const {
  GameHandler,
  GameLobbyHandler,
  MainLobbyHandler
} = require('./handlers');
const init = server => {
  io.use(({ request }, next) => {
    session(request, request.res, next);
  });

  io.attach(server);
};

const gameSockets = new Map();
const mainLobbySockets = new Map();
const gameLobbySockets = new Map();

io.on('connection', socket => {
  try {
    if (socket.request.session.passport) {
      const { user: userId } = socket.request.session.passport;
      mainLobbySockets.set(userId, socket);
      socket.on('disconnect', () => {
        mainLobbySockets.delete(userId);
        Object.keys(gameSockets).map(gameId =>
          gameSockets.get(gameId).delete(userId)
        );
        Object.keys(gameLobbySockets).map(roomId =>
          gameLobbySockets.get(roomId).delete(userId)
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  init,
  Game: GameHandler(mainLobbySockets, gameSockets),
  GameLobby: GameLobbyHandler(mainLobbySockets, gameLobbySockets),
  MainLobby: MainLobbyHandler(mainLobbySockets)
};
