const db = require('../models');
const authInit = require('./auth');
const gameInit = require('./game');
const gameLobbyInit = require('./gameLobby');
const mainLobbyInit = require('./mainLobby');

module.exports = {
  Auth: authInit(db),
  Game: gameInit(db),
  GameLobby: gameLobbyInit(db),
  MainLobby: mainLobbyInit(db)
};
