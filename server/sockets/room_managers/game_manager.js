const room = require('../room');
const gameEngine = require('./../../../game/src/game_engine');
const { Game } = require('./../../database/api');
manager = () => {
  const rooms = new Map();
  const globals = new Map();
  const disconnect = client_socket =>
    rooms.forEach(room => room.remove_socket(client_socket.id));
  const add_room = (room_id, client_socket) => {
    rooms.set(room_id, room(room_id));
    rooms.get(room_id).add_socket(client_socket);
    globals.set(room_id, null);
  };
  const remove_room = room_id => {
    rooms.delete(room_id);
    globals.delete(room_id);
  };
  const get_room = room_id => rooms.get(room_id);
  const leave_game = (room_id, player_id) => {
    gameEngine.on_leave_game(globals.get(room_id), player_id);
    if (globals.get(room_id).winner) {
      rooms.get(room_id).signal('winner', globals.get(room_id).winner);
    } else {
      rooms
        .get(room_id)
        .signal('leave-game', `${player_id} tried to leave the game`);
    }
  };
  const startGame = room_id =>
    Game.getPlayerIds(room_id).then(playerIds => {
      globals.set(room_id, gameEngine.startGame(playerIds));
      rooms.get(room_id).signal('start-game', 'game has started');
    });

  const click = (room_id, player_id, msg) => {
    gameEngine.input(globals.get(room_id), msg, player_id);
  };

  const end_turn = (room_id, player_id) =>
    gameEngine.on_end_turn(globals.get(room_id, player_id));

  const general_update = (room_id, player_id) =>
    rooms
      .get(room_id)
      .signal(
        'general-update',
        gameEngine.prompt_general_info(globals.get(room_id))
      );

  const players_update = (room_id, player_id) =>
    rooms
      .get(room_id)
      .signal(
        'players-update',
        gameEngine.prompt_player_info(globals.get(room_id), player_id)
      );

  const options_update = (room_id, player_id) =>
    rooms
      .get(room_id)
      .signal(
        'options-update',
        gameEngine.prompt_options_info(globals.get(room_id))
      );

  return {
    disconnect,
    add_room,
    remove_room,
    get_room,
    leave_game,
    startGame,
    click,
    end_turn,
    general_update,
    players_update,
    options_update
  };
};

module.exports = manager;
