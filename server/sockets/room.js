const room = _ => {
  const client_sockets = new Map();
  const broadcast = message => signal('message', message);
  const signal = (signal, message) =>
    client_sockets.forEach(client_socket =>
      client_socket.emit(signal, message)
    );
  const add_socket = client_socket =>
    client_sockets.set(client_socket.id, client_socket);
  const remove_socket = client_socket =>
    client_sockets.delete(client_socket.id);
  const is_empty = _ => client_sockets.size;
  return {
    broadcast,
    signal,
    add_socket,
    remove_socket,
    is_empty
  };
};

module.exports = room;
