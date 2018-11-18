const io = require('socket.io')();
const session = require('../database/config/session');

const init = server => {
  io.use(({ request }, next) => {
    session(request, request.res, next);
  });

  io.attach(server);
};

const userSockets = {};

io.on('connection', socket => {
  try {
    const { user: userId } = socket.request.session.passport;

    userSockets[userId] = socket;

    socket.on('disconnect', () => {
      delete userSockets[userId];
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { init, io, userSockets };
