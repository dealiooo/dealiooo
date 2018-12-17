const gameActions = require('./../../game_actions');

module.exports = (player, card, callback) =>
  gameActions.moveCardToBank(player, card).then(_ => callback(null, card));
