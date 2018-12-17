const gameActions = require('./../game_actions');

module.exports = (game, player = null) => {
  if (null !== player) {
    return gameActions.getHasThreeFullPropertySets(player);
  } else {
    return game.getPlayers().then(players => 1 === players.length);
  }
};
