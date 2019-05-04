const userActions = require('./../userActions');

module.exports = ({Game, player, forced, callback}) => {
  let options = [];
  if (player.hand.length) {
    options.push('Play Hand Card');
  }
  if (player.field.propertyCards.length) {
    options.push('Move Card Around');
  }
  options.push('End Turn');
  userActions.pickOption({
    Game,
    player,
    options,
    forced,
    callback
  });
};
