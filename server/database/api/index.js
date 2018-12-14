const associationInit = require('./association');
const authInit = require('./auth');
const gameInit = require('./game');
const gameLobbyInit = require('./game_lobby');
const mainLobbyInit = require('./main_lobby');

const db = associationInit(require('../models'));

module.exports = {
  Auth: authInit(db),
  Game: gameInit(db),
  GameLobby: gameLobbyInit(db),
  MainLobby: mainLobbyInit(db)
};
