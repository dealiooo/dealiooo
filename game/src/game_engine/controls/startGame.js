const globalVars = require('../globalVars.js');
const gameActions = require('../actions');

const startGame = player_ids => {
  let Game = globalVars(player_ids);
  for (let i = 0; i < 5 * player_ids.length; i++) {
    gameActions.drawCard(Game, Game.players[i % player_ids.length]);
  }
  return Game;
};

module.exports = startGame;
