const serverSocket = require('socket.io')();

serverSocket.on('connection', clientSocket => {
  /* TODO */
});

module.exports = serverSocket;
