const room = require('../room');

manager = () => {
  const mainlobby_room = room();
  const connected = client_socket => mainlobby_room.add_socket(client_socket);
  const disconnect = client_socket =>
    mainlobby_room.remove_socket(client_socket);
  const add_game = game_id => mainlobby_room.signal('add-game', game_id);
  const remove_game = game_id => mainlobby_room.signal('remove-game', game_id);
  const join_game = (game_id, name) =>
    mainlobby_room.signal('join-game', { game_id, name });
  const leave_game = (game_id, name) =>
    mainlobby_room.signal('leave-game', { game_id, name });
  return {
    connected,
    disconnect,
    add_game,
    remove_game,
    join_game,
    leave_game
  };
};

module.exports = manager;
