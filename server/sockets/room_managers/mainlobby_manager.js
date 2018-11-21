const room = require('../room');

manager = () => {
  const mainlobby_room = room();
  const connected = client_socket => mainlobby_room.add_socket(client_socket);
  const disconnect = client_socket =>
    mainlobby_room.remove_socket(client_socket);
  const add_game = game_id => mainlobby_room.signal('add-game', game_id);
  const remove_game = game_id => mainlobby_room.signal('remove-game', game_id);
  const add_game_user = (game_id, name) =>
    mainlobby_room.signal('add-game-user', { game_id, name });
  const remove_game_user = (game_id, name) =>
    mainlobby_room.signal('remove-game-user', { game_id, name });
  return {
    connected,
    disconnect,
    add_game,
    remove_game,
    add_game_user,
    remove_game_user
  };
};

module.exports = manager;
