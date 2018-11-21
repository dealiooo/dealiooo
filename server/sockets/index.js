const io = require('socket.io')();
const session = require('../database/config/session');
const handlers = require('./handlers');
const chat_manager = require('./room_managers/chat_manager')();
const game_manager = require('./room_managers/game_manager')();
const gamelobby_manager = require('./room_managers/gamelobby_manager')();
const mainlobby_manager = require('./room_managers/mainlobby_manager')();

const init = server => {
  io.use(({ request }, next) => {
    session(request, request.res, next);
  });

  io.attach(server);
};

const userSockets = {};

io.on('connection', socket => {
  try {
    const chat_handlers = handlers(socket, chat_manager);
    const game_handlers = handlers(socket, game_manager);
    const gamelobby_handlers = handlers(socket, gamelobby_manager);
    const mainlobby_handlers = handlers(socket, mainlobby_manager);

    mainlobby_handlers.handle_connection();

    socket.on('add-room-chat', chat_handlers.handle_add_room);
    socket.on('join-chat', chat_handlers.handle_join);
    socket.on('leave-chat', chat_handlers.handle_leave);
    socket.on('message', chat_handlers.handle_message);

    socket.on('add-room-game', game_handlers.handle_add_room);
    socket.on('join-game', game_handlers.handle_join);
    socket.on('leave-game', game_handlers.handle_leave);
    socket.on('card-click', game_handlers.handle_card_click);
    socket.on('card-move', game_handlers.handle_card_move);
    socket.on('end-turn', game_handlers.handle_end_turn);

    socket.on('add-room-gamelobby', gamelobby_handlers.handle_add_room);
    socket.on('join-gamelobby', gamelobby_handlers.handle_join);
    socket.on('leave-gamelobby', gamelobby_handlers.handle_leave);
    socket.on('player-ready', gamelobby_handlers.handle_player_ready);
    socket.on('player-unready', gamelobby_handlers.handle_player_unready);

    socket.on('add-game', mainlobby_handlers.handle_add_game);
    socket.on('join-game', mainlobby_handlers.handle_join_game);
    socket.on('leave-game', mainlobby_handlers.handle_leave_game);
    socket.on('run-game', mainlobby_handlers.handle_run_game);

    socket.on('disconnect', () => {
      chat_handlers.handle_disconnect();
      game_handlers.handle_disconnect();
      gamelobby_handlers.handle_disconnect();
      gamelobby_handlers.handle_disconnect();
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { init, io, userSockets };
