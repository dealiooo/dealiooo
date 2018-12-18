const gameActions = require('../../../gameActions');

module.exports = (Game, player, card, callback) => {
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard(Game, player);
  }
  callback(null, card);
};
