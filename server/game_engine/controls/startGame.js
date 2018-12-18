const globalVars = require('../globalVars');
const gameActions = require('../actions');

module.exports = playerIds => {
  let Game = globalVars(playerIds);
  for (let i = 0; i < 5 * playerIds.length; i++) {
    gameActions.drawCard(Game, Game.players[i % playerIds.length]);
  }
  return Game;
};
