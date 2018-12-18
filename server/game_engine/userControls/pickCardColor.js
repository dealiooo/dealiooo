const userActions = require('./../userActions');

module.exports = (Game, player, card, callback) => {
  userActions.pickOption(Game, {
    player,
    options: card.colors,
    callback
  });
};
