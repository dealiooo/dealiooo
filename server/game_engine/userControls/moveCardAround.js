const userActions = require('./../userActions');

module.exports = (Game, player, callback) => {
  let options = [];
  options.push('Pick Source and Destination');
  options.push('Go Back');
  userActions.pickOption(Game, {
    player,
    options,
    callback
  });
};
