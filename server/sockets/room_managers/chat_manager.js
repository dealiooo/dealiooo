const room = require('../room');

manager = () => {
  const rooms = new Map();
  rooms.set('mainlobby', room());
  const disconnect = client_socket =>
    rooms.forEach(room => room.remove_socket(client_socket.id));
  const add_room = room_id => rooms.set(room_id, room(room_id));
  const remove_room = room_id => rooms.delete(room_id);
  const get_room = room_id => rooms.get(room_id);
  return {
    disconnect,
    add_room,
    remove_room,
    get_room
  };
};

module.exports = manager;
