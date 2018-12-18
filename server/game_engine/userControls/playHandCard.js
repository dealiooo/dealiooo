const userActions = require('./../userActions');

module.exports = (Game, player, callback) => {
  let options = [];
  options.push('Pick Card Id');
  options.push('Go Back');
  userActions.pickOption(Game, {
    player,
    options,
    callback
  });
};