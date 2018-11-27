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

const register_game_handler = ({ todo }) => {
  console.log('TODO');
  return {
    error: todo
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
  const player_ready = ({ room_id }, callback) =>
    socket.emit('player-ready', { room_id }, callback);
  const player_unready = ({ room_id }, callback) =>
    socket.emit('player-unready', { room_id }, callback);
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
  console.log('TODO');
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
