const userActions = require('./../userActions');

module.exports = (Game, player, callback) => {
  let options = [];
  if (player.hand.length) {
    options.push('Play Hand Card');
  }
  if (player.field.property_cards.length) {
    options.push('Move Card Around');
  }
  options.push('End Turn');
  userActions.pickOption(Game, {
    player,
    options,
    callback
  });
};
