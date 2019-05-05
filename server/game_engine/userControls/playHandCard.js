const userActions = require('./../userActions');

module.exports = ({ Game, player, forced, callback }) => {
  let options = [];
  options.push('Pick Card Id');
  options.push('Go Back');
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'do you want to play a hand card?',
    options,
    forced,
    callback
  });
};
