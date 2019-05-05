const userActions = require('./../userActions');

module.exports = ({ Game, player, forced, callback }) => {
  let options = [];
  options.push('Pick Source and Destination');
  options.push('Go Back');
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'do you want to move a card around?',
    options,
    forced,
    callback
  });
};
