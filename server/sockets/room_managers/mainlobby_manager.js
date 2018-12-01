const room = require('../room');

manager = () => {
  const mainlobby_room = room();
  const connected = client_socket => mainlobby_room.add_socket(client_socket);
  const disconnect = client_socket =>
    mainlobby_room.remove_socket(client_socket);
  const add_game = (game_id, user_id) =>
    mainlobby_room.signal('add-game', { game_id, user_id });
  const run_game = game_id => mainlobby_room.signal('run-game', { game_id });
  const join_game = (game_id, user_id) =>
    mainlobby_room.signal('join-game', { game_id, user_id });
  const leave_game = (game_id, user_id) =>
    mainlobby_room.signal('leave-game', { game_id, user_id });
  return {
    connected,
    disconnect,
    add_game,
    run_game,
    join_game,
    leave_game
  };
};

module.exports = manager;
