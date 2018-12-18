const moment = require('moment');

const handle_room = room_manager => {
  const exist = (getter, error_message) =>
    new Promise((resolve, reject) => {
      const resolved = getter;
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
      room.broadcast('message', { event });
      return room;
    });
  return handle_room_event;
};

const handlers = (client_socket, room_manager) => {
  const handle_room_event = handle_room(room_manager);

  const handle_connection = _ => room_manager.connected(client_socket);

  const handle_disconnect = _ => room_manager.disconnect(client_socket);

  const handle_join = ({ room_id, user_name }, callback) => {
    const join_message = `${moment().format(
      'HH:mm:ss'
    )}:${user_name} joined the room.`;
    handle_room_event(room_id, join_message)
      .then(room => {
        room.add_socket(client_socket);
        callback(null);
      })
      .catch(callback);
  };

  const handle_leave = ({ room_id, user_name }, callback) => {
    const leave_message = `${moment().format(
      'HH:mm:ss'
    )}:${user_name} left the room.`;
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

  const handle_add_room = ({ room_id }, callback) => {
    try {
      room_manager.add_room(room_id, client_socket);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_start_game = ({ game_id }, callback) => {
    try {
      room_manager.startGame(game_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_add_game = ({ game_id, user_id }, callback) => {
    try {
      room_manager.add_game(game_id, user_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_join_game = ({ game_id, user_id }, callback) => {
    try {
      room_manager.join_game(game_id, user_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_leave_game = ({ game_id, user_id }, callback) => {
    try {
      room_manager.leave_game(game_id, user_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_run_game = ({ game_id }, callback) => {
    try {
      room_manager.run_game(game_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_player_ready = ({ room_id, user_id }, callback) => {
    try {
      room_manager.player_ready(room_id, user_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_player_unready = ({ room_id, user_id }, callback) => {
    try {
      room_manager.player_unready(room_id, user_id);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  };

  const handle_click = ({ room_id, player_id, message }, callback) => {
    try {
      room_manager.click(room_id, player_id, message);
      return callback(null);
    } catch (error) {
      return callback(errror);
    }
  };

  const handle_end_turn = ({ room_id, player_id }, callback) => {
    try {
      room_manager.end_turn(room_id, player_id);
      return callback(null);
    } catch (error) {
      return callback(errror);
    }
  };

  const handle_general_update = ({ room_id, player_id }, callback) => {
    try {
      room_manager.general_update(room_id, player_id);
      return callback(null);
    } catch (error) {
      return callback(errror);
    }
  };

  const handle_players_update = ({ room_id, player_id }, callback) => {
    try {
      room_manager.players_update(room_id, player_id);
      return callback(null);
    } catch (error) {
      return callback(errror);
    }
  };

  const handle_options_update = ({ room_id, player_id }, callback) => {
    try {
      room_manager.options_update(room_id, player_id);
      return callback(null);
    } catch (error) {
      return callback(errror);
    }
  };

  return {
    handle_connection,
    handle_disconnect,
    handle_add_room,
    handle_join,
    handle_leave,
    handle_message,
    handle_start_game,
    handle_add_game,
    handle_join_game,
    handle_leave_game,
    handle_run_game,
    handle_player_ready,
    handle_player_unready,
    handle_click,
    handle_end_turn,
    handle_general_update,
    handle_players_update,
    handle_options_update
  };
};

module.exports = handlers;
