const db = require('../models');
const authInit = require('./auth');
const gameInit = require('./game');
const gameLobbyInit = require('./game_lobby');
const mainLobbyInit = require('./main_lobby');

module.exports = {
  Auth: authInit(db),
  Game: gameInit(db),
  GameLobby: gameLobbyInit(db),
  MainLobby: mainLobbyInit(db)
};
