const io = require('socket.io-client');
//const serverAddress = require('./serverAddress');

module.exports = io.connect('https://team-h.herokuapp.com/');
