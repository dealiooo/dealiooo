const gameActions = require('./../game_actions');

module.exports = player =>
  gameActions.drawCard(player).then(_ => gameActions.drawCard(player));
