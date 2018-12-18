const io = require('socket.io-client');
const server_address = require('./server_address');

const socket = io.connect(server_address);

socket.on('error', error => console.log(error));

const register_chat_handler = ({ on_message_received }) => {
  socket.on('message', on_message_received);
  const add_room = ({ room_id }, callback) =>
    socket.emit('add-room-chat', { room_id }, callback);
  const join = ({ room_id, user_name }, callback) =>
    socket.emit('join-chat', { room_id, user_name }, callback);
  const leave = ({ room_id, user_name }, callback) =>
    socket.emit('leave-chat', { room_id, user_name }, callback);
  const message = ({ room_id, message }, callback) =>
    socket.emit('message', { room_id, message }, callback);
  return {
    add_room,
    join,
    leave,
    message
  };
};

const register_game_handler = ({
  on_winner_received,
  on_leave_game_received,
  on_start_game_received,
  on_general_update_received,
  on_player_update_received,
  on_options_update_received
}) => {
  socket.on('winner', on_winner_received);
  socket.on('leave-game', on_leave_game_received);
  socket.on('start-game', on_start_game_received);
  socket.on('general-update', on_general_update_received);
  socket.on('player-update', on_player_update_received);
  socket.on('options-update', on_options_update_received);

  const start_game = ({ room_id, user_id, message }, callback) =>
    socket.emit('start-game', { room_id, user_id, message }, callback);

  const add_room_game = ({ room_id, user_id, message }, callback) =>
    socket.emit('add-room-game', { room_id, user_id, message }, callback);

  const join_room_game = ({ room_id, user_id, message }, callback) =>
    socket.emit('join-room-game', { room_id, user_id, message }, callback);

  const leave_room_game = ({ room_id, user_id, message }, callback) =>
    socket.emit('leave-room-game', { room_id, user_id, message }, callback);

  const click = ({ room_id, user_id, message }, callback) =>
    socket.emit('click', { room_id, user_id, message }, callback);

  const end_turn = ({ room_id, user_id, message }, callback) =>
    socket.emit('end-turn', { room_id, user_id, message }, callback);

  const general_update = ({ room_id, user_id, message }, callback) =>
    socket.emit('general-update', { room_id, user_id, message }, callback);

  const players_update = ({ room_id, user_id, message }, callback) =>
    socket.emit('players-update', { room_id, user_id, message }, callback);

  const options_update = ({ room_id, user_id, message }, callback) =>
    socket.emit('options-update', { room_id, user_id, message }, callback);

  return {
    start_game,
    add_room_game,
    join_room_game,
    leave_room_game,
    click,
    end_turn,
    general_update,
    players_update,
    options_update
  };
};

const register_gamelobby_handler = ({ on_player_ready, on_player_unready }) => {
  socket.on('player-ready', on_player_ready);
  socket.on('player-unready', on_player_unready);
  const add_room = ({ room_id }, callback) =>
    socket.emit('add-room-gamelobby', { room_id }, callback);
  const join = ({ room_id, user_name }, callback) =>
    socket.emit('join-gamelobby', { room_id, user_name }, callback);
  const leave = ({ room_id, user_name }, callback) =>
    socket.emit('leave-gamelobby', { room_id, user_name }, callback);
  const player_ready = ({ room_id, user_id }, callback) =>
    socket.emit('player-ready', { room_id, user_id }, callback);
  const player_unready = ({ room_id, user_id }, callback) =>
    socket.emit('player-unready', { room_id, user_id }, callback);
  return {
    add_room,
    join,
    leave,
    player_ready,
    player_unready
  };
};

const register_mainlobby_handler = ({
  on_add_game,
  on_join_game,
  on_leave_game,
  on_run_game
}) => {
  socket.on('add-game', on_add_game);
  socket.on('join-game', on_join_game);
  socket.on('leave-game', on_leave_game);
  socket.on('run-game', on_run_game);
  const add_game = ({ game_id, user_id }, callback) =>
    socket.emit('add-game', { game_id, user_id }, callback);
  const join_game = ({ game_id, user_id }, callback) =>
    socket.emit('join-game', { game_id, user_id }, callback);
  const leave_game = ({ game_id, user_id }, callback) =>
    socket.emit('leave-game', { game_id, user_id }, callback);
  const run_game = ({ game_id }, callback) =>
    socket.emit('run-game', { game_id }, callback);
  return {
    add_game,
    join_game,
    leave_game,
    run_game
  };
};

const unregister_chat_handler = () => {
  socket.off('message');
};

const unregister_game_handler = () => {
  socket.on('winner');
  socket.on('leave-game');
  socket.on('start-game');
  socket.on('general-update');
  socket.on('player-update');
  socket.on('options-update');
};

const unregister_gamelobby_handler = () => {
  socket.off('player-ready');
  socket.off('player-unready');
};

const unregister_mainlobby_handler = () => {
  socket.off('add-game');
  socket.off('join-game');
  socket.off('leave-game');
  socket.off('run-game');
};

export default () => {
  return {
    register_chat_handler,
    register_game_handler,
    register_gamelobby_handler,
    register_mainlobby_handler,
    unregister_chat_handler,
    unregister_game_handler,
    unregister_gamelobby_handler,
    unregister_mainlobby_handler
  };
};
