const handle_room = room_manager => {
  const exist = (getter, error_message) =>
    new Promise((resolve, reject) => {
      const resolved = getter();
      if (resolved) {
        return resolve(resolved);
      } else {
        return reject(error_message);
      }
    });
  const room_exist = room_id =>
    exist(room_manager.get_room(room_id), `room not found ${room_id}`);
  const handle_room_event = (room_id, event) =>
    room_exist(room_id).then(room => {
      room.broadcast({ event });
      return room;
    });
  return handle_room_event;
};

const handlers = (client_socket, room_manager) => {
  const handle_room_event = handle_room(room_manager);
  const name = client_socket.id;
  const handle_connection = _ => room_manager.connected(client_socket);

  const handle_disconnect = _ => room_manager.disconnect(client_socket);

  const handle_join = ({ room_id }, callback) => {
    const join_message = `${moment().format(
      'HH:mm:ss'
    )}:${name} joined the room.`;
    handle_room_event(room_id, join_message)
      .then(room => {
        room.add_socket(client_socket);
        callback(null);
      })
      .catch(callback);
  };

  const handle_leave = ({ room_id }, callback) => {
    const leave_message = `${moment().format(
      'HH:mm:ss'
    )}:${name} left the room.`;
    handle_room_event(room_id, leave_message)
      .then(room => {
        room.remove_socket(client_socket);
        if (room.is_empty()) {
          room_manager.remove_room(room_id);
        }
        callback(null);
      })
      .catch(callback);
  };

  const handle_message = ({ room_id, message }, callback) =>
    handle_room_event(room_id, message)
      .then(_ => callback(null))
      .catch(callback);

  const handle_add_room = ({ room_id }, callback) =>
    room_manager
      .add_room(room_id, client_socket)
      .then(_ => callback(null))
      .catch(callback);

  const handle_add_game = ({ game_id }, callback) =>
    room_manager
      .add_game(game_id)
      .then(_ => callback(null))
      .catch(callback);

  const handle_join_game = ({ game_id }, callback) =>
    room_manager
      .join_game(game_id, name)
      .then(_ => callback(null))
      .catch(callback);

  const handle_leave_game = ({ game_id }, callback) =>
    room_manager
      .leave_game(game_id, name)
      .then(_ => callback(null))
      .catch(callback);

  const handle_run_game = ({ game_id }, callback) =>
    room_manager
      .remove_game(game_id)
      .then(_ => callback(null))
      .catch(callback);

  const handle_player_ready = ({ game_id }, callback) =>
    room_manager
      .player_ready(game_id, client_socket)
      .then(_ => callback(null))
      .catch(callback);

  const handle_player_unready = ({ game_id }, callback) =>
    room_manager
      .player_unready(game_id, client_socket)
      .then(_ => callback(null))
      .catch(callback);

  const handle_card_click = ({ game_id }, callback) => callback('TODO');

  const handle_card_move = ({ game_id }, callback) => callback('TODO');

  const handle_end_turn = ({ game_id }, callback) => callback('TODO');

  return {
    handle_connection,
    handle_disconnect,
    handle_add_room,
    handle_join,
    handle_leave,
    handle_message,
    handle_add_game,
    handle_join_game,
    handle_leave_game,
    handle_run_game,
    handle_player_ready,
    handle_player_unready,
    handle_card_click,
    handle_card_move,
    handle_end_turn
  };
};

module.exports = handlers;
