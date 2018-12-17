const room = require('../room');
const gameEngine = require('./../../game_engine');

manager = () => {
  const rooms = new Map();
  const pendings = new Map();
  const disconnect = client_socket =>
    rooms.forEach(room => room.remove_socket(client_socket.id));
  const add_room = (room_id, client_socket) => {
    rooms.set(room_id, room(room_id));
    rooms.get(room_id).add_socket(client_socket);
    pendings.set(room_id, null);
  };
  const remove_room = room_id => {
    rooms.delete(room_id);
    pendings.delete(room_id);
  };
  const get_room = room_id => rooms.get(room_id);
  const leave_game = (room_id, player_id) =>
    gameEngine.leave_game(player_id).then(({ message, pending }) => {
      pendings.set(room_id, pending);
      if (message.winner) {
        rooms.get(room_id).signal('winner', message);
      } else {
        rooms.get(room_id).signal('leave-game', message);
      }
    });

  const click = (room_id, player_id, msg) =>
    gameEngine
      .click(player_id, msg, pendings.get(room_id))
      .then(({ message, pending }) => {
        pendings.set(room_id, pending);
        if (message.winner) {
          rooms.get(room_id).signal('winner', message);
        } else {
          rooms.get(room_id).signal('message', message);
        }
      });

  const end_turn = (room_id, player_id) =>
    gameEngine.end_turn(player_id).then(({ message, pending }) => {
      pendings.set(room_id, pending);
      if (message.winner) {
        rooms.get(room_id).signal('winner', message);
      } else {
        rooms.get(room_id).signal('message', message);
      }
    });

  const general_update = (room_id, player_id) =>
    gameEngine.general_prompt(player_id).then(message => {
      rooms.get(room_id).signal('general_update', message);
    });

  const players_update = (room_id, player_id) =>
    gameEngine.players_prompt(player_id).then(message => {
      rooms.get(room_id).signal('players_update', message);
    });

  const options_update = (room_id, player_id) =>
    gameEngine.options_prompt(player_id).then(message => {
      rooms.get(room_id).signal('options_update', message);
    });

  return {
    disconnect,
    add_room,
    remove_room,
    get_room,
    leave_game,
    click,
    end_turn,
    general_update,
    players_update,
    options_update
  };
};

module.exports = manager;
