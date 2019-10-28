const gameActions = require('../gameActions');

module.exports = ({ Game, player }) => {
  if (null !== player) {
    if (gameActions.getHasThreeFullPropertySets({ Game, player })) {
      Game.winner = player;
      return true;
    }
  }
  if (1 === Game.players.length) {
    Game.winner = Game.players[0];
    return true;
  }
  return false;
};
